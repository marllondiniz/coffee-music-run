import { getArticles } from '@/lib/queries'

const filtros = ['Todos', 'Dicas', 'Nutrição', 'Treino', 'Bem-estar']

function resolveIcon(icone: string | null, categoria: string | null) {
  if (icone) return icone
  switch (categoria) {
    case 'treino':
      return '🏃'
    case 'nutricao':
      return '☕'
    case 'bem-estar':
      return '🧘'
    default:
      return '✨'
  }
}

export default async function BlogPage() {
  const artigos = await getArticles()

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
                ? 'bg-[#f5f5f5] text-[#0f0f10]'
                : 'bg-[#18181b] text-[#f5f5f5] hover:bg-[#222226]'
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {artigos.map((artigo) => (
          <article
            key={artigo.id}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-[#18181b] p-5 shadow-lg transition hover:border-white/30"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{resolveIcon(artigo.icone, artigo.categoria)}</span>
              <div>
                <h3 className="text-lg font-bold text-[#f5f5f5]">{artigo.titulo}</h3>
                <p className="text-sm text-[#c9c9d2]">
                  por {artigo.autor_handle || '@ritmocerto'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:bg-[#f5f5f5] hover:text-[#0f0f10]"
            >
              Ler
            </button>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:bg-[#f5f5f5] hover:text-[#0f0f10]"
      >
        Ver mais artigos
      </button>

      <div className="rounded-lg border border-white/15 bg-[#18181b] p-6 text-center shadow-lg">
        <h3 className="text-lg font-bold text-[#f5f5f5]">
          Quer publicar seu conteúdo aqui?
        </h3>
        <p className="mt-2 text-sm text-[#c9c9d2]">
          Compartilhe suas dicas com a comunidade e inspire outros corredores.
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-[#f5f5f5] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-95"
        >
          Torne-se um criador ritmo certo
        </button>
      </div>
    </section>
  )
}


