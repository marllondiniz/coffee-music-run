import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Coffee Music & Run — Edição BRIZZ',
  description:
    'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade. Edição BRIZZ — 13 de dezembro, 6h30.',
  openGraph: {
    title: 'Coffee Music & Run — Edição BRIZZ',
    description:
      'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade. Edição BRIZZ — 13 de dezembro, 6h30.',
    url: 'https://ritmocertoclub.com.br/teste',
    type: 'website',
    siteName: 'Coffee Music & Run',
    images: [
      {
        url: 'https://ritmocertoclub.com.br/brizz.webp',
        width: 1200,
        height: 630,
        alt: 'Coffee Music & Run — Edição BRIZZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Music & Run — Edição BRIZZ',
    description:
      'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade. Edição BRIZZ — 13 de dezembro, 6h30.',
    images: ['https://ritmocertoclub.com.br/brizz.webp'],
  },
}

export default function Home() {
  redirect('/teste')
}
