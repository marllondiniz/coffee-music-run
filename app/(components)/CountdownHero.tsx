'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EVENT_DATE_ISO } from '@/lib/constants'

export function CountdownHero() {
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
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-2xl md:text-3xl font-space text-neutral-300 mb-4">
        ⏱ Faltam <span className="text-neutral-100 font-bold">{timeLeft.days}</span> dias para fechar o ano no ritmo certo
      </p>
      
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Dias', value: timeLeft.days },
          { label: 'Horas', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Seg', value: timeLeft.seconds },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] shadow-lg">
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-neutral-100">
                {String(item.value).padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs md:text-sm text-neutral-300 mt-2 font-space uppercase tracking-wider">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

