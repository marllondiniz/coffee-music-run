'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'

const NAV_LINKS = [
  { href: '/admin', label: 'Visão geral' },
  { href: '/admin/eventos', label: 'Eventos' },
  { href: '/admin/conteudo', label: 'Conteúdo' },
  { href: '/admin/desafios', label: 'Desafios' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = getSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [denied, setDenied] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/testeapp')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle()

      if (error || !data?.is_admin) {
        setDenied(true)
        return
      }

      setLoading(false)
    }

    checkAdmin()
  }, [router, supabase])

  const handleLogout = async () => {
    if (loggingOut) return
    try {
      setLoggingOut(true)
      await supabase.auth.signOut()
      router.push('/testeapp')
    } catch (error) {
      console.error('Erro ao sair do painel admin:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  if (denied) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-neutral-100">
        <div className="max-w-md space-y-4 text-center">
          <h2 className="text-2xl font-bold">Acesso restrito</h2>
          <p className="text-sm text-neutral-400">
            Você precisa de permissão de administrador para acessar esta área.
          </p>
          <Link href="/inicio" className="text-amber-400 underline">
            Voltar para início
          </Link>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-neutral-100">
        Carregando painel...
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#f5f5f5]">
      <header className="border-b border-white/10 bg-[#0f0f10]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Painel administrativo</h1>
            <p className="text-sm text-neutral-400">
              Gerencie eventos, conteúdo e desafios do Clube Ritmo Certo.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap gap-3">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      active ? 'bg-[#f5f5f5] text-[#0f0f10]' : 'bg-[#1f1f23] text-[#f5f5f5]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#f5f5f5] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? 'Saindo...' : 'Sair'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}

