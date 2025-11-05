'use client'

import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const EVENT_PHOTOS = [
  { id: 2, src: '/foto2.jpg', alt: 'Evento anterior 2' },
  { id: 3, src: '/foto3.jpg', alt: 'Evento anterior 3' },
  { id: 4, src: '/foto4.jpg', alt: 'Evento anterior 4' },
  { id: 5, src: '/foto5.jpg', alt: 'Evento anterior 5' },
  { id: 6, src: '/foto6.jpg', alt: 'Evento anterior 6' },
  { id: 7, src: '/foto7.jpg', alt: 'Evento anterior 7' },
  { id: 8, src: '/foto8.jpg', alt: 'Evento anterior 8' },
  { id: 9, src: '/foto9.jpg', alt: 'Evento anterior 9' },
  { id: 10, src: '/foto10.jpg', alt: 'Evento anterior 10' },
  { id: 11, src: '/foto11.jpg', alt: 'Evento anterior 11' },
  { id: 12, src: '/foto12.jpg', alt: 'Evento anterior 12' },
  { id: 13, src: '/foto13.jpg', alt: 'Evento anterior 13' },
  { id: 14, src: '/foto14.jpg', alt: 'Evento anterior 14' },
  { id: 15, src: '/foto15.jpg', alt: 'Evento anterior 15' },
  { id: 16, src: '/foto16.jpg', alt: 'Evento anterior 16' },
  { id: 17, src: '/foto17.jpg', alt: 'Evento anterior 17' },
  { id: 18, src: '/foto18.jpg', alt: 'Evento anterior 18' },
  { id: 19, src: '/foto19.jpg', alt: 'Evento anterior 19' },
  { id: 20, src: '/foto20.jpg', alt: 'Evento anterior 20' },
  { id: 21, src: '/foto21.jpg', alt: 'Evento anterior 21' },
  { id: 22, src: '/foto22.jpg', alt: 'Evento anterior 22' },
]

export function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Duplicar as fotos 2 vezes para criar loop infinito perfeito
  const duplicatedPhotos = [...EVENT_PHOTOS, ...EVENT_PHOTOS]

  // Calcular largura exata de uma cópia (22 fotos)
  // Mobile: 200px + 16px gap = 216px por foto
  // Desktop: 300px + 32px gap = 332px por foto  
  // Desktop LG: 350px + 32px gap = 382px por foto
  const getPhotoWidth = () => {
    if (typeof window === 'undefined') return 216
    if (window.innerWidth >= 1024) return 382 // lg
    if (window.innerWidth >= 768) return 332 // md
    return 216 // mobile
  }

  useEffect(() => {
    let animationId: number
    let startTime = Date.now()
    const duration = 55000 // 55 segundos para passar todas as 21 fotos (mais devagar)
    
    const animate = () => {
      const photoWidth = getPhotoWidth()
      const segmentWidth = EVENT_PHOTOS.length * photoWidth // Exatamente 21 fotos
      
      const elapsed = Date.now() - startTime
      const progress = (elapsed % duration) / duration
      const newX = -progress * segmentWidth
      
      // Resetar apenas quando passar COMPLETAMENTE todas as 22 fotos
      if (Math.abs(newX) >= segmentWidth) {
        x.set(0)
        startTime = Date.now()
      } else {
        x.set(newX)
      }
      
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [x])

  return (
    <section id="galeria" className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-4">
            Eventos Anteriores
          </h2>
          <p className="text-base md:text-lg text-neutral-300 font-space text-center max-w-2xl mx-auto">
            Um pouco da energia e da vibe dos nossos eventos anteriores
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden py-6 md:py-8">
          {/* Gradientes laterais para fade */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 lg:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 lg:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
          
          {/* Carrossel infinito */}
          <motion.div
            ref={containerRef}
            className="flex items-center"
            style={{ x }}
          >
            {/* Primeira cópia - 22 fotos */}
            <div className="flex gap-4 md:gap-8 flex-shrink-0 items-center">
              {EVENT_PHOTOS.map((photo, index) => (
                <div
                  key={`first-${photo.id}`}
                  className="flex-shrink-0 relative group"
                >
                  <div className="relative w-[200px] h-[250px] md:w-[300px] md:h-[350px] lg:w-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 350px"
                      quality={100}
                      priority={index < 6}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Segunda cópia - 22 fotos para loop infinito */}
            <div className="flex gap-4 md:gap-8 flex-shrink-0 ml-4 md:ml-8 items-center">
              {EVENT_PHOTOS.map((photo, index) => (
                <div
                  key={`second-${photo.id}`}
                  className="flex-shrink-0 relative group"
                >
                  <div className="relative w-[200px] h-[250px] md:w-[300px] md:h-[350px] lg:w-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 350px"
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
