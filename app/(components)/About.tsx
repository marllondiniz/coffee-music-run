'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export function About() {
  const [brizzImageError, setBrizzImageError] = useState(false)

  return (
    <section id="sobre" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 mb-8"
          >
            Sobre o Projeto
          </motion.h2>

          {/* Imagem Brizz */}
          {!brizzImageError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 md:mb-12"
            >
              <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/brizz.webp"
                  alt="Brizz - Cultura & Gastronomia"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 900px"
                  onError={() => setBrizzImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          )}
          
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 font-space leading-relaxed max-w-70ch mx-auto">
            O projeto, que já se consolidou como um dos mais autênticos da cidade, convida você a começar o dia de um jeito diferente, com <span className="text-neutral-100 font-semibold">atividade física leve</span>, <span className="text-shimmer">boa música</span> e <span className="text-neutral-100 font-semibold">café especial</span> pra recarregar a energia e criar novas conexões.
          </p>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-100 font-space font-bold leading-relaxed max-w-70ch mx-auto">
            Mais que um evento, o Coffee Music and Run é um convite pra desacelerar da rotina, cultivar saúde e celebrar a manhã ao lado de amigos e de uma comunidade que vibra no mesmo ritmo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

