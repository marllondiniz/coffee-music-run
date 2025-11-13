import Link from 'next/link'
import Image from 'next/image'
import {
  getActiveEventBanners,
  getChallenges,
  getChallengeProgress,
  getEvents,
  type EventBannerRecord,
} from '@/lib/queries'
import { getSupabaseServer } from '@/lib/supabaseServer'
import { RitmoPointsPanel } from './RitmoPointsPanel'
import { ActivityHeatmap } from './ActivityHeatmap'

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

  const [eventos, desafios, progressoUsuario, banners] = await Promise.all([
    getEvents(),
    getChallenges(),
    user ? getChallengeProgress(user.id) : Promise.resolve([]),
    getActiveEventBanners(),
  ])

  const eventosOrdenados = [...eventos].sort((a, b) =>
    new Date(a.data_horario).getTime() - new Date(b.data_horario).getTime()
  )
  const proximoEvento = eventosOrdenados.find((evento) => new Date(evento.data_horario) >= new Date()) || eventosOrdenados[0]
  const destaqueBanner: EventBannerRecord | null =
    proximoEvento?.id ? banners.find((banner) => banner.event_id === proximoEvento.id) ?? null : null

  const destaque = {
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
    banner: destaqueBanner,
  }

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

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card destaque do evento */}
          <div
          className={`relative flex h-full flex-col overflow-hidden rounded-lg border border-white/5 shadow-lg transition ${
            destaque.banner ? 'bg-[#0f0f10]' : 'bg-gradient-to-r from-[#f5f5f5] to-[#dcdcdc]'
          }`}
        >
          {destaque.banner && (
            <>
              <Image
                src={destaque.banner.image_url}
                alt={destaque.banner.titulo ?? destaque.titulo}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f10]/85 via-[#0f0f10]/75 to-[#0f0f10]/45" />
            </>
          )}

          <div
            className={`relative z-10 flex h-full flex-col p-5 ${
              destaque.banner ? 'text-[#f5f5f5]' : 'text-[#0f0f10]'
            }`}
          >
            <h3 className="text-base font-semibold uppercase tracking-wide">{destaque.titulo}</h3>
            <p
              className={`mt-2 text-sm ${
                destaque.banner ? 'text-[#e2e2e2]' : 'text-[#2c240d]'
              }`}
            >
              {destaque.descricao}
            </p>
            {destaque.href ? (
              <Link
                href={destaque.href}
                className={`mt-auto inline-flex text-xs font-semibold uppercase tracking-wider ${
                  destaque.banner ? 'text-emerald-200 hover:text-emerald-100' : 'text-[#0f0f10]'
                }`}
              >
                {destaque.acao}
              </Link>
            ) : (
              <span
                className={`mt-auto inline-flex text-xs font-semibold uppercase tracking-wider ${
                  destaque.banner ? 'text-[#f5f5f5]' : 'text-[#0f0f10]'
                }`}
              >
                {destaque.acao}
              </span>
            )}
          </div>
        </div>

        {/* Ritmo Points e Desafio */}
        <div className="md:col-span-2">
          <RitmoPointsPanel />
        </div>
      </div>

      <ActivityHeatmap />

    </section>
  )
}


