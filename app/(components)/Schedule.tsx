'use client'

import { motion } from 'framer-motion'
import { SCHEDULE } from '@/lib/constants'

export function Schedule() {
  return (
    <section id="programacao" className="relative py-20 md:py-32 px-6 md:px-12 bg-neutral-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-12 md:mb-16"
        >
          Programação
        </motion.h2>

        <div className="relative">
          {/* Timeline vertical */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />
          
          <div className="space-y-6 md:space-y-8">
            {SCHEDULE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 md:w-24 h-16 md:h-24 bg-neutral-900/90 backdrop-blur-sm border-2 border-white/20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg group-hover:border-white/40 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-neutral-900 hidden md:block" />
                </div>
                
                {/* Content */}
                <div className="flex-grow bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-lg group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                    <div className="flex-1">
                      <div className="text-2xl md:text-3xl font-orbitron font-bold text-neutral-100 mb-2">
                        {item.time}
                      </div>
                      <div className="text-lg md:text-xl font-space text-neutral-300">
                        {item.title}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-space text-neutral-300 uppercase tracking-wider">
                        {item.icon} {item.title.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

