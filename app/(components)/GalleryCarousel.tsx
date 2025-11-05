'use client'

import { motion, useMotionValue, PanInfo, animate } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const EVENT_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/foto${i + 1}.jpg`,
  alt: `Evento anterior ${i + 1}`,
}))

export function GalleryCarousel() {
  const [isDragging, setIsDragging] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Duplicar as fotos 2 vezes para garantir loop infinito suave sem duplicação visível
  const duplicatedPhotos = [...EVENT_PHOTOS, ...EVENT_PHOTOS]

  // Calcular largura total de uma foto + gap no mobile (200px + 16px = 216px)
  const photoWidth = 216
  const segmentWidth = EVENT_PHOTOS.length * photoWidth // Largura de um conjunto de 12 fotos

  useEffect(() => {
    if (!autoScroll || isDragging) return
    
    let animationId: number
    let startTime = Date.now()
    const duration = 38000 // 38 segundos para passar todas as 12 fotos no mobile (velocidade reduzida)
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = (elapsed % duration) / duration
      const newX = -progress * segmentWidth
      
      // Quando chegar ao final do primeiro segmento (passou todas as 12 fotos),
      // resetar suavemente para 0 (início do primeiro segmento que é idêntico ao segundo)
      // Como temos 2 cópias idênticas, quando uma termina, resetamos para o início
      // que visualmente é idêntico ao segundo segmento
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
  }, [autoScroll, isDragging, segmentWidth, x])

  const handleDragStart = () => {
    setIsDragging(true)
    setAutoScroll(false)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    const currentX = x.get()
    const newX = currentX + info.offset.x
    
    // Normalizar para manter dentro dos limites do loop infinito
    let normalizedX = newX
    if (normalizedX <= -segmentWidth) {
      normalizedX = normalizedX + segmentWidth
    } else if (normalizedX > 0) {
      normalizedX = normalizedX - segmentWidth
    }
    
    // Snap para a foto mais próxima
    const photoIndex = Math.round(-normalizedX / photoWidth)
    const snappedX = -photoIndex * photoWidth
    
    // Garantir que está dentro dos limites
    let finalX = snappedX
    if (finalX <= -segmentWidth) {
      finalX = finalX + segmentWidth
    } else if (finalX >= 0) {
      finalX = finalX - segmentWidth
    }
    
    // Animar suavemente até a foto com snap
    animate(x, finalX, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.3
    })
    
    // Retomar auto-scroll após um delay maior para dar tempo de visualizar a foto
    setTimeout(() => {
      setAutoScroll(true)
    }, 3000)
  }

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
          
          {/* Desktop: Animação automática */}
          <div className="hidden md:flex animate-scroll-infinite items-center">
            <div className="flex gap-8 flex-shrink-0 items-center">
              {duplicatedPhotos.map((photo, index) => (
                <motion.div
                  key={`desktop-${photo.id}-${index}`}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-[300px] lg:w-[350px] h-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-8 flex-shrink-0 ml-8 items-center">
              {duplicatedPhotos.map((photo, index) => (
                <motion.div
                  key={`desktop-second-${photo.id}-${index}`}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-[300px] lg:w-[350px] h-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Com arrasto */}
          <motion.div
            ref={containerRef}
            className="md:hidden flex gap-4 flex-shrink-0 items-center touch-pan-x cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -segmentWidth, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {duplicatedPhotos.map((photo, index) => (
              <div
                key={`mobile-${photo.id}-${index}`}
                className="flex-shrink-0 relative"
              >
                <div className="relative w-[200px] h-[250px] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
