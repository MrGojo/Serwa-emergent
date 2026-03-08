/**
 * SERWA Professional - Scroll-driven flowing bottle sections
 *
 * Content sections that appear as the bottle flows:
 * - Section 1: Empty space on left where bottle moves, content on right
 * - Section 2: Bottle stops here (final position)
 * - Section 3: Bottle joins carousel
 *
 * The bottle animation is handled in HomePage.tsx
 */

import React, { forwardRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

// Use your shampoo bottle image - add it to public/shampoo-bottle.jpg
const SHAMPOO_BOTTLE_IMG = '/shampoo-bottle.jpg'

interface FlowingBottleSectionsProps {
  section1Ref?: React.RefObject<HTMLElement>
  section2Ref?: React.RefObject<HTMLElement>
}

const FlowingBottleSections = forwardRef<HTMLDivElement, FlowingBottleSectionsProps>(
  ({ section1Ref: externalSection1Ref, section2Ref: externalSection2Ref }, containerRef) => {
    // Use external refs if provided, otherwise create internal ones
    const internalSection1Ref = React.useRef<HTMLElement>(null)
    const internalSection2Ref = React.useRef<HTMLElement>(null)
    const section3Ref = React.useRef<HTMLElement>(null)
    
    const section1Ref = externalSection1Ref || internalSection1Ref
    const section2Ref = externalSection2Ref || internalSection2Ref

  // Track scroll progress for section 1 (bottle left, content right)
  const { scrollYProgress: scrollSection1 } = useScroll({
    target: section1Ref,
    offset: ['start end', 'end start'],
  })

  // Track scroll progress for section 2 (bottle right, content left)
  // When this reaches 1, bottle should become sticky
  const { scrollYProgress: scrollSection2 } = useScroll({
    target: section2Ref,
    offset: ['start end', 'center center'],
  })

  // Content appears as bottle moves left (section 1)
  // Content stays on right side, fades in
  const content1Opacity = useTransform(
    scrollSection1,
    [0, 0.2, 0.4],
    [0, 0.5, 1]
  )

  // Section 2: Content shifts slightly LEFT as bottle moves RIGHT (subtle, more centered)
  const content2X = useTransform(
    scrollSection2,
    [0, 0.3, 0.6],
    ['0%', '-5%', '-10%']
  )
  const content2Opacity = useTransform(
    scrollSection2,
    [0, 0.2, 0.4],
    [0, 0.5, 1]
  )

  return (
    <div ref={containerRef} className="relative">
      {/* ========== SECTION 1: Empty space on left (bottle moves here), content on right ========== */}
      <section
        ref={section1Ref as React.RefObject<HTMLElement>}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-serwa-primary py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-[80vh]">
            {/* Empty space on left - bottle will move here */}
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-start">
              {/* This space is intentionally left empty for the bottle to flow into */}
              <div className="relative w-48 sm:w-56 md:w-64 aspect-[3/5] opacity-0 pointer-events-none" />
            </div>

            {/* Company content - right side, fades in */}
            <motion.div
              style={{ 
                opacity: content1Opacity 
              }}
              className="flex-1 text-center md:text-left z-10"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                SERWA Professional
              </h2>
              <p className="text-serwa-secondary/80 text-lg max-w-xl mb-8">
                Content placeholder — add company story and brand message here. India&apos;s leading
                brand in effective luxury haircare. Our formulations restore, repair, and rejuvenate.
              </p>
              <Link to="/our-story" className="btn-outline inline-block">
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: Second curve - Content moves left, bottle moves right and STOPS ========== */}
      <section
        ref={section2Ref as React.RefObject<HTMLElement>}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-serwa-primary py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-[80vh]">
            {/* Content on left - slightly shifts left as bottle moves right */}
            <motion.div
              style={{ 
                x: content2X,
                opacity: content2Opacity 
              }}
              className="flex-1 max-w-xl text-center md:text-left z-10 order-2 md:order-1"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Professional Shampoo
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Clean. Nourish. Protect.
              </h2>
              <p className="text-serwa-secondary/80 text-lg max-w-xl mb-8">
                Content placeholder — add shampoo product copy here. Gentle yet effective for
                professional results.
              </p>
              <Link to="/shop/shampoo" className="btn-primary inline-block">
                Shop Shampoo
              </Link>
            </motion.div>

            {/* Empty space on right – moving bottle from HomePage will stop here */}
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-end order-1 md:order-2">
              {/* Invisible placeholder just to reserve layout space */}
              <div className="relative w-36 sm:w-44 md:w-52 lg:w-60 aspect-[3/5] opacity-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: Bottle joins carousel with other products ========== */}
      <section
        ref={section3Ref}
        className="relative py-20 md:py-28 bg-serwa-secondary/5 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 px-4"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-4">
            Explore the range
          </h2>
          <p className="text-serwa-secondary/80 max-w-xl mx-auto">
            Choose from our professional haircare collection.
          </p>
        </motion.div>

        {/* Carousel: bottle as first item, then products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* First card: shampoo bottle */}
            <div className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center">
              <Link
                to="/shop/shampoo"
                className="block bg-serwa-primary rounded-2xl overflow-hidden shadow-lg border border-serwa-secondary/10 hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[3/4] flex items-center justify-center p-8 bg-gradient-to-b from-serwa-primary to-serwa-primary/80">
                  <img
                    src={SHAMPOO_BOTTLE_IMG}
                    alt="SERWA Shampoo"
                    className="max-h-full w-auto object-contain drop-shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.svg'
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-semibold text-serwa-secondary">
                    Professional Shampoo
                  </h3>
                  <p className="text-serwa-secondary/70 text-sm mt-1">350ml & 1000ml</p>
                </div>
              </Link>
            </div>

            {/* Rest: other products */}
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center">
                <Link
                  to={`/product/${product.handle}`}
                  className="block bg-serwa-primary rounded-2xl overflow-hidden shadow-lg border border-serwa-secondary/10 hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[3/4] flex items-center justify-center p-6 bg-serwa-primary/50">
                    <img
                      src={product.images[0] || '/placeholder-product.svg'}
                      alt={product.title}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-serwa-secondary">
                      {product.title}
                    </h3>
                    <p className="text-serwa-secondary/70 text-sm mt-1">
                      {product.variants[0]?.option || 'View'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
})

FlowingBottleSections.displayName = 'FlowingBottleSections'

export default FlowingBottleSections
