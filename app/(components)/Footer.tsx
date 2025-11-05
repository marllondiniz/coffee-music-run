'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { EVENT_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative py-4 md:py-6 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Coffee Music Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-1"
        >
          <div className="relative h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 flex-shrink-0">
            <Image
              src="/icone-com-coffemussic.png"
              alt="Coffee Music & Run"
              width={256}
              height={256}
              className="object-contain h-full w-full"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base md:text-lg text-neutral-300 font-space max-w-70ch mx-auto leading-relaxed mb-2 md:mb-3"
        >
          O Brizz será palco dessa nova largada. Pode apostar: vai ser histórico.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-sm text-neutral-400 font-space"
        >
          © 2025 {EVENT_NAME}. Todos os direitos reservados.
        </motion.div>
      </div>
    </footer>
  )
}

