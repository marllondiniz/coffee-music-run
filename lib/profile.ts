export type ProfileRecord = {
  id: string
  email: string | null
  nome: string | null
  bio: string | null
  telefone: string | null
  esporte_favorito: string | null
  frequencia_semanal: string | null
  recebe_beneficios: boolean | null
  avatar_url: string | null
  is_complete: boolean | null
  hasActiveSubscription?: boolean | null
  hasactivesubscription?: boolean | null
}

export type UserRole = 'FREE' | 'SUBSCRIBER'

export function getUserRole(
  profile: Pick<ProfileRecord, 'hasActiveSubscription' | 'hasactivesubscription'> | null
): UserRole {
  const hasSubscription =
    profile?.hasActiveSubscription ?? profile?.hasactivesubscription ?? false

  return hasSubscription ? 'SUBSCRIBER' : 'FREE'
}
