/**
 * SERWA Professional - Legalities Page
 * 
 * Footer section: Legalities
 * Content placeholders - Privacy Policy, Terms of Service, Cookie Policy
 */

import { motion } from 'framer-motion'

const legalSections = [
  { id: 'privacy', title: 'Privacy Policy', content: 'Content placeholder - add privacy policy from client.' },
  { id: 'terms', title: 'Terms of Service', content: 'Content placeholder - add terms of service from client.' },
  { id: 'cookies', title: 'Cookie Policy', content: 'Content placeholder - add cookie policy from client.' },
]

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl font-semibold text-serwa-secondary mb-12"
      >
        Legalities
      </motion.h1>
      <div className="space-y-12">
        {legalSections.map((section, i) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h2 className="font-serif text-xl font-semibold text-serwa-secondary mb-4">
              {section.title}
            </h2>
            <p className="text-serwa-secondary/80">{section.content}</p>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
