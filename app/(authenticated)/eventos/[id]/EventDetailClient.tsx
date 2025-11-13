'use client'

import { useMemo, useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { EventRecord, EventBannerRecord } from '@/lib/queries'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useUserRole } from '@/lib/useUserRole'

type Props = {
  event: EventRecord
  banner: EventBannerRecord | null
}

type DescriptionSection = {
  titulo: string | null
  conteudo: string
}

const parseDescriptionSections = (raw: string | null): DescriptionSection[] => {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as { sections?: Array<{ titulo?: string | null; conteudo?: string | null }> }
    if (parsed && Array.isArray(parsed.sections)) {
      return parsed.sections
        .map((section) => ({
          titulo: section.titulo ?? null,
          conteudo: section.conteudo ?? '',
        }))
        .filter((section) => section.conteudo.trim().length > 0)
    }
  } catch (error) {
    // Conteúdo não estruturado em JSON
  }

  if (raw.includes('---')) {
    return raw
      .split(/^-{3,}$|---+/gm)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((conteudo) => ({ titulo: null, conteudo }))
  }

  const trimmed = raw.trim()
  if (!trimmed) return []

  return [{ titulo: null, conteudo: trimmed }]
}

export function EventDetailClient({ event, banner }: Props) {
  const router = useRouter()
  const supabase = getSupabaseClient()
  const { profile } = useUserRole()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const isFreeEvent = !event.preco || event.preco === 0
  const isPaidEvent = !isFreeEvent

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const confirmedParticipants = event.participantes_confirmados ?? 0
  const capacity = event.capacidade_maxima ?? 0
  const progressPercentage =
    capacity > 0 ? Math.min((confirmedParticipants / capacity) * 100, 100) : 0

  const descriptionSections = useMemo(
    () => parseDescriptionSections(event.descricao),
    [event.descricao]
  )

  const handleParticipation = async () => {
    if (!profile?.id) {
      setMessage({ type: 'error', text: 'Você precisa estar logado para participar.' })
      return
    }

    startTransition(async () => {
      try {
        // Verificar se já está inscrito
        const { data: existingRegistration } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', event.id)
          .eq('user_id', profile.id)
          .single()

        if (existingRegistration) {
          setMessage({ type: 'success', text: 'Você já está inscrito neste evento!' })
          return
        }

        // Registrar participação
        const { error: insertError } = await supabase
          .from('event_registrations')
          .insert({
            event_id: event.id,
            user_id: profile.id,
          })

        if (insertError) throw insertError

        // Atualizar contador
        await supabase
          .from('events')
          .update({
            participantes_confirmados: confirmedParticipants + 1,
          })
          .eq('id', event.id)

        setMessage({ type: 'success', text: 'Participação confirmada com sucesso!' })
        
        // Recarregar página para atualizar contadores
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } catch (error) {
        console.error('Erro ao confirmar participação:', error)
        setMessage({ type: 'error', text: 'Não foi possível confirmar sua participação.' })
      }
    })
  }

  const handleBuyTicket = () => {
    setMessage({ type: 'error', text: 'Checkout de pagamento em breve!' })
  }

  const openMap = () => {
    const address = `${event.local_nome}${event.local_detalhe ? `, ${event.local_detalhe}` : ''}`
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
        {banner?.image_url ? (
          <>
            <Image
              src={banner.image_url}
              alt={event.titulo}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-[#0f0f10]/60 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#2a2a31] to-[#18181b]" />
        )}

        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f0f10]/80 text-[#f5f5f5] backdrop-blur-sm transition hover:bg-[#0f0f10]"
        >
          ←
        </button>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-[#2a2a31] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#f5f5f5]">
                Evento
              </span>
              <h1 className="mt-3 text-3xl font-bold text-[#f5f5f5] md:text-4xl">
                {event.titulo}
              </h1>
            </div>
            {event.destaque && (
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                Destaque
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-[#c9c9d2]">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>
                {formatDate(event.data_horario)} • {formatTime(event.data_horario)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{event.local_nome}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span className="font-semibold text-[#f5f5f5]">
                {isFreeEvent ? 'Gratuito' : `R$ ${event.preco?.toFixed(2).replace('.', ',')}`}
              </span>
            </div>
          </div>
        </div>

        {/* Botão principal */}
        <div className="mb-8">
          {message && (
            <div
              className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                message.type === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            onClick={isFreeEvent ? handleParticipation : handleBuyTicket}
            disabled={isPending || (capacity > 0 && confirmedParticipants >= capacity)}
            className="w-full rounded-xl bg-[#f5f5f5] px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-[#0f0f10] transition hover:bg-[#e2e2e2] disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
          >
            {isPending
              ? 'Processando...'
              : capacity > 0 && confirmedParticipants >= capacity
              ? 'Vagas esgotadas'
              : isFreeEvent
              ? 'Participar gratuitamente'
              : 'Comprar ingresso'}
          </button>
        </div>

        {/* Progresso */}
        {event.capacidade_maxima && (
          <div className="mb-8 rounded-xl border border-white/5 bg-[#18181b] p-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-[#f5f5f5]">Progresso de inscrições</span>
              <span className="text-[#c9c9d2]">
                {confirmedParticipants} de {capacity} vagas
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-[#2a2a31]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Descrição */}
        {descriptionSections.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wide text-[#f5f5f5]">
              Sobre o evento
            </h2>
            <div className="space-y-4">
              {descriptionSections.map((section, index) => (
                <div
                  key={`${section.titulo ?? 'section'}-${index}`}
                  className="space-y-3 rounded-xl border border-white/5 bg-[#18181b] p-6"
                >
                  {section.titulo && (
                    <h3 className="text-base font-semibold uppercase tracking-wide text-[#f5f5f5]">
                      {section.titulo}
                    </h3>
                  )}
                  <div className="whitespace-pre-line text-sm leading-relaxed text-[#c9c9d2]">
                    {section.conteudo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local */}
        <div className="mb-8 rounded-xl border border-white/5 bg-[#18181b] p-6">
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-[#f5f5f5]">
            Local do evento
          </h2>
          <div className="space-y-3">
            <div className="text-base font-semibold text-[#f5f5f5]">
              {event.local_nome}
            </div>
            {event.local_detalhe && (
              <div className="text-sm text-[#c9c9d2]">{event.local_detalhe}</div>
            )}
            <button
              onClick={openMap}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2a2a31] px-4 py-2 text-sm font-semibold text-[#f5f5f5] transition hover:bg-[#3a3a41]"
            >
              <span>🗺️</span>
              <span>Ver no mapa</span>
            </button>
          </div>
        </div>

        {/* Data e horário */}
        <div className="rounded-xl border border-white/5 bg-[#18181b] p-6">
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-[#f5f5f5]">
            Data e horário
          </h2>
          <div className="space-y-2">
            <div className="text-base font-semibold text-[#f5f5f5]">
              {new Date(event.data_horario).toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="text-sm text-[#c9c9d2]">
              Início: {formatTime(event.data_horario)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

