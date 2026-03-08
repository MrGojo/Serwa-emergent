/**
 * SERWA Professional - Feedback Page
 * 
 * Footer section: Feedback + FAQ
 * Content placeholder - feedback form
 */

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl font-semibold text-serwa-secondary mb-6"
      >
        Give Feedback
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-serwa-secondary/80 mb-8"
      >
        Content placeholder - add feedback intro. We value your opinion.
      </motion.p>

      {submitted ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-serwa-accent font-medium"
        >
          Thank you for your feedback!
        </motion.p>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block font-medium text-serwa-secondary mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-serwa-secondary/20 rounded focus:outline-none focus:ring-2 focus:ring-serwa-accent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-serwa-secondary mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-serwa-secondary/20 rounded focus:outline-none focus:ring-2 focus:ring-serwa-accent"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-serwa-secondary mb-2">Feedback</label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 border border-serwa-secondary/20 rounded focus:outline-none focus:ring-2 focus:ring-serwa-accent"
              placeholder="Your feedback..."
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Submit Feedback
          </button>
        </motion.form>
      )}
    </div>
  )
}
