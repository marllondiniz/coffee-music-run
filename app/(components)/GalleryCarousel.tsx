'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EVENT_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/foto${i + 1}.jpg`,
  alt: `Evento anterior ${i + 1}`,
}))

export function GalleryCarousel() {
  // Duplicar as fotos para criar efeito infinito
  const duplicatedPhotos = [...EVENT_PHOTOS, ...EVENT_PHOTOS]

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
          
          <div className="flex animate-scroll-infinite items-center">
            {/* Primeira renderização */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 flex-shrink-0 items-center">
              {duplicatedPhotos.map((photo, index) => (
                <motion.div
                  key={`first-${photo.id}-${index}`}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Segunda renderização para loop infinito */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 flex-shrink-0 ml-4 sm:ml-6 md:ml-8 items-center">
              {duplicatedPhotos.map((photo, index) => (
                <motion.div
                  key={`second-${photo.id}-${index}`}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:border-white/30 transition-all duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
