'use client'

const desafios = [
  {
    id: 'run-5k',
    titulo: 'Corra 5 km nesta semana',
    progresso: 73,
  },
  {
    id: 'coffee-photo',
    titulo: 'Compartilhe uma foto com o café pós-corrida',
    progresso: 40,
  },
  {
    id: 'free-event',
    titulo: 'Participe de 1 evento gratuito',
    progresso: 0,
  },
]

export default function DesafiosPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          DESAFIOS DA SEMANA 💪
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Complete, marque presença e ganhe Ritmo Points.
        </p>
      </header>

      <div className="rounded-3xl border border-[#f4c542]/40 bg-gradient-to-br from-[#f5d36b] to-[#f4c542] p-6 text-[#0f0f10] shadow-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#433410]">
          Total acumulado
        </span>
        <p className="mt-3 text-4xl font-bold tracking-tight">120</p>
        <p className="text-sm font-medium text-[#433410]">
          Ritmo Points acumulados ☕🏅
        </p>
      </div>

      <div className="space-y-4">
        {desafios.map((desafio) => (
          <article
            key={desafio.id}
            className="space-y-3 rounded-3xl border border-white/5 bg-[#18181b] p-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#f5f5f5]">{desafio.titulo}</h3>
              <span className="text-sm font-semibold text-[#f4c542]">{desafio.progresso}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#2a2a31]">
              <div
                className="h-full rounded-full bg-[#f4c542] transition-all"
                style={{ width: `${desafio.progresso}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-wider text-[#9a9aa2]">
              Marque presença nos eventos e registre suas conquistas.
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-2xl bg-[#f4c542] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-105"
      >
        Ver ranking da comunidade
      </button>
    </section>
  )
}


