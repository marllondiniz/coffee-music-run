'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { EVENT_NAME, TICKETS_URL } from '@/lib/constants'
import { SponsorsCarousel } from './SponsorsCarousel'

export function Hero() {
  const [eventoImageError, setEventoImageError] = useState(false)
  
  const particles = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 10,
    })), []
  )

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden py-8 md:min-h-screen md:py-0">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 animated-grid opacity-20" />
      <div className="absolute inset-0 z-0 radial-gradient-1" />
      <div className="absolute inset-0 z-0 radial-gradient-2" />
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 212, 212, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(212, 212, 212, 0.06) 0%, transparent 50%)`,
          backgroundSize: '200% 200%',
          filter: 'blur(60px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-0 md:py-20 lg:py-24">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 lg:gap-16 xl:gap-20 items-center mb-8 md:mb-16 lg:mb-20">
          {/* Imagem do evento - primeiro no mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full md:order-2"
          >
            {!eventoImageError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-[180px] sm:h-[220px] md:h-auto md:aspect-[16/9] lg:min-h-[600px] xl:min-h-[700px] rounded-lg md:rounded-2xl overflow-hidden shadow-xl group mx-auto"
              >
                <Image
                  src="/evento.jpg"
                  alt="Coffee Music & Run - Evento"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  priority
                  onError={() => setEventoImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )}
          </motion.div>

          {/* Conteúdo de texto - segundo no mobile */}
          <div className="text-center md:text-left w-full md:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-black mb-4 md:mb-8 lg:mb-10 tracking-tight leading-tight"
            >
              <span className="text-gradient pulse-glow inline-block">
                COFFEE MUSIC & RUN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-300 mb-4 sm:mb-6 md:mb-12 lg:mb-16 leading-relaxed font-space"
              style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}
            >
              Vem aí uma edição pra fechar o ano no <span className="text-shimmer">ritmo certo</span>, com nova energia, novo cenário e a mesma vibe que fez o Coffee Music se tornar o que é: uma <span className="text-neutral-100 font-semibold">comunidade que corre, vive e celebra junto</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-100 font-orbitron font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight sm:leading-normal"
              style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}
            >
              O Brizz será palco dessa nova largada. Pode apostar: vai ser histórico.
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center md:items-start justify-center md:justify-start"
            >
              <motion.a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 lg:py-6 bg-white text-neutral-950 font-orbitron font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wider border-2 border-white transition-all duration-300 hover:bg-transparent hover:text-white rounded-xl md:rounded-2xl"
              >
                ⚡️ Garantir ingresso
              </motion.a>
            </motion.div>
          </div>
        </div>
        
        {/* Carrossel de Patrocinadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-16 lg:mt-20"
        >
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-orbitron font-bold text-neutral-300 text-center mb-4 md:mb-8 lg:mb-10 uppercase tracking-wider">
            Patrocinadores & Parcerias
          </h3>
          <SponsorsCarousel />
        </motion.div>
      </div>
    </section>
  )
}

