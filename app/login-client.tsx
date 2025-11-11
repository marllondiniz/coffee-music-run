'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { getSupabaseClient } from '@/lib/supabaseClient'

type AuthMode = 'signIn' | 'signUp' | 'reset'

const MODE_LABEL: Record<AuthMode, string> = {
  signIn: 'Entrar',
  signUp: 'Criar conta',
  reset: 'Recuperar senha',
}

export default function LoginClient() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const origin = useMemo(
    () => (typeof window !== 'undefined' ? window.location.origin : ''),
    []
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(null)

    if (!email) {
      setFeedback({ type: 'error', text: 'Informe um e-mail válido.' })
      return
    }

    if (mode !== 'reset' && password.length < 6) {
      setFeedback({ type: 'error', text: 'A senha precisa ter pelo menos 6 caracteres.' })
      return
    }

    if (mode === 'signUp' && password !== confirmPassword) {
      setFeedback({ type: 'error', text: 'As senhas não conferem.' })
      return
    }

    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      if (mode === 'signIn') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
          throw error
        }

        const userId = data.user?.id
        if (userId) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', userId)
            .maybeSingle()

          if (profile?.is_admin) {
            setFeedback({ type: 'success', text: 'Bem-vindo(a), administrador!' })
            router.push('/admin')
            return
          }
        }

        setFeedback({ type: 'success', text: 'Login realizado com sucesso!' })
        router.push('/inicio')
      }

      if (mode === 'signUp') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: origin ? `${origin}/testeapp` : undefined,
          },
        })
        
        if (error) {
          throw error
        }

        const userId = data.user?.id
        const userEmail = data.user?.email ?? email

        if (userId && userEmail) {
          const response = await fetch('/api/auth/create-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, email: userEmail }),
          })

          if (!response.ok) {
            console.error('Falha ao sincronizar perfil:', await response.text())
          }
        }

        setFeedback({
          type: 'success',
          text: 'Conta criada! Verifique seu e-mail para confirmar o cadastro.',
        })
        setMode('signIn')
        setPassword('')
        setConfirmPassword('')
      }

      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: origin ? `${origin}/inicio` : undefined,
        })

        if (error) {
          throw error
        }

        setFeedback({
          type: 'success',
          text: 'Se o e-mail estiver cadastrado, enviamos instruções para recuperação.',
        })
        setMode('signIn')
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível completar a ação. Tente novamente.'
      setFeedback({ type: 'error', text: message })
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (newMode: AuthMode) => {
    setFeedback(null)
    setMode(newMode)

    if (newMode !== 'signUp') {
      setConfirmPassword('')
    }
  }

  const primaryActionLabel = MODE_LABEL[mode]

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-16 text-neutral-100">
      <div className="grid w-full max-w-5xl gap-12 rounded-lg border border-neutral-800 bg-neutral-900/70 p-10 shadow-xl backdrop-blur">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src="/coffe-music.png" alt="Coffee Music & Run" width={240} height={240} />
          <div>
            <h1 className="mt-2 text-3xl font-semibold">
              {mode === 'signIn' && 'Faça login para acessar a área exclusiva'}
              {mode === 'signUp' && 'Crie sua conta para participar'}
              {mode === 'reset' && 'Esqueceu sua senha? Sem problemas.'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-5">
          <label className="flex flex-col gap-2 text-left">
            <span className="text-sm font-medium text-neutral-200">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-base text-neutral-100 outline-none transition focus:border-white/60 focus:ring focus:ring-white/20"
              placeholder="seu@email.com"
              required
            />
          </label>

          {mode !== 'reset' && (
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-medium text-neutral-200">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-base text-neutral-100 outline-none transition focus:border-white/60 focus:ring focus:ring-white/20"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </label>
          )}

          {mode === 'signUp' && (
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-medium text-neutral-200">Confirmar senha</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-base text-neutral-100 outline-none transition focus:border-white/60 focus:ring focus:ring-white/20"
                placeholder="Repita sua senha"
                required
                minLength={6}
              />
            </label>
          )}

          {feedback && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-red-400/40 bg-red-500/10 text-red-200'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#f5f5f5] px-4 py-3 text-base font-semibold text-[#0f0f10] transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
          >
            {loading ? 'Aguarde...' : primaryActionLabel}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-300">
            {mode !== 'signIn' && (
              <button
                type="button"
                onClick={() => handleModeChange('signIn')}
                className="transition hover:text-white"
              >
                Já tenho conta
              </button>
            )}
            {mode !== 'signUp' && (
              <button
                type="button"
                onClick={() => handleModeChange('signUp')}
                className="transition hover:text-white"
              >
                Criar conta
              </button>
            )}
            {mode !== 'reset' && (
              <button
                type="button"
                onClick={() => handleModeChange('reset')}
                className="transition hover:text-white"
              >
                Esqueci minha senha
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

