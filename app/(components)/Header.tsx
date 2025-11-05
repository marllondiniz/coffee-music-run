'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { EVENT_DATE_ISO, TICKETS_URL } from '@/lib/constants'

export function Header() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = EVENT_DATE_ISO - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Mobile: Logo e Botão lado a lado, Counter abaixo */}
        {/* Desktop: Logo, Counter e Botão na mesma linha */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4">
          {/* Mobile: Linha superior com Logo e Botão lado a lado */}
          <div className="flex items-center justify-between w-full lg:hidden gap-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full overflow-hidden">
                <Image
                  src="/logo-coffe-music.jpg"
                  alt="Coffee Music & Run"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                  priority
                />
              </div>
            </motion.div>

            {/* CTA Mobile */}
            <motion.a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-neutral-950 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
            >
              Quero meu ingresso
            </motion.a>
          </div>

          {/* Desktop: Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full overflow-hidden">
              <Image
                src="/logo-coffe-music.jpg"
                alt="Coffee Music & Run"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                priority
              />
            </div>
          </motion.div>

          {/* Counter - Apenas Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-3 w-auto">
            <div className="text-sm font-space text-neutral-300">
              Faltam:
            </div>
            <div className="flex items-center gap-3">
              {[
                { label: 'D', value: timeLeft.days },
                { label: 'H', value: timeLeft.hours },
                { label: 'M', value: timeLeft.minutes },
                { label: 'S', value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 min-w-[55px] text-center shadow-lg">
                    <div className="text-2xl font-orbitron font-bold text-neutral-100">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 font-space uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: CTA */}
          <motion.a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block px-4 py-2 bg-white text-neutral-950 font-orbitron font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            Quero meu ingresso
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}

