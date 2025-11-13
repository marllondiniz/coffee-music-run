import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ritmo Certo Club',
  description:
    'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
  openGraph: {
    title: 'Ritmo Certo Club',
    description:
      'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
    url: 'https://ritmocertoclub.com.br',
    type: 'website',
    siteName: 'Ritmo Certo Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritmo Certo Club',
    description:
      'Comunidade de corrida, música e café. Eventos, desafios e experiências exclusivas.',
  },
}

export default function Home() {
  redirect('/testeapp')
}
