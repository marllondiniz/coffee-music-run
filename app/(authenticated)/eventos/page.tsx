import { getActiveEventBanners, getEvents } from '@/lib/queries'
import { EventList } from './EventList'

export default async function EventosPage() {
  const eventos = await getEvents()
  const banners = await getActiveEventBanners()

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          Próximos eventos da comunidade
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Descubra novas experiências, veja o andamento das inscrições e garanta sua vaga.
        </p>
      </header>

      <EventList events={eventos} activeBanners={banners} />
    </section>
  )
}


