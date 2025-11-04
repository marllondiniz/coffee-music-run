'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { TICKETS_URL, EXPERIENCIA_ITEMS, EXPERIENCIA_PLUS_ITEMS } from '@/lib/constants'

export function Tickets() {
  const [garminImageError, setGarminImageError] = useState(false)

  return (
    <section id="ingressos" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-12 md:mb-16 pulse-glow"
        >
          INGRESSOS
        </motion.h2>

        {/* Imagem do sorteio Garmin */}
        {!garminImageError && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Imagem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-video md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
              >
                <Image
                  src="/garmim-sorteio.jpg"
                  alt="Sorteio Garmin - Primeiros 200 inscritos"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setGarminImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Conteúdo de texto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs md:text-sm font-orbitron font-bold text-white uppercase tracking-wider mb-4">
                    🎁 EXCLUSIVO PARA OS 200 PRIMEIROS
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-black text-neutral-100 mb-4 leading-tight">
                  OS 200 PRIMEIROS INSCRITOS
                  <br />
                  <span className="text-shimmer">CONCORRERÃO A UM GARMIN</span>
                  <br />
                  FORERUNNER 55
                </h3>
                
                <p className="text-lg md:text-xl font-orbitron font-bold text-neutral-300 mb-4">
                  A EDIÇÃO QUE VAI FICAR PRA HISTÓRIA...
                </p>
                
                <p className="text-base md:text-lg font-space text-neutral-300 leading-relaxed">
                  Sorteio de um Garmin entre os 200 primeiros inscritos no plano <span className="text-neutral-100 font-semibold">Experiência + Camisa</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:items-stretch">
          {/* Ingresso Experiência */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-900/90 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 transition-all duration-300 shadow-xl flex flex-col relative overflow-hidden group"
          >
            {/* Efeito de brilho sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-neutral-100 mb-6">
                Experiência Coffee Music
              </h3>
              
              {/* Preço destacado */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-space text-neutral-400">R$</span>
                  <span className="text-5xl md:text-6xl font-orbitron font-black text-neutral-100">60</span>
                  <span className="text-xl md:text-2xl font-space text-neutral-400">,00</span>
                </div>
              </div>
              
              <p className="text-base md:text-lg font-space font-semibold text-neutral-300 mb-6 uppercase tracking-wider">
                Inclui:
              </p>
              
              <ul className="space-y-3 md:space-y-4 mb-8 flex-grow">
                {EXPERIENCIA_ITEMS.slice(0, 6).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neutral-100 mt-1 text-base flex-shrink-0">✓</span>
                    <span className="text-sm md:text-base text-neutral-300 font-space leading-relaxed">{item}</span>
                  </li>
                ))}
                <li className="text-neutral-400 text-sm font-space italic mt-4 pt-4 border-t border-white/5">
                  + mais {EXPERIENCIA_ITEMS.length - 6} itens inclusos
                </li>
              </ul>
              
              <motion.a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center px-6 md:px-8 py-4 md:py-5 bg-white text-neutral-950 font-orbitron font-bold text-base md:text-lg uppercase tracking-wider transition-all duration-300 hover:bg-neutral-100 rounded-xl shadow-lg hover:shadow-xl mt-auto"
              >
                Garantir Ingresso
              </motion.a>
            </div>
          </motion.div>

          {/* Ingresso Experiência + Camisa */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8 md:p-10 hover:border-white/50 transition-all duration-300 relative overflow-hidden shadow-2xl flex flex-col group"
          >
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge Popular */}
            <div className="absolute top-4 right-4 bg-white text-neutral-950 px-4 py-2 rounded-full text-xs md:text-sm font-orbitron font-bold uppercase shadow-lg z-20">
              Popular
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-neutral-100 mb-6 pr-16">
                Experiência COFFEEMUSIC + Camisa
              </h3>
              
              {/* Preço destacado */}
              <div className="mb-8 pb-8 border-b border-white/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-space text-neutral-400">R$</span>
                  <span className="text-5xl md:text-6xl font-orbitron font-black text-neutral-100">100</span>
                  <span className="text-xl md:text-2xl font-space text-neutral-400">,00</span>
                </div>
              </div>
              
              <p className="text-base md:text-lg font-space font-semibold text-neutral-300 mb-4">
                Inclui todos os benefícios da Experiência Coffee Music, mais:
              </p>
              
              <ul className="space-y-3 md:space-y-4 mb-8 flex-grow">
                {EXPERIENCIA_PLUS_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neutral-100 mt-1 text-base flex-shrink-0">⚡</span>
                    <span className="text-sm md:text-base text-neutral-300 font-space leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <motion.a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center px-6 md:px-8 py-4 md:py-5 bg-white text-neutral-950 font-orbitron font-bold text-base md:text-lg uppercase tracking-wider transition-all duration-300 hover:bg-neutral-100 rounded-xl shadow-lg hover:shadow-xl mt-auto"
              >
                Garantir Ingresso
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

