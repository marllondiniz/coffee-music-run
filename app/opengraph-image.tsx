import { ImageResponse } from 'next/og'
import { EVENT_NAME, EVENT_DATE, EVENT_TIME } from '@/lib/constants'

export const alt = EVENT_NAME
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          color: '#fafafa',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          COFFEE MUSIC & RUN
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 40,
            color: '#d4d4d4',
            textAlign: 'center',
          }}
        >
          EDIÇÃO BRIZZ
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#d4d4d4',
            textAlign: 'center',
          }}
        >
          {EVENT_DATE} • {EVENT_TIME}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

