/**
 * SERWA Professional - FAQ Page
 * 
 * Footer section: Feedback + FAQ
 * Content placeholder - ready for client FAQs
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqItems = [
  { q: 'Content placeholder - FAQ question 1?', a: 'Content placeholder - FAQ answer 1.' },
  { q: 'Content placeholder - FAQ question 2?', a: 'Content placeholder - FAQ answer 2.' },
  { q: 'Content placeholder - FAQ question 3?', a: 'Content placeholder - FAQ answer 3.' },
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl font-semibold text-serwa-secondary mb-12"
      >
        Frequently Asked Questions
      </motion.h1>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-serwa-secondary/20 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 text-left font-medium text-serwa-secondary flex justify-between items-center hover:bg-serwa-secondary/5"
            >
              {item.q}
              <span className="text-serwa-accent">{openIndex === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-serwa-secondary/80">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
