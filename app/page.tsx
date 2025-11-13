import type { Metadata } from 'next'
import { Header } from './(components)/Header'
import { Footer } from './(components)/Footer'

export const metadata: Metadata = {
  title: 'Ritmo Certo Club - Em breve',
  description:
    'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
  openGraph: {
    title: 'Ritmo Certo Club',
    description:
      'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
    url: 'https://ritmocertoclub.com.br',
    type: 'website',
    siteName: 'Ritmo Certo Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritmo Certo Club',
    description:
      'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Conteúdo centralizado */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center space-y-6">
          {/* Badge "Em breve" */}
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full bg-amber-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 border border-amber-500/20">
              Em breve
            </span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-neutral-100">
            Ritmo Certo Club
          </h1>

          {/* Subtexto */}
          <p className="text-lg md:text-xl text-neutral-400 font-space max-w-lg mx-auto">
            Estamos ajustando algumas coisas.<br />Volte mais tarde.
          </p>

          {/* Botão de acesso ao app */}
          <div className="pt-8">
            <a
              href="/testeapp"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-neutral-950 font-orbitron font-bold uppercase hover:bg-neutral-100 transition-all"
            >
              Acessar área exclusiva →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
