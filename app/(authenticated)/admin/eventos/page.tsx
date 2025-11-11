import { getEvents } from '@/lib/queries'
import { EventAdminPanel } from './EventAdminPanel'

export default async function AdminEventosPage() {
  const eventos = await getEvents()

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-[#f5f5f5]">
          Gerenciar eventos
        </h2>
        <p className="text-sm text-[#9a9aa2]">
          Crie, atualize ou remova eventos do calendário.
        </p>
      </div>

      <EventAdminPanel initialEvents={eventos} />
    </section>
  )
}
