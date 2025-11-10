'use client'

import Link from 'next/link'

const destaques = [
  {
    id: 'next-event',
    titulo: 'Próximo encontro confirmado',
    descricao: 'Coffee Music & Run • 13.Dez • 6h • BRIZZ',
    acao: 'Ver detalhes',
    emphasize: true,
  },
  {
    id: 'pontos',
    titulo: 'Ritmo Points acumulados',
    descricao: '120 pontos • Você está no top 15% da comunidade.',
    acao: 'Ver ranking',
  },
  {
    id: 'desafio',
    titulo: 'Desafio da semana',
    descricao: 'Corra 5 km e compartilhe a energia no feed.',
    acao: 'Ver desafios',
    href: '/desafios',
  },
]

const quickLinks = [
  { id: 'eventos', titulo: 'Eventos', descricao: 'Escolha sua próxima experiência.', href: '/eventos' },
  { id: 'conteudo', titulo: 'Conteúdo', descricao: 'Dicas e treinos selecionados.', href: '/blog' },
  { id: 'clube', titulo: 'Clube', descricao: 'Benefícios e histórias da comunidade.', href: '/clube' },
]

export default function InicioPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f4c542]">
          Ritmo certo club
        </span>
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          Bem-vindo de volta
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Confira o que está rolando nesta semana, acompanhe seus pontos e mergulhe na comunidade.
        </p>
      </header>

      <div className="space-y-3">
        {destaques.map((card) => (
          <div
            key={card.id}
            className={`rounded-3xl border border-white/5 p-5 shadow-lg ${
              card.emphasize
                ? 'bg-gradient-to-r from-[#f5d36b] to-[#f4c542] text-[#0f0f10]'
                : 'bg-[#18181b]'
            }`}
          >
            <h3
              className={`text-base font-semibold uppercase tracking-wide ${
                card.emphasize ? 'text-[#0f0f10]' : 'text-[#f5f5f5]'
              }`}
            >
              {card.titulo}
            </h3>
            <p
              className={
                card.emphasize ? 'mt-2 text-sm text-[#2c240d]' : 'mt-2 text-sm text-[#c9c9d2]'
              }
            >
              {card.descricao}
            </p>
            {card.href ? (
              <Link
                href={card.href}
                className={`mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider ${
                  card.emphasize ? 'text-[#0f0f10]' : 'text-[#f4c542]'
                }`}
              >
                {card.acao}
              </Link>
            ) : (
              <span
                className={`mt-4 inline-flex text-xs font-semibold uppercase tracking-wider ${
                  card.emphasize ? 'text-[#0f0f10]' : 'text-[#f4c542]'
                }`}
              >
                {card.acao}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-[#18181b] p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#9a9aa2]">Sua constância</span>
            <h3 className="mt-2 text-lg font-semibold text-[#f5f5f5]">Ritmo das últimas 4 semanas</h3>
          </div>
          <span className="rounded-full bg-[#0f0f10] px-3 py-1 text-xs font-semibold text-[#f4c542]">
            3 treinos
          </span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3 text-center text-sm text-[#c9c9d2]">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, index) => (
            <div
              key={`${dia}-${index}`}
              className={`flex h-12 flex-col items-center justify-center rounded-2xl border border-[#2a2a31] ${
                index % 3 === 0 ? 'bg-[#f4c542]/15 text-[#f4c542]' : ''
              }`}
            >
              <span className="text-xs font-semibold uppercase">{dia}</span>
              <span className="text-[11px] text-[#9a9aa2]">run</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {quickLinks.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-3xl border border-white/5 bg-[#18181b] p-5 shadow-lg transition hover:border-[#f4c542]/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-[#f5f5f5]">
                  {item.titulo}
                </h3>
                <p className="mt-1 text-sm text-[#c9c9d2]">{item.descricao}</p>
              </div>
              <span className="text-[#f4c542] text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


