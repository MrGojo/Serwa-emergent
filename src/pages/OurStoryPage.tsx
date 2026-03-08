/**
 * SERWA Professional - Our Story Page
 * 
 * Brand story, philosophy, and why we exist.
 */

import { motion } from 'framer-motion'

export default function OurStoryPage() {
  return (
    <div>
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-serwa-primary to-serwa-primary/80" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-serwa-secondary/80"
          >
            This is not a game changer. The game is changed. One brand. One belief. One complete solution.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-serif italic text-serwa-secondary/90 mt-4"
          >
            SERWA doesn&apos;t ask you to choose between treatments. It asks you to choose clarity.
          </motion.p>
        </div>
      </section>

      {/* Content blocks */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            How did SERWA Professional come into existence?
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Serwa Professional and the founders didn&apos;t begin with the product — it began with a question. Why does beauty always ask us to choose between science and soul, between what works and what feels beautiful? We refused that choice. This brand was built in the quiet space between formulation and feeling — where precision meets intuition. Every molecule, every texture, every result is designed not just to perform, but to mean something.
          </p>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            As beauty, at its highest level, is not decoration — it is engineering with intention. We believe transformation should be intelligent and that results should be measurable. Luxury should never be loud — it should be certain. Our work is driven by research, perfected by craft, and elevated by restraint. At Serwa Professional we promise to create systems, not trends; solutions, not promises. Performance that speaks for itself from the first use.
          </p>
          <p className="text-serwa-secondary/80 mb-12 leading-relaxed">
            This is beauty that respects time and understands structure. It doesn&apos;t chase attention — because it earns trust. We are here for those who see beauty as discipline, for professionals, performers and purists. For those who know that true excellence is quiet, deliberate, and uncompromising. This is not a universe of products. It is a universe of performance.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Who are we as a brand?
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            We believe brands are not built in factories — they are built in hands. In the hands that mix, test, revise and begin again. We refuse to believe in shortcuts — even when no one is watching. This brand exists because people do, because behind every formulation is a human who cared enough to perfect it, who stepped up at all stages where the product required effort, patience, and an uncompromising eye for excellence. We believe that beauty reaches its highest form when it is guided by those who respect the process as much as the outcome.
          </p>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Our foundation is hair, but our philosophy goes deeper. We honour structure, strength, and transformation at every stage. From concept to creation, from first touch to lasting performance, nothing here is accidental. The founder is not outside the story. They are a part of it. Having stood at every level of the journey, they understand the labour it takes to create something truly refined.
          </p>
          <p className="text-serwa-secondary/80 mb-12 leading-relaxed">
            Luxury to us is not excess. It is intention. It is consistency. It is people who show up, again and again, to do things properly. We don&apos;t chase perfection. We practice it. This is a brand shaped by belief, built by people, and defined by excellence — in hair, in craft, in everything we touch.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Why choose SERWA Professional over pre-existing brands?
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Serwa Professional is not about having options. It is about following the right system. The pre-existing market products have trained stylists to layer solutions — treatments from one brand, botox from another and collagen from the third — hoping the combination will deliver results. What it actually delivered was incoherence.
          </p>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            At Serwa Professional we questioned this fragmentation. <strong className="text-serwa-secondary">One philosophy. One system. One solution.</strong> Molecular 360 is not a replacement born out of trends — it is an evolution of brands understanding hair at its fundamental level. Instead of asking hair to adapt to multiple treatments, we built a single molecular system that works with the hair&apos;s internal structure. Treatments smooth. Botox fills. Collagen coats. <strong className="text-serwa-secondary">Molecular 360 works at the molecular level</strong> where strength, elasticity, repair, and longevity actually begin.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Why not rely on multiple brands?
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Different brands mean mixing intentions. Different brands are built on different formulations, philosophies, and performance goals — when layered together, they often compete rather than collaborate, leading to inconsistent results, over-processing, and dependency on repeated treatments.
          </p>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            <strong className="text-serwa-secondary">Serwa promises to remove this uncertainty.</strong> With Molecular 360: Stylists don&apos;t have to compromise between treatments. Consumers don&apos;t have to chase solutions. Hair doesn&apos;t have to recover from over-treatment. Everything works in alignment, not overlap.
          </p>
        </motion.div>
      </section>

      {/* Quote section */}
      <section className="py-16 bg-serwa-secondary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-serwa-secondary italic"
          >
            &ldquo;Beauty begins at the molecule.&rdquo;
          </motion.blockquote>
        </div>
      </section>
    </div>
  )
}
