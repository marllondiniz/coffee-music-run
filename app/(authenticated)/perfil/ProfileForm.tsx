'use client'

import { useEffect, useRef, useState, useTransition, FormEvent } from 'react'
import { UploadCloud, Check, AlertCircle } from 'lucide-react'
import type { ProfileRecord } from '@/lib/queries'
import { getSupabaseClient } from '@/lib/supabaseClient'

type ProfileFormProps = {
  profile: ProfileRecord | null
  email: string | null
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const [receberBeneficios, setReceberBeneficios] = useState(
    profile?.recebe_beneficios ?? true
  )
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )
  const [isPending, startTransition] = useTransition()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supabase = getSupabaseClient()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const payload = {
      nome: String(formData.get('nome') || ''),
      bio: String(formData.get('bio') || ''),
      esporte_favorito: String(formData.get('esporte_favorito') || ''),
      frequencia_semanal: String(formData.get('frequencia_semanal') || ''),
      recebe_beneficios: receberBeneficios,
    }

    startTransition(async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setFeedback({ type: 'error', message: 'Sessão expirada. Faça login novamente.' })
        return
      }

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Erro ao atualizar perfil:', error)
        setFeedback({ type: 'error', message: 'Não foi possível salvar suas informações.' })
        return
      }

      setFeedback({ type: 'success', message: 'Perfil atualizado com sucesso!' })

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setFeedback(null), 3000)
    })
  }

  const feedbackNode = feedback
    ? (() => {
        const isSuccess = feedback.type === 'success'
        const Icon = isSuccess ? Check : AlertCircle
        return (
          <div
            className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold ${
              isSuccess
                ? 'border-white/30 bg-[#1f1f22] text-[#f5f5f5]'
                : 'border-red-500/40 bg-red-500/10 text-red-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            {feedback.message}
          </div>
        )
      })()
    : null

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-white/5 bg-[#18181b] p-6 shadow-xl"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/30 bg-[#0f0f10]">
          <UploadCloud className="h-8 w-8 text-[#f5f5f5]" />
          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[#0f0f10]"
          >
            <UploadCloud className="h-5 w-5" />
          </button>
        </div>
        <span className="text-xs text-[#9a9aa2]">
          Envie uma foto em JPEG ou PNG (máx. 2MB)
        </span>
        {email && <span className="text-xs text-[#6e6e75]">Logado como {email}</span>}
      </div>

      <div className="grid gap-4 text-left md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Nome</span>
          <input
            name="nome"
            defaultValue={profile?.nome ?? ''}
            type="text"
            placeholder="Seu nome"
            className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-white/40 focus:outline-none"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Bio curta</span>
          <textarea
            name="bio"
            defaultValue={profile?.bio ?? ''}
            placeholder="Conte um pouco sobre você..."
            rows={3}
            className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-white/40 focus:outline-none"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Esporte favorito</span>
          <input
            name="esporte_favorito"
            defaultValue={profile?.esporte_favorito ?? ''}
            type="text"
            placeholder="Ex: Corrida, Yoga, Funcional"
            className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-white/40 focus:outline-none"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Frequência semanal</span>
          <input
            name="frequencia_semanal"
            defaultValue={profile?.frequencia_semanal ?? ''}
            type="text"
            placeholder="Ex: 3x por semana"
            className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-white/40 focus:outline-none"
          />
        </label>
      </div>

      <label className="flex items-center justify-between rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3">
        <div>
          <span className="block text-sm font-semibold uppercase text-[#f5f5f5]">
            Quero receber desafios e benefícios exclusivos
          </span>
          <p className="text-xs text-[#9a9aa2]">
            Enviaremos novidades por e-mail e notificações.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setReceberBeneficios((prev) => !prev)}
          className={`relative flex h-6 w-11 items-center rounded-full transition ${
            receberBeneficios ? 'bg-[#f5f5f5]' : 'bg-[#34343b]'
          }`}
          aria-pressed={receberBeneficios}
        >
          <span
            className={`absolute left-1 h-4 w-4 rounded-full bg-[#0f0f10] transition ${
              receberBeneficios ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#f5f5f5] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? 'Salvando...' : 'Salvar meu ritmo'}
      </button>

      {feedbackNode}
    </form>
  )
}

