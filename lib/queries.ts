import { getSupabaseServer } from './supabaseServer'
import type { ProfileRecord } from './profile'

export type EventRecord = {
  id: string
  titulo: string
  descricao: string | null
  data_horario: string
  local_nome: string
  local_detalhe: string | null
  preco: number | null
  gratuito: boolean | null
  participantes_confirmados: number | null
  capacidade_maxima: number | null
  destaque: boolean | null
  banner_id?: string | null
}

export type EventBannerRecord = {
  id: string
  titulo: string | null
  subtitulo: string | null
  event_id: string | null
  image_url: string
  image_path: string
  is_active: boolean | null
  created_at: string
}

export type ArticleRecord = {
  id: string
  titulo: string
  autor_handle: string
  categoria: string | null
  resumo: string | null
  icone: string | null
  publicado_em: string | null
}

export type ChallengeRecord = {
  id: string
  titulo: string
  descricao: string | null
  progresso_padrao: number | null
  ordem: number | null
  semana_referencia: string | null
}

export type ChallengeProgressRecord = {
  challenge_id: string
  progresso: number | null
}

export async function getEvents(): Promise<EventRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('data_horario', { ascending: true })

  if (error) {
    console.error('Erro ao buscar eventos:', error)
    return []
  }

  return data ?? []
}

export async function getActiveEventBanners(): Promise<EventBannerRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('event_banners')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar banners ativos:', error)
    return []
  }

  return data ?? []
}

export async function getEventBanners(): Promise<EventBannerRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('event_banners')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao listar banners:', error)
    return []
  }

  return data ?? []
}

export async function getArticles(): Promise<ArticleRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('publicado_em', { ascending: false })

  if (error) {
    console.error('Erro ao buscar artigos:', error)
    return []
  }

  return data ?? []
}

export async function getChallenges(): Promise<ChallengeRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('ordem', { ascending: true })

  if (error) {
    console.error('Erro ao buscar desafios:', error)
    return []
  }

  return data ?? []
}

export async function getChallengeProgress(userId: string): Promise<ChallengeProgressRecord[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('challenge_progress')
    .select('challenge_id, progresso')
    .eq('user_id', userId)

  if (error) {
    console.error('Erro ao buscar progresso de desafios:', error)
    return []
  }

  return data ?? []
}

export async function getProfile(userId: string): Promise<ProfileRecord | null> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }

  return data ?? null
}

