import Link from 'next/link'
import { getChallenges, getEvents } from '@/lib/queries'

export default async function AdminHomePage() {
  const [eventos, desafios] = await Promise.all([getEvents(), getChallenges()])

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-[#f5f5f5]">
          Visão geral
        </h2>
        <p className="text-sm text-[#9a9aa2]">
          Atalhos rápidos para gerenciar o conteúdo do Clube Ritmo Certo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/eventos"
          className="rounded-lg border border-white/10 bg-[#18181b] p-5 shadow-lg transition hover:border-white/30"
        >
          <h3 className="text-lg font-semibold text-[#f5f5f5]">Eventos</h3>
          <p className="mt-1 text-sm text-[#c9c9d2]">
            {eventos.length} evento(s) cadastrados.
          </p>
          <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-[#f5f5f5]">
            Gerenciar
          </span>
        </Link>

        <Link
          href="/admin/conteudo"
          className="rounded-lg border border-white/10 bg-[#18181b] p-5 shadow-lg transition hover:border-white/30"
        >
          <h3 className="text-lg font-semibold text-[#f5f5f5]">Conteúdo</h3>
          <p className="mt-1 text-sm text-[#c9c9d2]">
            Publicações do blog e dicas para a comunidade.
          </p>
          <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-[#f5f5f5]">
            Gerenciar
          </span>
        </Link>

        <Link
          href="/admin/desafios"
          className="rounded-lg border border-white/10 bg-[#18181b] p-5 shadow-lg transition hover:border-white/30"
        >
          <h3 className="text-lg font-semibold text-[#f5f5f5]">Desafios</h3>
          <p className="mt-1 text-sm text-[#c9c9d2]">
            {desafios.length} desafio(s) ativos esta semana.
          </p>
          <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-[#f5f5f5]">
            Gerenciar
          </span>
        </Link>
      </div>
    </section>
  )
}
