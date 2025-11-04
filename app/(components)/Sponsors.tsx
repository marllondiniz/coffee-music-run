'use client'

import { motion } from 'framer-motion'

export function Sponsors() {
  const sponsors = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: `Patrocinador ${i + 1}`,
  }))

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
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-lg flex items-center justify-center min-h-[120px]"
            >
              <span className="text-neutral-400 font-space text-sm md:text-base">{sponsor.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

