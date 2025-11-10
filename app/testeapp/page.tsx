import type { Metadata } from 'next'

import LoginClient from '../login-client'

export const metadata: Metadata = {
  title: 'Área exclusiva | Coffee Music & Run',
  description:
    'Faça login ou crie sua conta para acessar o Clube Ritmo Certo: eventos, desafios, conteúdo e benefícios exclusivos.',
  openGraph: {
    title: 'Área exclusiva | Coffee Music & Run',
    description:
      'Entre para acessar eventos, desafios, conteúdos e benefícios do Clube Ritmo Certo.',
    url: 'https://ritmocertoclub.com.br/testeapp',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Área exclusiva | Coffee Music & Run',
    description:
      'Entre para acessar eventos, desafios, conteúdos e benefícios do Clube Ritmo Certo.',
  },
}

export default function TesteAppPage() {
  return <LoginClient />
}

