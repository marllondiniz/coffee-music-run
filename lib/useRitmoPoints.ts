'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from './supabaseClient'
import type { RitmoPointsRecord, UserStreakRecord, UserBadgeRecord, BadgeRecord } from './ritmo-points'

type RitmoPointsData = {
  saldoAtual: number
  crescimentoSemanal: number
  metaSemanal: number
  progressoSemanal: number
  streak: number
  badges: (UserBadgeRecord & { badge: BadgeRecord })[]
  loading: boolean
}

export function useRitmoPoints(userId: string | null) {
  const [data, setData] = useState<RitmoPointsData>({
    saldoAtual: 0,
    crescimentoSemanal: 0,
    metaSemanal: 100,
    progressoSemanal: 0,
    streak: 0,
    badges: [],
    loading: true,
  })

  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!userId) {
      setData((prev) => ({ ...prev, loading: false }))
      return
    }

    let isMounted = true

    const fetchData = async () => {
      try {
        // Buscar pontos totais
        const { data: pontosData } = await supabase
          .from('ritmo_points')
          .select('pontos')
          .eq('user_id', userId)

        const saldoAtual = pontosData?.reduce((acc, p) => acc + (p.pontos ?? 0), 0) ?? 0

        // Buscar pontos da semana atual
        const inicioSemana = new Date()
        inicioSemana.setDate(inicioSemana.getDate() - 7)

        const { data: pontosSemanais } = await supabase
          .from('ritmo_points')
          .select('pontos')
          .eq('user_id', userId)
          .gte('created_at', inicioSemana.toISOString())

        const pontosSemanaAtual = pontosSemanais?.reduce((acc, p) => acc + (p.pontos ?? 0), 0) ?? 0

        // Buscar pontos da semana passada (para calcular crescimento)
        const inicioSemanaPassada = new Date()
        inicioSemanaPassada.setDate(inicioSemanaPassada.getDate() - 14)
        const fimSemanaPassada = new Date()
        fimSemanaPassada.setDate(fimSemanaPassada.getDate() - 7)

        const { data: pontosSemanaAnterior } = await supabase
          .from('ritmo_points')
          .select('pontos')
          .eq('user_id', userId)
          .gte('created_at', inicioSemanaPassada.toISOString())
          .lt('created_at', fimSemanaPassada.toISOString())

        const pontosSemanaPassada = pontosSemanaAnterior?.reduce((acc, p) => acc + (p.pontos ?? 0), 0) ?? 0

        // Buscar streak
        const { data: streakData } = await supabase
          .from('user_streak')
          .select('streak_atual')
          .eq('user_id', userId)
          .maybeSingle()

        const streak = streakData?.streak_atual ?? 0

        // Buscar badges
        const { data: badgesData } = await supabase
          .from('user_badges')
          .select('*, badge:badges(*)')
          .eq('user_id', userId)
          .order('desbloqueado_em', { ascending: false })

        if (!isMounted) return

        const metaSemanal = 100 // Pode vir do perfil do usuário futuramente
        const progressoSemanal = Math.min(100, Math.round((pontosSemanaAtual / metaSemanal) * 100))

        setData({
          saldoAtual,
          crescimentoSemanal: pontosSemanaAtual - pontosSemanaPassada,
          metaSemanal,
          progressoSemanal,
          streak,
          badges: (badgesData as any) ?? [],
          loading: false,
        })
      } catch (error) {
        console.error('Erro ao buscar dados de Ritmo Points:', error)
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false }))
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [userId, supabase])

  return data
}

