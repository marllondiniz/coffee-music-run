'use client'

import Image from 'next/image'

const SPONSORS = [
  { id: 1, image: '/parceiro-tutti.png', alt: 'Tuti Frutti' },
  { id: 2, image: '/parceiro_Fidelity.png', alt: 'Fidelity' },
  { id: 3, image: '/parceiro-live.png', alt: 'Live' },
  { id: 4, image: '/parceiro-mangalo.png', alt: 'Mangalô' },
  { id: 5, image: '/parceirofrifort.png', alt: 'Frifort' },
]

export function SponsorsCarousel() {
  // Duplicar os patrocinadores múltiplas vezes para criar efeito infinito suave
  // Criar 3 cópias completas para garantir que todas apareçam
  const duplicatedSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS]

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8 lg:py-10">
      {/* Gradientes laterais para fade */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 lg:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 lg:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-scroll-infinite items-center">
        {/* Primeira renderização */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-shrink-0 items-center">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`first-${sponsor.id}-${index}`}
              className="flex-shrink-0 bg-transparent border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              style={{ width: '160px', height: '120px' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  width={sponsor.image === '/parceirofrifort.png' ? 100 : sponsor.image === '/parceiro-mangalo.png' ? 320 : 180}
                  height={sponsor.image === '/parceirofrifort.png' ? 70 : sponsor.image === '/parceiro-mangalo.png' ? 200 : 120}
                  className={`object-contain ${sponsor.image === '/parceiro-mangalo.png' ? 'max-w-[220px] max-h-[140px] md:max-w-[320px] md:max-h-[200px]' : ''}`}
                  style={{ 
                    maxWidth: sponsor.image === '/parceirofrifort.png' ? '100px' : sponsor.image === '/parceiro-mangalo.png' ? undefined : '180px', 
                    maxHeight: sponsor.image === '/parceirofrifort.png' ? '70px' : sponsor.image === '/parceiro-mangalo.png' ? undefined : '120px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Segunda renderização para loop infinito */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-shrink-0 ml-4 sm:ml-6 md:ml-8 lg:ml-12 items-center">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`second-${sponsor.id}-${index}`}
              className="flex-shrink-0 bg-transparent border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              style={{ width: '160px', height: '120px' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  width={sponsor.image === '/parceirofrifort.png' ? 100 : sponsor.image === '/parceiro-mangalo.png' ? 320 : 180}
                  height={sponsor.image === '/parceirofrifort.png' ? 70 : sponsor.image === '/parceiro-mangalo.png' ? 200 : 120}
                  className={`object-contain ${sponsor.image === '/parceiro-mangalo.png' ? 'max-w-[220px] max-h-[140px] md:max-w-[320px] md:max-h-[200px]' : ''}`}
                  style={{ 
                    maxWidth: sponsor.image === '/parceirofrifort.png' ? '100px' : sponsor.image === '/parceiro-mangalo.png' ? undefined : '180px', 
                    maxHeight: sponsor.image === '/parceirofrifort.png' ? '70px' : sponsor.image === '/parceiro-mangalo.png' ? undefined : '120px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
