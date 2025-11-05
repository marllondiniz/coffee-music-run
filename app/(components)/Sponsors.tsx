'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const SPONSORS = [
  { id: 1, image: '/parceiro-tutti.png', alt: 'Tuti Frutti' },
  { id: 2, image: '/parceiro_Fidelity.png', alt: 'Fidelity' },
  { id: 3, image: '/parceiro-live.png', alt: 'Live' },
  { id: 4, image: '/parceiro-mangalo.png', alt: 'Mangalô' },
  { id: 5, image: '/parceirofrifort.png', alt: 'Frifort' },
]

export function Sponsors() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-12 md:mb-16"
        >
          Patrocinadores & Parcerias
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {SPONSORS.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-transparent border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 flex items-center justify-center h-[150px]"
            >
              <Image
                src={sponsor.image}
                alt={sponsor.alt}
                width={sponsor.image === '/parceiro-mangalo.png' ? 220 : sponsor.image === '/parceirofrifort.png' ? 120 : 180}
                height={sponsor.image === '/parceiro-mangalo.png' ? 140 : sponsor.image === '/parceirofrifort.png' ? 80 : 120}
                className={`object-contain ${sponsor.image === '/parceirofrifort.png' ? 'max-w-[100px] max-h-[70px] md:max-w-[180px] md:max-h-[120px]' : ''}`}
                style={{ 
                  maxWidth: sponsor.image === '/parceiro-mangalo.png' ? '220px' : sponsor.image === '/parceirofrifort.png' ? undefined : '100%', 
                  maxHeight: sponsor.image === '/parceiro-mangalo.png' ? '140px' : sponsor.image === '/parceirofrifort.png' ? undefined : '100%',
                  width: 'auto',
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

