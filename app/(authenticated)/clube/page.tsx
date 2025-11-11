import Link from 'next/link'
import { getEvents } from '@/lib/queries'

const destaqueCards: Array<{
  id: string
  titulo: string
  descricao: string
  icone: string
  href?: string
}> = [
  {
    id: 'historias',
    titulo: 'Histórias da comunidade',
    descricao: 'Conecte-se com quem vive no mesmo ritmo que você',
    icone: '👥',
  },
  {
    id: 'desafios',
    titulo: 'Desafios semanais',
    descricao: 'Metas coletivas para manter a motivação sempre em alta',
    icone: '🏆',
    href: '/desafios',
  },
  {
    id: 'beneficios',
    titulo: 'Benefícios exclusivos',
    descricao: 'Descontos com parceiros do clube para você viver melhor',
    icone: '🎁',
  },
  {
    id: 'blog',
    titulo: 'Blog & dicas de bem-estar',
    descricao: 'Conteúdo exclusivo de treino, nutrição e equilíbrio',
    icone: '📚',
    href: '/blog',
  },
] ;

export default async function ClubePage() {
  const eventos = await getEvents()
  const proximoEvento = eventos[0]

  return (
    <section className="space-y-6">
      <header className="space-y-4 text-center">
        <h2 className="text-3xl font-black uppercase leading-snug tracking-tight text-[#f5f5f5]">
          O CLUBE ONDE
          <br />
          O MOVIMENTO VIRA
          <br />
          ESTILO DE VIDA ☕
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Mais do que eventos. Uma comunidade que corre junto, celebra junto e vive o ritmo certo.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {destaqueCards.map((card) => {
          const InnerContent = (
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1f23] text-xl">
                {card.icone}
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-[#f5f5f5]">
                  {card.titulo}
                </h3>
                <p className="mt-1 text-sm text-[#c9c9d2]">{card.descricao}</p>
                {card.href && (
                  <span className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#f5f5f5]">
                    Acessar
                  </span>
                )}
              </div>
            </div>
          )

          const baseClass =
            'block rounded-lg border border-[#1f1f23] bg-[#18181b] p-5 shadow-lg transition-transform hover:border-white/30'

          return card.href ? (
            <Link
              key={card.id}
              href={card.href}
              className={`${baseClass} transform hover:-translate-y-1`}
            >
              {InnerContent}
            </Link>
          ) : (
            <div key={card.id} className={baseClass}>
              {InnerContent}
            </div>
          )
        })}
      </div>

      <div className="space-y-4 rounded-lg border border-white/20 bg-gradient-to-b from-[#f5f5f5] to-[#dcdcdc] p-6 text-center text-[#0f0f10] shadow-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2f2f2f]">
          Em breve
        </span>
        <h3 className="text-xl font-black uppercase tracking-tight">RITMO CERTO PREMIUM</h3>
        <p className="text-sm font-medium text-[#2f2f2f]">
          {proximoEvento
            ? `Próximo encontro: ${proximoEvento.titulo} • ${new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
                .format(new Date(proximoEvento.data_horario))
                .replace('.', '')} • ${proximoEvento.local_nome}`
            : 'Mentorias, experiências imersivas e benefícios VIP para quem quer viver o movimento ao máximo.'}
        </p>
        <button
          type="button"
          className="mx-auto mt-4 inline-flex items-center justify-center rounded-full bg-[#0f0f10] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f5f5f5] transition hover:brightness-110"
        >
          Quero saber quando lançar
        </button>
      </div>
    </section>
  )
}


