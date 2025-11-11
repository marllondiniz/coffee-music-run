import Link from 'next/link'
import { getChallenges, getChallengeProgress, getEvents } from '@/lib/queries'
import { getSupabaseServer } from '@/lib/supabaseServer'

const quickLinks = [
  { id: 'eventos', titulo: 'Eventos', descricao: 'Escolha sua próxima experiência.', href: '/eventos' },
  { id: 'conteudo', titulo: 'Conteúdo', descricao: 'Dicas e treinos selecionados.', href: '/blog' },
  { id: 'clube', titulo: 'Clube', descricao: 'Benefícios e histórias da comunidade.', href: '/clube' },
]

function formatEventHighlight(date: string | null, title?: string | null, local?: string | null) {
  if (!date) return title ?? 'Evento em breve'
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${title ?? 'Evento especial'} • ${formatter.format(new Date(date)).replace('.', '')} • ${
    local ?? 'Local a confirmar'
  }`
}

export default async function InicioPage() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [eventos, desafios, progressoUsuario] = await Promise.all([
    getEvents(),
    getChallenges(),
    user ? getChallengeProgress(user.id) : Promise.resolve([]),
  ])

  const proximoEvento = eventos[0]
  const desafioSemana = desafios[0]
  const totalPontos = progressoUsuario.reduce((acc, registro) => acc + (registro.progresso ?? 0), 0)

  const destaques = [
    {
      id: 'next-event',
      titulo: 'Próximo encontro confirmado',
      descricao: proximoEvento
        ? formatEventHighlight(
            proximoEvento.data_horario,
            proximoEvento.titulo,
            proximoEvento.local_nome
          )
        : 'Fique ligado: novos eventos em breve.',
      acao: 'Ver detalhes',
      href: proximoEvento ? '/eventos' : undefined,
      emphasize: true,
    },
    {
      id: 'pontos',
      titulo: 'Ritmo Points acumulados',
      descricao:
        totalPontos > 0
          ? `${totalPontos} pontos • Continue no ritmo!`
          : 'Você ainda não acumulou pontos esta semana.',
      acao: 'Ver ranking',
      href: '/desafios',
    },
    {
      id: 'desafio',
      titulo: 'Desafio da semana',
      descricao: desafioSemana
        ? desafioSemana.descricao ?? 'Entre, marque presença e some pontos.'
        : 'Novos desafios chegam toda semana.',
      acao: 'Ver desafios',
      href: '/desafios',
    },
  ]

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5f5f5]/80">
          Ritmo certo club
        </span>
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          Bem-vindo de volta
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Confira o que está rolando nesta semana, acompanhe seus pontos e mergulhe na comunidade.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {destaques.map((card) => (
          <div
            key={card.id}
            className={`rounded-lg border border-white/5 p-5 shadow-lg transition ${
              card.emphasize
                ? 'bg-gradient-to-r from-[#f5f5f5] to-[#dcdcdc] text-[#0f0f10]'
                : 'bg-[#18181b] hover:border-white/30'
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
                  card.emphasize ? 'text-[#0f0f10]' : 'text-[#f5f5f5]'
                }`}
              >
                {card.acao}
              </Link>
            ) : (
              <span
                className={`mt-4 inline-flex text-xs font-semibold uppercase tracking-wider ${
                  card.emphasize ? 'text-[#0f0f10]' : 'text-[#f5f5f5]'
                }`}
              >
                {card.acao}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/5 bg-[#18181b] p-5 shadow-lg md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#9a9aa2]">Sua constância</span>
            <h3 className="mt-2 text-lg font-semibold text-[#f5f5f5]">Ritmo das últimas 4 semanas</h3>
          </div>
          <span className="rounded-full bg-[#0f0f10] px-3 py-1 text-xs font-semibold text-[#f5f5f5]">
            3 treinos
          </span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3 text-center text-sm text-[#c9c9d2] sm:grid-cols-7">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, index) => (
            <div
              key={`${dia}-${index}`}
              className={`flex h-12 flex-col items-center justify-center rounded-lg border border-[#2a2a31] ${
                index % 3 === 0 ? 'bg-white/10 text-[#f5f5f5]' : ''
              }`}
            >
              <span className="text-xs font-semibold uppercase">{dia}</span>
              <span className="text-[11px] text-[#9a9aa2]">run</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-lg border border-white/5 bg-[#18181b] p-5 shadow-lg transition hover:border-white/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-[#f5f5f5]">
                  {item.titulo}
                </h3>
                <p className="mt-1 text-sm text-[#c9c9d2]">{item.descricao}</p>
              </div>
              <span className="text-[#f5f5f5] text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


