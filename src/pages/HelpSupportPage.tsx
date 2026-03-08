/**
 * SERWA Professional - Help & Support Page
 * 
 * Footer section: Help and Support
 * Content placeholders - Contact, Shipping, Returns, Track Order
 */

import { motion } from 'framer-motion'

const helpSections = [
  { id: 'contact', title: 'Contact Us', content: 'Content placeholder - add contact information, email, phone.' },
  { id: 'shipping', title: 'Shipping & Delivery', content: 'Content placeholder - add shipping policy, delivery times.' },
  { id: 'returns', title: 'Returns & Exchanges', content: 'Content placeholder - add returns policy.' },
  { id: 'orders', title: 'Track Order', content: 'Content placeholder - add order tracking information.' },
]

export default function HelpSupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl font-semibold text-serwa-secondary mb-12"
      >
        Help & Support
      </motion.h1>
      <div className="space-y-12">
        {helpSections.map((section, i) => (
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
