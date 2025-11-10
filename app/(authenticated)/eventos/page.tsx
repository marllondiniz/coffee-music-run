'use client'

const eventos = [
  {
    id: 'coffee-music',
    titulo: 'Coffee Music & Run',
    preco: 'R$100',
    pago: true,
    data: '6h • 13.Dez',
    local: 'BRIZZ • Praia de Itapuã',
    descricao: 'Corrida + café + yoga + DJ',
    participantes: 512,
  },
  {
    id: 'yoga-coffee',
    titulo: 'Yoga & Coffee',
    preco: 'Gratuito',
    pago: false,
    data: '7h • 21.Dez',
    local: 'Parque Pedra da Cebola',
    descricao: 'Aula de yoga + respiro guiado + café especial',
    participantes: 287,
  },
  {
    id: 'city-run',
    titulo: 'City Run Sunrise',
    preco: 'R$65',
    pago: true,
    data: '5h30 • 11.Jan',
    local: 'Enseada Azul',
    descricao: 'Longão leve + hidratação + playlist exclusiva',
    participantes: 198,
  },
]

export default function EventosPage() {
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

      <div className="space-y-4">
        {eventos.map((evento) => (
          <article
            key={evento.id}
            className={`flex flex-col gap-4 rounded-3xl border border-white/5 p-5 shadow-lg transition hover:translate-y-[-2px] hover:shadow-xl ${
              evento.pago ? 'bg-gradient-to-br from-[#f5d36b] to-[#f4c542] text-[#0f0f10]' : 'bg-[#18181b]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    evento.pago ? 'text-[#0f0f10]' : 'text-[#f5f5f5]'
                  }`}
                >
                  {evento.titulo}
                </h3>
                <span
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    evento.pago ? 'text-[#322a10]' : 'text-[#f4c542]'
                  }`}
                >
                  {evento.preco}
                </span>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  evento.pago
                    ? 'bg-[#0f0f10]/10 text-[#0f0f10]'
                    : 'bg-[#2a2a31] text-[#f5f5f5]'
                }`}
              >
                {evento.pago ? 'Pago' : 'Gratuito'}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className={evento.pago ? 'text-[#322a10]' : 'text-[#d6d6de]'}>
                <span className="font-semibold">Data:</span> {evento.data}
              </p>
              <p className={evento.pago ? 'text-[#322a10]' : 'text-[#d6d6de]'}>
                <span className="font-semibold">Local:</span> {evento.local}
              </p>
              <p className={evento.pago ? 'text-[#322a10]' : 'text-[#f5f5f5]'}>
                {evento.descricao}
              </p>
              <p className={evento.pago ? 'text-[#322a10]' : 'text-[#c9c9d2]'}>
                <span className="font-semibold">{evento.participantes}</span> participantes confirmados
              </p>
            </div>

            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                evento.pago
                  ? 'bg-[#0f0f10] text-[#f4c542] hover:bg-[#1c1c1d]'
                  : 'bg-[#2a2a31] text-[#f5f5f5] hover:bg-[#34343b]'
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


