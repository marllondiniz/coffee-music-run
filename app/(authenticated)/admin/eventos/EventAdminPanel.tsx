'use client'

import { FormEvent, useState } from 'react'
import type { EventRecord } from '@/lib/queries'

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
}

const defaultForm: FormState = {
  titulo: '',
  descricao: '',
  data_horario: '',
  local_nome: '',
  local_detalhe: '',
  preco: '',
  destaque: false,
}

const formatDateForInput = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

export function EventAdminPanel({ initialEvents }: Props) {
  const [events, setEvents] = useState(initialEvents)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setFeedback(null)

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao || null,
      data_horario: new Date(form.data_horario).toISOString(),
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
    })
    setFeedback('Você está editando um evento. Não esqueça de salvar as alterações.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm(defaultForm)
    setFeedback(null)
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border border-white/10 bg-[#18181b] p-6 shadow-lg"
      >
        <div>
          <h3 className="text-lg font-semibold text-[#f5f5f5]">
            {editingId ? 'Editar evento' : 'Novo evento'}
          </h3>
          <p className="text-sm text-[#9a9aa2]">
            {editingId
              ? 'Atualize as informações e salve para confirmar as alterações.'
              : 'Preencha os campos para adicionar um evento.'}
          </p>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#f5f5f5] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Salvando...' : editingId ? 'Atualizar evento' : 'Criar evento'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:bg-white/5"
          >
            Cancelar edição
          </button>
        )}

        {feedback && (
          <p className="text-center text-xs text-[#9a9aa2]">{feedback}</p>
        )}
      </form>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-[#f5f5f5]">Eventos cadastrados</h3>
        {events.length === 0 ? (
          <p className="text-sm text-[#9a9aa2]">Nenhum evento cadastrado ainda.</p>
        ) : (
          <div className="space-y-3">
            {events.map((evento) => (
              <div
                key={evento.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#18181b] p-5 shadow-lg md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h4 className="text-base font-semibold text-[#f5f5f5]">
                    {evento.titulo}
                  </h4>
                  <p className="text-xs text-[#9a9aa2]">
                    {new Date(evento.data_horario).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <button
                    type="button"
                    onClick={() => handleEdit(evento)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:bg-white/10"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(evento.id)}
                    className="rounded-full border border-red-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-300 transition hover:bg-red-500/10"
                  >
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

