import { getEvents } from '@/lib/queries'

function formatDateTime(value: string) {
  const date = new Date(value)
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
  return formatter.format(date).replace('.', '')
}

function formatPrice(preco: number | null) {
  if (preco === null || preco === 0) return 'Gratuito'
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default async function EventosPage() {
  const eventos = await getEvents()

  return (
    <section className="space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          PRÓXIMOS EVENTOS RITMO CERTO
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Escolha seu ritmo e participe da próxima experiência.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {eventos.map((evento) => (
          <article
            key={evento.id}
            className={`flex flex-col gap-4 rounded-lg border border-white/5 p-5 shadow-lg transition hover:translate-y-[-2px] hover:shadow-xl ${
              evento.gratuito
                ? 'bg-[#18181b]'
                : 'bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc] text-[#0f0f10]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    evento.gratuito ? 'text-[#f5f5f5]' : 'text-[#0f0f10]'
                  }`}
                >
                  {evento.titulo}
                </h3>
                <span
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    evento.gratuito ? 'text-[#f5f5f5]' : 'text-[#322a10]'
                  }`}
                >
                  {formatPrice(evento.preco)}
                </span>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  evento.gratuito
                    ? 'bg-[#2a2a31] text-[#f5f5f5]'
                    : 'bg-[#0f0f10]/10 text-[#0f0f10]'
                }`}
              >
                {evento.gratuito ? 'Gratuito' : 'Pago'}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className={evento.gratuito ? 'text-[#d6d6de]' : 'text-[#322a10]'}>
                <span className="font-semibold">Data:</span> {formatDateTime(evento.data_horario)}
              </p>
              <p className={evento.gratuito ? 'text-[#d6d6de]' : 'text-[#322a10]'}>
                <span className="font-semibold">Local:</span> {evento.local_nome}
                {evento.local_detalhe ? ` • ${evento.local_detalhe}` : ''}
              </p>
              <p className={evento.gratuito ? 'text-[#f5f5f5]' : 'text-[#322a10]'}>
                {evento.descricao || 'Em breve mais detalhes.'}
              </p>
              <p className={evento.gratuito ? 'text-[#c9c9d2]' : 'text-[#322a10]'}>
                <span className="font-semibold">
                  {evento.participantes_confirmados ?? 0}
                </span>{' '}
                participantes confirmados
              </p>
            </div>

            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                evento.gratuito
                  ? 'bg-[#2a2a31] text-[#f5f5f5] hover:bg-[#34343b]'
                  : 'bg-[#0f0f10] text-[#f5f5f5] hover:bg-[#1c1c1d]'
              }`}
            >
              Ver detalhes
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}


