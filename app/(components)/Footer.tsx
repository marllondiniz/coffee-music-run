'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { EVENT_NAME, EVENT_LOCATION_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative py-16 md:py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          {/* Coffee Music Logo */}
          <div className="flex items-center gap-4">
            <div className="text-2xl md:text-3xl font-orbitron font-bold text-neutral-100">
              COFFEE MUSIC
            </div>
            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/logo-coffe-music.jpg"
                alt="Coffee Music & Run"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40px, 48px"
              />
            </div>
          </div>

          {/* Brizz Logo */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start mb-2">
              <div className="text-2xl md:text-3xl font-orbitron font-bold text-neutral-100">
                BRIZZ
              </div>
              <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/logo%20brizz.jpg"
                  alt="Brizz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40px, 48px"
                />
              </div>
            </div>
            <div className="text-xs md:text-sm text-neutral-300 font-space uppercase tracking-wider">
              CULTURA & GASTRONOMIA
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base md:text-lg text-neutral-300 font-space mt-12 md:mt-16 max-w-70ch mx-auto leading-relaxed"
        >
          O Brizz será palco dessa nova largada. Pode apostar: vai ser histórico.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-sm text-neutral-400 font-space mt-8"
        >
          © 2025 {EVENT_NAME}. Todos os direitos reservados.
        </motion.div>
      </div>
    </footer>
  )
}

