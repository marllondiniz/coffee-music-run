'use client'

import { FormEvent, useMemo, useState } from 'react'
import type { EventRecord } from '@/lib/queries'
import { getSupabaseClient } from '@/lib/supabaseClient'

type Props = {
  initialEvents: EventRecord[]
}

type FormState = {
  titulo: string
  descricao: string
  data_horario: string
  local_nome: string
  local_detalhe: string
  preco: string
  destaque: boolean
  bannerFile: File | null
  bannerPreview: string | null
  bannerTitulo: string
  bannerSubtitulo: string
}

const defaultForm: FormState = {
  titulo: '',
  descricao: '',
  data_horario: '',
  local_nome: '',
  local_detalhe: '',
  preco: '',
  destaque: false,
  bannerFile: null,
  bannerPreview: null,
  bannerTitulo: '',
  bannerSubtitulo: '',
}

const BANNER_BUCKET = 'event-banners'

const formatDateForInput = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

const parseDateTime = (value: string): Date | null => {
  if (!value) return null

  const trimmed = value.trim()
  if (!trimmed) return null

  // Valor padrão retornado pelo input datetime-local (YYYY-MM-DDTHH:mm)
  if (trimmed.includes('T')) {
    const date = new Date(trimmed)
    return Number.isNaN(date.getTime()) ? null : date
  }

  // Tentativa de parse para entradas manuais no formato brasileiro
  const match = trimmed.match(
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})(?:,|\s)(\d{1,2}):(\d{2})$/
  )

  if (match) {
    const [, dia, mes, ano, hora, minuto] = match
    const parsedYear = ano.length === 2 ? Number(`20${ano}`) : Number(ano)
    const date = new Date(
      parsedYear,
      Number(mes) - 1,
      Number(dia),
      Number(hora),
      Number(minuto)
    )
    return Number.isNaN(date.getTime()) ? null : date
  }

  return null
}

export function EventAdminPanel({ initialEvents }: Props) {
  const [events, setEvents] = useState(initialEvents)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = useMemo(() => getSupabaseClient(), [])

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBannerFileChange = (file: File | null) => {
    if (!file) {
      setForm((prev) => ({ ...prev, bannerFile: null, bannerPreview: null }))
      return
    }

    const isValidType = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)
    if (!isValidType) {
      setFeedback('Formato de imagem inválido. Use PNG, JPG ou WEBP.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback('Imagem muito grande. Máximo 2MB.')
      return
    }

    const preview = URL.createObjectURL(file)
    setForm((prev) => ({ ...prev, bannerFile: file, bannerPreview: preview }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setFeedback(null)

    const parsedDate = parseDateTime(form.data_horario)

    if (!parsedDate) {
      setFeedback('Informe uma data e horário válidos.')
      setLoading(false)
      return
    }

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao || null,
      data_horario: parsedDate.toISOString(),
      local_nome: form.local_nome,
      local_detalhe: form.local_detalhe || null,
      preco: form.preco ? Number(form.preco.replace(',', '.')) : 0,
      destaque: form.destaque,
    }

    const isEditing = Boolean(editingId)
    const response = await fetch('/api/admin/events', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEditing ? { id: editingId, ...payload } : payload),
    })

    if (!response.ok) {
      const { error } = await response.json()
      setFeedback(error || 'Não foi possível salvar o evento.')
      setLoading(false)
      return
    }

    const result = await response.json().catch(() => null)
    const updatedEvent = result?.data ?? null

    if (isEditing) {
      setFeedback('Evento atualizado com sucesso!')
      if (updatedEvent) {
        setEvents((prev) => prev.map((evento) => (evento.id === updatedEvent.id ? updatedEvent : evento)))
      } else {
        const refresh = await fetch('/api/admin/events?list=1')
        if (refresh.ok) {
          const { data } = await refresh.json()
          setEvents(data ?? [])
        }
      }
    } else {
      setFeedback('Evento criado com sucesso!')
      
      // Criar banner se houver arquivo
      if (form.bannerFile && updatedEvent?.id) {
        try {
          const fileExt = form.bannerFile.name.split('.').pop() || 'png'
          const filePath = `${Date.now()}-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}.${fileExt}`

          const { error: uploadError } = await supabase.storage
            .from(BANNER_BUCKET)
            .upload(filePath, form.bannerFile, {
              cacheControl: '3600',
              upsert: false,
            })

          if (!uploadError) {
            const { data: publicData } = supabase.storage.from(BANNER_BUCKET).getPublicUrl(filePath)
            const imageUrl = publicData?.publicUrl

            if (imageUrl) {
              await fetch('/api/admin/event-banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  titulo: null,
                  subtitulo: null,
                  event_id: updatedEvent.id,
                  image_url: imageUrl,
                  image_path: filePath,
                  is_active: true,
                }),
              })
              setFeedback('Evento e banner criados com sucesso!')
            }
          }
        } catch (error) {
          console.error('Erro ao criar banner:', error)
          setFeedback('Evento criado, mas houve erro ao criar o banner.')
        }
      }

      if (updatedEvent) {
        setEvents((prev) => [updatedEvent, ...prev])
      } else {
        const refresh = await fetch('/api/admin/events?list=1')
        if (refresh.ok) {
          const { data } = await refresh.json()
          setEvents(data ?? [])
        }
      }
    }

    setForm(defaultForm)
    setEditingId(null)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' })
    if (!response.ok) {
      setFeedback('Não foi possível excluir o evento.')
      return
    }
    setEvents((prev) => prev.filter((evento) => evento.id !== id))
    setFeedback('Evento removido.')
  }

  const handleEdit = (evento: EventRecord) => {
    setEditingId(evento.id)
    setForm({
      titulo: evento.titulo ?? '',
      descricao: evento.descricao ?? '',
      data_horario: formatDateForInput(evento.data_horario),
      local_nome: evento.local_nome ?? '',
      local_detalhe: evento.local_detalhe ?? '',
      preco:
        typeof evento.preco === 'number' && !Number.isNaN(evento.preco)
          ? String(evento.preco).replace('.', ',')
          : '',
      destaque: Boolean(evento.destaque),
      bannerFile: null,
      bannerPreview: null,
      bannerTitulo: '',
      bannerSubtitulo: '',
    })
    setFeedback('Editando evento. Banner só pode ser adicionado ao criar um novo evento.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm(defaultForm)
    setFeedback(null)
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/5 bg-[#18181b] p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#f5f5f5]">
              {editingId ? '✏️ Editar evento' : '➕ Novo evento'}
            </h3>
            <p className="mt-1 text-sm text-[#9a9aa2]">
              {editingId
                ? 'Atualize as informações e salve'
                : 'Preencha os dados do evento'}
            </p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold uppercase text-[#9a9aa2] transition hover:border-white/20 hover:text-[#f5f5f5]"
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Título</span>
            <input
              type="text"
              value={form.titulo}
              onChange={(event) => handleChange('titulo', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Data e horário</span>
            <input
              type="datetime-local"
              value={form.data_horario}
              onChange={(event) => handleChange('data_horario', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
              required
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Descrição</span>
            <textarea
              value={form.descricao}
              onChange={(event) => handleChange('descricao', event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Local</span>
            <input
              type="text"
              value={form.local_nome}
              onChange={(event) => handleChange('local_nome', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Detalhes do local</span>
            <input
              type="text"
              value={form.local_detalhe}
              onChange={(event) => handleChange('local_detalhe', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Preço</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.preco}
              onChange={(event) => handleChange('preco', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5]"
              placeholder="0 para gratuito"
            />
          </label>

          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              checked={form.destaque}
              onChange={(event) => handleChange('destaque', event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-[#0f0f10]"
            />
            <span className="text-sm text-[#c9c9d2]">Marcar como evento em destaque</span>
          </label>
        </div>

        {!editingId && (
          <div className="space-y-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-[#f5f5f5]">
                Banner Promocional (Opcional)
              </h4>
            </div>
            <p className="text-xs text-blue-200">
              Adicione um banner visual para destacar este evento
            </p>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase text-[#bdbdc3]">Imagem do Banner</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => handleBannerFileChange(event.target.files?.[0] ?? null)}
                className="block w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#f5f5f5] file:transition hover:file:bg-white/20"
              />
              {form.bannerPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.bannerPreview}
                  alt="Pré-visualização do banner"
                  className="mt-3 h-32 w-full rounded-lg object-cover"
                />
              )}
            </label>
          </div>
        )}

        {feedback && (
          <div className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.includes('sucesso')
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
          }`}>
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#f5f5f5] px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0f0f10] shadow-lg transition hover:scale-[1.02] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? '⏳ Salvando...' : editingId ? '💾 Atualizar evento' : '✨ Criar evento'}
        </button>
      </form>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold uppercase tracking-tight text-[#f5f5f5]">
            📅 Eventos cadastrados
          </h3>
          <span className="rounded-full bg-[#2a2a31] px-3 py-1 text-xs font-bold text-[#f5f5f5]">
            {events.length}
          </span>
        </div>
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#0f0f10] p-8 text-center">
            <p className="text-sm text-[#9a9aa2]">Nenhum evento cadastrado ainda.</p>
            <p className="mt-1 text-xs text-[#73737c]">Crie seu primeiro evento acima</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((evento) => (
              <div
                key={evento.id}
                className="group flex flex-col gap-4 rounded-xl border border-white/5 bg-[#18181b] p-5 shadow-lg transition hover:border-white/10 hover:shadow-xl md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-start gap-2">
                    <h4 className="text-base font-bold text-[#f5f5f5]">
                      {evento.titulo}
                    </h4>
                    {evento.destaque && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                        Destaque
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#9a9aa2]">
                    📍 {evento.local_nome} • 🕐 {new Date(evento.data_horario).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {evento.descricao && (
                    <p className="text-xs text-[#73737c] line-clamp-1">{evento.descricao}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(evento)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#2a2a31] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:border-white/20 hover:bg-[#34343b]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(evento.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-300 transition hover:border-red-500/50 hover:bg-red-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

