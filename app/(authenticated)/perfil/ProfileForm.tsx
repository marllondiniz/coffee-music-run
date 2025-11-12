'use client'

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  FormEvent,
  ChangeEvent,
} from 'react'
import { UploadCloud, Check, AlertCircle } from 'lucide-react'
import type { ProfileRecord } from '@/lib/profile'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type ProfileFormProps = {
  profile: ProfileRecord | null
  email: string | null
  onProfileUpdated?: (profile: ProfileRecord) => void
}

const AVATAR_BUCKET = 'avatars'
const MAX_AVATAR_SIZE = 2 * 1024 * 1024 // 2MB

export function ProfileForm({ profile, email, onProfileUpdated }: ProfileFormProps) {
  const router = useRouter()
  const [receberBeneficios, setReceberBeneficios] = useState(
    profile?.recebe_beneficios ?? true
  )
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )
  const [isPending, startTransition] = useTransition()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const supabase = getSupabaseClient()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl)
      }
    }
  }, [localPreviewUrl])

  useEffect(() => {
    if (avatarFile) {
      return
    }

    if (profile?.avatar_url) {
      if (profile.avatar_url.startsWith('http')) {
        setAvatarPreview(profile.avatar_url)
        setLocalPreviewUrl(null)
        return
      }

      const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(profile.avatar_url)
      if (data?.publicUrl) {
        setAvatarPreview(data.publicUrl)
        setLocalPreviewUrl(null)
      }
    } else {
      setAvatarPreview(null)
    }
  }, [avatarFile, profile?.avatar_url, supabase])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const payload = {
      nome: String(formData.get('nome') || ''),
      bio: String(formData.get('bio') || ''),
      telefone: String(formData.get('telefone') || ''),
      esporte_favorito: String(formData.get('esporte_favorito') || ''),
      frequencia_semanal: String(formData.get('frequencia_semanal') || ''),
      recebe_beneficios: receberBeneficios,
      is_complete: true,
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

      let avatarPath = profile?.avatar_url ?? null

      if (avatarFile) {
        const fileExtension = avatarFile.name.split('.').pop()?.toLowerCase() || 'png'
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExtension}`

        const { error: uploadError } = await supabase.storage
          .from(AVATAR_BUCKET)
          .upload(filePath, avatarFile, {
            cacheControl: '3600',
            upsert: true,
            contentType: avatarFile.type,
          })

        if (uploadError) {
          console.error('Erro ao enviar avatar:', uploadError)
          setFeedback({
            type: 'error',
            message: 'Não foi possível enviar sua foto. Tente novamente.',
          })
          return
        }

        if (avatarPath && !avatarPath.startsWith('http')) {
          await supabase.storage.from(AVATAR_BUCKET).remove([avatarPath])
        }

        avatarPath = filePath
        const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath)
        if (data?.publicUrl) {
          setAvatarPreview(data.publicUrl)
        }
        setLocalPreviewUrl(null)
        setAvatarFile(null)
      }

      const updatedProfile: ProfileRecord = {
        id: user.id,
        email: email ?? profile?.email ?? null,
        ...payload,
        avatar_url: avatarPath,
        is_complete: true,
      }

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        ...payload,
        avatar_url: avatarPath,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Erro ao atualizar perfil:', error)
        setFeedback({ type: 'error', message: 'Não foi possível salvar suas informações.' })
        return
      }

      setFeedback({ type: 'success', message: 'Perfil atualizado com sucesso!' })
      onProfileUpdated?.(updatedProfile)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setFeedback(null), 3000)

      router.push('/inicio')
    })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setFeedback({
        type: 'error',
        message: 'Arquivo maior que 2MB. Escolha uma imagem menor.',
      })
      event.target.value = ''
      return
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFeedback({
        type: 'error',
        message: 'Formato inválido. Use uma imagem JPEG ou PNG.',
      })
      event.target.value = ''
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setAvatarFile(file)
    setAvatarPreview(objectUrl)
    setLocalPreviewUrl(objectUrl)
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
      encType="multipart/form-data"
      className="space-y-6 rounded-lg border border-white/5 bg-[#18181b] p-6 shadow-xl"
    >
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleAvatarClick}
          className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-[#1f1f22] via-[#111114] to-[#050506] shadow-2xl transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/30"
        >
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarPreview}
              alt="Foto do perfil"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-focus:scale-105"
            />
          ) : (
            <UploadCloud className="h-9 w-9 text-[#f5f5f5]" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="sr-only"
          onChange={handleFileChange}
        />
        <span className="text-xs text-[#b5b5bd]">
          Envie uma foto em JPEG ou PNG (máx. 2MB)
        </span>
        {email && <span className="text-xs text-[#7c7c84]">Logado como {email}</span>}
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

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Telefone</span>
          <input
            name="telefone"
            defaultValue={profile?.telefone ?? ''}
            type="tel"
            placeholder="(00) 00000-0000"
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

