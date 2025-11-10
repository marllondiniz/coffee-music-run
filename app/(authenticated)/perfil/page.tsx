'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { UploadCloud, Check } from 'lucide-react'

export default function PerfilPage() {
  const [receberBeneficios, setReceberBeneficios] = useState(true)
  const [salvo, setSalvo] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSalvo(true)
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setSalvo(false)
      timeoutRef.current = null
    }, 3000)
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          SEU RITMO, SEU JEITO
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Personalize seu perfil para receber experiências sob medida.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-white/5 bg-[#18181b] p-6 shadow-xl"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-[#f4c542]/40 bg-[#0f0f10]">
            <UploadCloud className="h-8 w-8 text-[#f4c542]" />
            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4c542] text-[#0f0f10]"
            >
              <UploadCloud className="h-5 w-5" />
            </button>
          </div>
          <span className="text-xs text-[#9a9aa2]">
            Envie uma foto em JPEG ou PNG (máx. 2MB)
          </span>
        </div>

        <div className="space-y-4 text-left">
          <label className="space-y-2">
            <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Nome</span>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-[#f4c542] focus:outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Bio curta</span>
            <textarea
              placeholder="Conte um pouco sobre você..."
              rows={3}
              className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-[#f4c542] focus:outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Esporte favorito</span>
            <input
              type="text"
              placeholder="Ex: Corrida, Yoga, Funcional"
              className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-[#f4c542] focus:outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold uppercase text-[#f5f5f5]">Frequência semanal</span>
            <input
              type="text"
              placeholder="Ex: 3x por semana"
              className="w-full rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#54545b] focus:border-[#f4c542] focus:outline-none"
            />
          </label>
        </div>

        <label className="flex items-center justify-between rounded-2xl border border-[#2a2a31] bg-[#0f0f10] px-4 py-3">
          <div>
            <span className="block text-sm font-semibold uppercase text-[#f5f5f5]">
              Quero receber desafios e benefícios exclusivos
            </span>
            <p className="text-xs text-[#9a9aa2]">
              Enviaremos novidades por e-mail e notificações.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReceberBeneficios((prev) => !prev)}
            className={`relative flex h-6 w-11 items-center rounded-full transition ${
              receberBeneficios ? 'bg-[#f4c542]' : 'bg-[#34343b]'
            }`}
            aria-pressed={receberBeneficios}
          >
            <span
              className={`absolute left-1 h-4 w-4 rounded-full bg-[#0f0f10] transition ${
                receberBeneficios ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#f4c542] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f0f10] transition hover:brightness-105"
        >
          Salvar meu ritmo
        </button>

        {salvo && (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#f4c542]/40 bg-[#1f1f22] px-4 py-3 text-sm font-semibold text-[#f4c542]">
            <Check className="h-4 w-4" />
            Alterações salvas com sucesso!
          </div>
        )}
      </form>
    </section>
  )
}


