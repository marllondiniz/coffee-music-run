import { notFound } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabaseServer'
import { EventDetailClient } from './EventDetailClient'

type Props = {
  params: { id: string }
}

export default async function EventDetailPage({ params }: Props) {
  const supabase = getSupabaseServer()

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !event) {
    notFound()
  }

  // Buscar banner do evento
  const { data: banners } = await supabase
    .from('event_banners')
    .select('*')
    .eq('event_id', event.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)

  const banner = banners?.[0] ?? null

  return <EventDetailClient event={event} banner={banner} />
}

