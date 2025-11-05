import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { EVENT_NAME, EVENT_DATE, EVENT_TIME, EVENT_LOCATION_NAME } from '@/lib/constants'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700', '900'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ritmocertoclub.com.br'),
  title: 'Coffee Music & Run — Edição BRIZZ',
  description: 'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade. Edição BRIZZ — 13 de dezembro, 6h30. Garanta seu ingresso.',
  keywords: ['corrida', 'café', 'música', 'comunidade', 'BRIZZ', 'Guarapari', 'functional', 'yoga', 'DJ'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/logo-coffe-music.jpg',
  },
  openGraph: {
    title: 'Coffee Music & Run — Edição BRIZZ',
    description: 'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade. Edição BRIZZ — 13 de dezembro, 6h30.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ritmocertoclub.com.br',
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
    description: 'Feche o ano no ritmo certo: corrida leve, música, café especial e comunidade.',
    images: ['https://ritmocertoclub.com.br/brizz.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/logo-coffe-music.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: EVENT_NAME,
              startDate: '2025-12-13T06:30:00',
              endDate: '2025-12-13T10:00:00',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              location: {
                '@type': 'Place',
                name: EVENT_LOCATION_NAME,
              },
              organizer: {
                '@type': 'Organization',
                name: 'Coffee Music',
              },
            }),
          }}
        />
      </head>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} font-space antialiased`}>
        {children}
        {/* Analytics placeholder */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}


