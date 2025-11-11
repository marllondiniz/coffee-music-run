'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ProfileRecord } from '@/lib/queries'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { ProfileForm } from './ProfileForm'

export default function PerfilPage() {
  const router = useRouter()
  const supabase = getSupabaseClient()
  const [profile, setProfile] = useState<ProfileRecord | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/testeapp')
        return
      }

      setEmail(user.email ?? null)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (error) {
        console.error('Erro ao carregar perfil:', error)
      }

      setProfile(data ?? null)
      setLoading(false)
    }

    fetchProfile()
  }, [router, supabase])

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-4 rounded-lg border border-white/5 bg-[#18181b] p-6 text-center text-[#c9c9d2]">
          Carregando informações do perfil...
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f5]">
          SEU RITMO, SEU JEITO
        </h2>
        <p className="text-sm text-[#c9c9d2]">
          Personalize seu perfil para receber experiências sob medida.
        </p>
      </header>

      <ProfileForm profile={profile} email={email} />
    </section>
  )
}