/**
 * SERWA Professional - Education Page
 * 
 * Molecular 360 technology, product guides, professional advantages.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const professionalAdvantages = [
  {
    title: 'Customizing',
    description: 'Stylist selects the right treatment (nanoplastia, botox and protein) for each client without carrying separate treatments.',
  },
  {
    title: 'Instant Activation',
    description: 'Easy to prepare — Mix shot + Base Cream, Apply, Process, Rinse.',
  },
  {
    title: 'Multi-Benefit System',
    description: 'Smoothness, repair, strength, and hydration achieved in one range.',
  },
  {
    title: 'Safe Formula',
    description: 'Formaldehyde-free, designed for professional salon use.',
  },
  {
    title: 'No Rinse Required',
    description: 'All the nutrients stay locked inside your hair, ensuring deeper repair, enhanced smoothness, and extended shine.',
  },
  {
    title: 'Simplified Inventory',
    description: 'No extra inventory needed — one cream + three ampoules replaces multiple separate products.',
  },
]

export default function EducationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6"
          >
            Education
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-serwa-secondary/80 max-w-2xl mx-auto"
          >
            Learn about Molecular 360 technology and how Serwa Professional is redefining hair care.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-xl italic text-serwa-secondary mt-4"
          >
            Beauty begins at the molecule.
          </motion.p>
        </div>
      </section>

      {/* Molecular 360 intro */}
      <section className="py-12 md:py-16 bg-serwa-primary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
              What is Molecular 360?
            </h2>
            <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
              Serwa Professional is a premium house of promoting new-age technology and innovation in the cosmetics industry with the evolving growth of science, simplicity and self-expression. It is a <strong>tri-therapy treatment</strong>, marking the beginning of next-generation technology promising hair restoration and straightening powered by molecular technology.
            </p>
            <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
              The molecular treatment is the first-generation customisable treatment. It isn&apos;t just a treatment — it&apos;s a transformation ritual, where science meets sensorial artistry. This tailor-made treatment allows experienced stylists and end consumers to craft hair care as unique as every strand can get. Each formula blends targeted shots of Nanoplastia, Botox or Collagen Protein with the game-changing Restructuring Cream to create smooth, straight results — working deep within the fibre and renewing strength.
            </p>
            <p className="text-serwa-secondary/80 leading-relaxed">
              While creating the brand, the founders believed at heart that true beauty begins with the strength and resilience of each molecule. Immense care was taken to honour individuality, creating hair that isn&apos;t just transformed — but crafted in pursuit of perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serwa philosophy */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
              The Serwa Philosophy
            </h2>
            <p className="text-serwa-secondary/80 leading-relaxed">
              Serwa was born between the space of science and self-expression. For years, salons relied on treatments that delivered one kind of beauty — smoothness, straight, or restoration — but rarely all at once. Clients learned to choose between health and transformation. Stylists learned to work between limits as guided by brands. Serwa exists to end that compromise. Created by professionals who believed hair deserved more than correction, Serwa is built on the simple truth: <em>&ldquo;Hair isn&apos;t a problem to fix — it&apos;s a canvas to empower.&rdquo;</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Advantages */}
      <section className="py-12 md:py-20 bg-serwa-secondary/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary text-center mb-12"
          >
            Professional Advantages
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {professionalAdvantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-serwa-primary/50 rounded-xl p-6 border border-serwa-secondary/10"
              >
                <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-3">
                  {item.title}
                </h3>
                <p className="text-serwa-secondary/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/shop" className="btn-primary inline-block">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
