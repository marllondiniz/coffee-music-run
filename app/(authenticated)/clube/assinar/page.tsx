export default function AssinarPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-4 text-center">
        <h2 className="text-3xl font-black uppercase leading-snug tracking-tight text-[#f5f5f5]">
          FAÇA PARTE DO
          <br />
          RITMO CERTO CLUBE
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Acesso exclusivo a eventos, cupons e experiências especiais para quem vive o movimento.
        </p>
      </header>

      <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-xl md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#f5f5f5]">Benefícios do Clube</h3>
          <span className="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">
            Em breve
          </span>
        </div>
        <div className="space-y-3">
          <ul className="space-y-3 text-sm text-[#c9c9d2]">
            <li className="flex items-start gap-3">
              <span className="text-lg">🎟️</span>
              <div>
                <strong className="text-[#f5f5f5]">Cupons exclusivos</strong>
                <p className="text-xs text-[#9a9aa2]">
                  Descontos especiais em marcas parceiras para potencializar seu ritmo.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">🏃‍♀️</span>
              <div>
                <strong className="text-[#f5f5f5]">Aulas experimentais</strong>
                <p className="text-xs text-[#9a9aa2]">
                  Acesso prioritário a treinos guiados e personalizados.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">✨</span>
              <div>
                <strong className="text-[#f5f5f5]">Experiências exclusivas</strong>
                <p className="text-xs text-[#9a9aa2]">
                  Vivências imersivas com especialistas em bem-estar, música e performance.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">🎉</span>
              <div>
                <strong className="text-[#f5f5f5]">Eventos exclusivos</strong>
                <p className="text-xs text-[#9a9aa2]">
                  Encontros especiais para fortalecer a comunidade e celebrar conquistas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">💰</span>
              <div>
                <strong className="text-[#f5f5f5]">Descontos em eventos pagos</strong>
                <p className="text-xs text-[#9a9aa2]">
                  Condições especiais para corridas e eventos com inscrição paga.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Plano mensal
            </span>
            <div className="text-right">
              <span className="text-3xl font-black text-[#f5f5f5]">R$ 49,90</span>
              <span className="text-sm text-emerald-200">/mês</span>
            </div>
          </div>
          <p className="text-xs text-emerald-100">
            Cancele quando quiser. Sem taxas, sem pegadinhas.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="w-full rounded-full border border-white/10 bg-[#0f0f10] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[#f5f5f5] opacity-60 shadow-lg"
        >
          Em breve
        </button>

        <p className="text-center text-xs text-[#73737c]">
          Ao assinar, você concorda com nossos termos de uso e política de privacidade.
        </p>
      </div>
    </section>
  )
}

