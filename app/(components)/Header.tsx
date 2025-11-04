'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4">
          {/* Counter */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block text-sm font-space text-neutral-300">
              Faltam:
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              {[
                { label: 'D', value: timeLeft.days },
                { label: 'H', value: timeLeft.hours },
                { label: 'M', value: timeLeft.minutes },
                { label: 'S', value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 min-w-[45px] md:min-w-[55px] text-center shadow-lg">
                    <div className="text-lg md:text-2xl font-orbitron font-bold text-neutral-100">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-[10px] md:text-xs text-neutral-400 mt-1 font-space uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white text-neutral-950 font-orbitron font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            Quero meu ingresso
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}

