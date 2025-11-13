import { Header } from '../(components)/Header'
import { Footer } from '../(components)/Footer'

export default function BrizzComingSoonPage() {
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
            Coffee Music & Run<br />Edição BRIZZ
          </h1>

          {/* Subtexto */}
          <p className="text-lg md:text-xl text-neutral-400 font-space max-w-lg mx-auto">
            Estamos ajustando algumas coisas.<br />Volte mais tarde.
          </p>

          {/* Botão de voltar */}
          <div className="pt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-neutral-200 font-orbitron font-bold uppercase hover:bg-white/5 transition-all"
            >
              ← Voltar para Home
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

