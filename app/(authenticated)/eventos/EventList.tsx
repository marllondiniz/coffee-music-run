'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import type { EventBannerRecord, EventRecord } from '@/lib/queries'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useUserRole } from '@/lib/useUserRole'

type EventListProps = {
  events: EventRecord[]
  activeBanners?: EventBannerRecord[]
}

type RegistrationMeta = {
  ticket_url: string | null
}

type MessageState = {
  type: 'success' | 'error'
  text: string
}

export function EventList({ events, activeBanners = [] }: EventListProps) {
  const supabase = getSupabaseClient()
  const { role, hasActiveSubscription } = useUserRole()
  const [userId, setUserId] = useState<string | null>(null)
  const [registrations, setRegistrations] = useState<Record<string, RegistrationMeta>>({})
  const [messages, setMessages] = useState<Record<string, MessageState | null>>({})
  const [isPending, startTransition] = useTransition()
  const [activeEventId, setActiveEventId] = useState<string | null>(null)

  const [eventStates, setEventStates] = useState(() =>
    events.map((event) => ({
      ...event,
      participantes_confirmados: event.participantes_confirmados ?? 0,
      capacidade_maxima: event.capacidade_maxima ?? 0,
    }))
  )

  useEffect(() => {
    let isMounted = true
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!isMounted) return

      if (!user) {
        setUserId(null)
        return
      }

      setUserId(user.id)

      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id, ticket_url')
        .eq('user_id', user.id)

      if (error) {
        console.error('Erro ao buscar inscrições:', error)
        return
      }

      if (!isMounted) return

      const map: Record<string, RegistrationMeta> = {}
      for (const registration of data ?? []) {
        map[registration.event_id] = {
          ticket_url: registration.ticket_url ?? null,
        }
      }
      setRegistrations(map)
    }

    fetchUser()

    return () => {
      isMounted = false
    }
  }, [supabase])

  const handleConfirmParticipation = (eventId: string) => {
    if (!userId) {
      setMessages((prev) => ({
        ...prev,
        [eventId]: {
          type: 'error',
          text: 'Você precisa estar logado para confirmar participação.',
        },
      }))
      return
    }

    const event = eventStates.find((item) => item.id === eventId)
    if (!event) return

    const capacidade = event.capacidade_maxima ?? 0
    const confirmados = event.participantes_confirmados ?? 0

    if (capacidade && confirmados >= capacidade) {
      setMessages((prev) => ({
        ...prev,
        [eventId]: {
          type: 'error',
          text: 'Este evento já está com todas as vagas preenchidas.',
        },
      }))
      return
    }

    startTransition(async () => {
      setActiveEventId(eventId)

      const registrationExists = registrations[eventId]
      if (registrationExists) {
        setMessages((prev) => ({
          ...prev,
          [eventId]: {
            type: 'success',
            text: 'Você já está inscrito neste evento.',
          },
        }))
        setActiveEventId(null)
        return
      }

      const { error: insertError, data: insertData } = await supabase
        .from('event_registrations')
        .insert({
          event_id: eventId,
          user_id: userId,
        })
        .select('event_id, ticket_url')
        .single()

      if (insertError) {
        console.error('Erro ao confirmar participação:', insertError)
        setMessages((prev) => ({
          ...prev,
          [eventId]: {
            type: 'error',
            text: 'Não foi possível confirmar sua participação. Tente novamente.',
          },
        }))
        setActiveEventId(null)
        return
      }

      const { data: updatedEvent, error: updateError } = await supabase
        .from('events')
        .update({
          participantes_confirmados: confirmados + 1,
        })
        .eq('id', eventId)
        .select('participantes_confirmados')
        .single()

      if (updateError) {
        console.error('Erro ao atualizar contagem de participantes:', updateError)
        setMessages((prev) => ({
          ...prev,
          [eventId]: {
            type: 'error',
            text: 'Sua inscrição foi registrada, mas não foi possível atualizar o progresso.',
          },
        }))
      } else {
        setEventStates((prev) =>
          prev.map((item) =>
            item.id === eventId
              ? {
                  ...item,
                  participantes_confirmados: updatedEvent.participantes_confirmados ?? confirmados + 1,
                }
              : item
          )
        )
        setMessages((prev) => ({
          ...prev,
          [eventId]: {
            type: 'success',
            text: 'Participação confirmada com sucesso!',
          },
        }))
      }

      setRegistrations((prev) => ({
        ...prev,
        [eventId]: {
          ticket_url: insertData?.ticket_url ?? null,
        },
      }))

      setActiveEventId(null)
    })
  }

  const normalizedEvents = useMemo(
    () =>
      eventStates.map((event) => {
        const capacidade = event.capacidade_maxima ?? 0
        const confirmados = event.participantes_confirmados ?? 0
        const progress =
          capacidade > 0 ? Math.min(100, Math.round((confirmados / capacidade) * 100)) : 0

        return {
          ...event,
          capacidade,
          confirmados,
          progress,
        }
      }),
    [eventStates]
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {normalizedEvents.map((event) => {
          const registration = registrations[event.id]
          const isRegistered = Boolean(registration)
          const capacidadeTotal = event.capacidade || '—'
          const vagasRestantes =
            event.capacidade > 0 ? Math.max(event.capacidade - event.confirmados, 0) : null
          const isPaidEvent = typeof event.preco === 'number' && event.preco > 0
          
          // Aplicar desconto de 20% para assinantes em eventos pagos
          const SUBSCRIBER_DISCOUNT = 0.20
          const basePrice = typeof event.preco === 'number' ? event.preco : 0
          const finalPrice =
            isPaidEvent && hasActiveSubscription ? basePrice * (1 - SUBSCRIBER_DISCOUNT) : basePrice
          
          const priceLabel = isPaidEvent
            ? finalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })
            : 'Gratuito'
          
          const hasDiscount = isPaidEvent && hasActiveSubscription
          const originalPrice =
            isPaidEvent && hasDiscount
              ? basePrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })
              : null

          const buttonDisabled =
            isRegistered ||
            (event.capacidade > 0 && event.confirmados >= event.capacidade) ||
            (isPending && activeEventId === event.id)

          const isProcessing = isPending && activeEventId === event.id
          const eventBanner = activeBanners.find(banner => banner.event_id === event.id)
          const hasBanner = Boolean(eventBanner)

          return (
            <article
              id={`evento-${event.id}`}
              key={event.id}
              className="flex h-full flex-col rounded-2xl border border-[#1f1f23] bg-[#18181b] shadow-xl transition hover:border-white/30 hover:-translate-y-1 overflow-hidden"
            >
              {hasBanner && eventBanner && (
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={eventBanner.image_url}
                    alt={eventBanner.titulo ?? 'Banner de evento'}
                    className="h-40 w-full object-cover sm:h-48 md:h-56"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 space-y-1 sm:bottom-4">
                    {eventBanner.titulo && (
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f5f5f5]/90 sm:text-xs sm:tracking-[0.3em]">
                        {eventBanner.titulo}
                      </p>
                    )}
                    {eventBanner.subtitulo && (
                      <h4 className="text-base font-bold leading-tight text-[#f5f5f5] sm:text-lg">
                        {eventBanner.subtitulo}
                      </h4>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 p-4 sm:p-5 md:p-6">
                <header className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-[#2a2a31] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9a9aa2]">
                        Evento
                      </span>
                      <h3 className="mt-3 text-xl font-bold tracking-tight text-[#f5f5f5]">
                        {event.titulo}
                      </h3>
                    </div>
                    <div className="text-right text-sm text-[#c9c9d2]">
                      <p>{new Date(event.data_horario).toLocaleDateString('pt-BR')}</p>
                      <p className="font-semibold">
                        {new Date(event.data_horario).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#d6d6de]">{event.descricao ?? 'Detalhes em breve.'}</p>
                </header>

                <div className="space-y-3 text-sm text-[#d6d6de]">
                  <div>
                    <p>
                      <span className="font-semibold text-[#f5f5f5]">Local:</span> {event.local_nome}
                    </p>
                    {event.local_detalhe && <p className="text-[#9a9aa2]">• {event.local_detalhe}</p>}
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-[#f5f5f5]">Inscrição:</span>{' '}
                      {hasDiscount && originalPrice && (
                        <span className="mr-2 text-xs text-[#9a9aa2] line-through">{originalPrice}</span>
                      )}
                      <span className={hasDiscount ? 'font-bold text-emerald-300' : ''}>
                        {priceLabel}
                      </span>
                    </p>
                    {hasDiscount && (
                      <p className="mt-1 text-xs text-emerald-300">
                        🎉 Desconto exclusivo para assinantes do Clube
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-[#26262e] bg-[#141419] p-4 text-sm text-[#d6d6de]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#f5f5f5]">Progresso</span>
                    <span className="text-xs text-[#9a9aa2]">
                      {event.confirmados}/{capacidadeTotal}{' '}
                      {vagasRestantes !== null ? `• ${vagasRestantes} vagas` : null}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2a31]">
                    <div
                      className={`h-full rounded-full ${
                        event.progress >= 100 ? 'bg-emerald-400' : 'bg-[#f5f5f5]'
                      }`}
                      style={{ width: `${event.progress}%` }}
                    />
                  </div>
                </div>
              </div>

                <div className="mt-auto space-y-3">
                {messages[event.id] && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                      messages[event.id]?.type === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                        : 'border-red-500/40 bg-red-500/10 text-red-200'
                    }`}
                  >
                    {messages[event.id]?.text}
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  {isRegistered ? (
                    <>
                      <span className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-200">
                        Inscrito ✅
                      </span>
                      <a
                        href={registration.ticket_url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                          registration.ticket_url
                            ? 'bg-[#f5f5f5] text-[#0f0f10] hover:brightness-95'
                            : 'cursor-not-allowed border border-[#2a2a31] bg-[#141419] text-[#5f5f66]'
                        }`}
                      >
                        Ver ingresso
                      </a>
                    </>
                  ) : isPaidEvent ? (
                    <button
                      type="button"
                      onClick={() =>
                        setMessages((prev) => ({
                          ...prev,
                          [event.id]: {
                            type: 'error',
                            text: 'Checkout de pagamento disponível em breve.',
                          },
                        }))
                      }
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[#f5f5f5] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-95"
                    >
                      Comprar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleConfirmParticipation(event.id)}
                      disabled={buttonDisabled}
                      className={`inline-flex flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                        buttonDisabled
                          ? 'cursor-not-allowed border border-[#2a2a31] bg-[#141419] text-[#5f5f66] opacity-60'
                          : 'bg-[#f5f5f5] text-[#0f0f10] hover:brightness-95'
                      }`}
                    >
                      {isProcessing ? 'Confirmando...' : 'Confirmar participação'}
                    </button>
                  )}
                </div>
              </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

