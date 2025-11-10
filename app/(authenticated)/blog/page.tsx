'use client'

const filtros = ['Todos', 'Dicas', 'Nutrição', 'Treino', 'Bem-estar']

const artigos = [
  {
    id: 'sem-lesionar',
    categoria: 'Treino',
    icone: '🏃',
    titulo: 'Como começar a correr sem lesionar',
    autor: '@luanpersonal',
  },
  {
    id: 'receitas-com-cafe',
    categoria: 'Nutrição',
    icone: '☕',
    titulo: '3 receitas funcionais com café',
    autor: '@drathaynutri',
  },
  {
    id: 'foco-alongamento',
    categoria: 'Bem-estar',
    icone: '🧘‍♀️',
    titulo: 'Alongamento e foco para o dia',
    autor: '@andreayoga',
  },
]

export default function BlogPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          CONTEÚDO QUE MOVE VOCÊ
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Dicas, treinos e bem-estar para manter o ritmo certo no dia a dia.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-2">
        {filtros.map((filtro, index) => (
          <button
            key={filtro}
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              index === 0
                ? 'bg-[#f4c542] text-[#0f0f10]'
                : 'bg-[#18181b] text-[#f5f5f5] hover:bg-[#222226]'
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {artigos.map((artigo) => (
          <article
            key={artigo.id}
            className="flex items-center justify-between rounded-3xl border border-white/5 bg-[#18181b] p-5 shadow-lg transition hover:border-[#f4c542]/40"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{artigo.icone}</span>
              <div>
                <h3 className="text-lg font-bold text-[#f5f5f5]">{artigo.titulo}</h3>
                <p className="text-sm text-[#c9c9d2]">por {artigo.autor}</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full border border-[#f4c542] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#f4c542] transition hover:bg-[#f4c542] hover:text-[#0f0f10]"
            >
              Ler
            </button>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-2xl border border-[#f4c542] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#f4c542] transition hover:bg-[#f4c542] hover:text-[#0f0f10]"
      >
        Ver mais artigos
      </button>

      <div className="rounded-3xl border border-[#f4c542]/30 bg-[#18181b] p-6 text-center shadow-lg">
        <h3 className="text-lg font-bold text-[#f5f5f5]">
          Quer publicar seu conteúdo aqui?
        </h3>
        <p className="mt-2 text-sm text-[#c9c9d2]">
          Compartilhe suas dicas com a comunidade e inspire outros corredores.
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-[#f4c542] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-105"
        >
          Torne-se um criador ritmo certo
        </button>
      </div>
    </section>
  )
}


