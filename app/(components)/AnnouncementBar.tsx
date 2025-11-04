'use client'

import { motion } from 'framer-motion'
import { EVENT_DATE, EVENT_TIME, EVENT_LOCATION_NAME, TICKETS_URL } from '@/lib/constants'

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-neutral-300">
            <span className="font-space">📅 {EVENT_DATE}</span>
            <span className="font-space">🕐 {EVENT_TIME}</span>
            <span className="font-space">📍 {EVENT_LOCATION_NAME}</span>
          </div>
          <motion.a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white text-neutral-950 font-orbitron font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Quero meu ingresso
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

