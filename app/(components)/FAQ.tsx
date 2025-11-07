'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/constants'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neutral-100 text-center mb-12 md:mb-16"
        >
          Perguntas Frequentes
        </motion.h2>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-4 md:py-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-800/50 transition-colors"
              >
                <span className="text-base md:text-lg font-orbitron font-bold text-neutral-100 pr-4">
                  {item.question}
                </span>
                <span className="text-neutral-300 text-xl flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 md:px-8 pb-4 md:pb-6"
                >
                  {item.answerHtml ? (
                    <div
                      className="text-sm md:text-base text-neutral-300 font-space leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  ) : (
                    <p className="text-sm md:text-base text-neutral-300 font-space leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

