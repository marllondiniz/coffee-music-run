'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { EVENT_LOCATION_NAME, EVENT_ADDRESS, EVENT_MAP_URL, EVENT_ADDRESS_FOR_MAP } from '@/lib/constants'

export function Location() {
  return (
    <section id="local" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-6"
          >
            Local do evento
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-xl space-y-6"
          >
            {/* Informações do local */}
            <div className="text-center space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-neutral-100">
                  {EVENT_LOCATION_NAME}
                </div>
                <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/logo%20brizz.jpg"
                    alt="Brizz"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                  />
                </div>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl text-neutral-300 font-space leading-relaxed">
                {EVENT_ADDRESS}
              </p>

              <motion.a
                href={EVENT_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-neutral-950 font-orbitron font-bold text-sm md:text-base uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
              >
                📍 Abrir no Google Maps
              </motion.a>
            </div>

            {/* Mapa embutido */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-white/10">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT_ADDRESS_FOR_MAP)}&output=embed&hl=pt-BR&z=16`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
