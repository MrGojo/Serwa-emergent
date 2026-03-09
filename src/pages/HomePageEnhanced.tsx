/**
 * SERWA Professional - Enhanced Hero with Scroll Animation
 * 
 * Keeps the existing clean layout:
 * - Text content on LEFT
 * - Model image on RIGHT (in gradient container)
 * - Bottle overlays model's hand
 * - Scroll-driven bottle animation
 * - Reversible animation
 * - Modern, minimal, luxury aesthetic
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { products } from '../data/products'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const MODEL_IMAGE = '/model-holding-bottle.png'
const BOTTLE_TRANSPARENT = '/bottle-transparent.png'

export default function HomePageEnhanced() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLImageElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)

  // Main scroll animation
  useEffect(() => {
    if (!bottleRef.current || !heroRef.current) return

    const bottle = bottleRef.current
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      gsap.set(bottle, { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      // Initial position: bottle overlays model's hand
      // Positioned absolutely in hero section, NOT inside image container
      // Calculate position to align with model's hand (right side of hero)
      gsap.set(bottle, {
        position: 'fixed',
        right: '18%',  // Position relative to viewport
        top: '42%',    // Vertical alignment with hand
        width: '160px',
        zIndex: 100,   // Above everything
        transformOrigin: 'center center',
      })

      // Subtle idle floating when at rest
      gsap.to(bottle, {
        y: '+=8',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Main scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          // markers: true, // Uncomment to debug
        },
      })

      // Phase 1: Detach with Z-depth illusion (0-20%)
      tl.to(bottle, {
        scale: 1.05,
        y: '+=30',
        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.25)) blur(0.3px)',
        duration: 0.25,
        ease: 'power2.out',
      })

      // Phase 2: Move downward toward text content with scaling (20-50%)
      tl.to(bottle, {
        y: '+=250',
        x: '-=150',  // Move toward center/text
        scale: 1.15, // Scale UP during movement
        rotation: 2,
        filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.3))',
        duration: 0.4,
        ease: 'power1.inOut',
      })

      // Phase 3: Lock in front of text (50-70%)
      tl.to(bottle, {
        rotation: 0,
        duration: 0.25,
      })

      // Phase 4: Return to hand position (70-100%)
      tl.to(bottle, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))',
        duration: 0.35,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative bg-serwa-primary">
      {/* HERO SECTION - Enhanced with model image */}
      <div
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-serwa-primary via-serwa-primary to-[#f0e8dc]"
      >
        {/* FLOATING BOTTLE - Absolutely positioned, NOT inside image container */}
        <img
          ref={bottleRef}
          src={BOTTLE_TRANSPARENT}
          alt="SERWA Bottle"
          className="hidden md:block absolute"
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[80vh]">
            
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full md:w-1/2 text-center md:text-left z-20"
            >
              <p className="text-serwa-secondary/70 uppercase tracking-[0.3em] text-xs md:text-sm mb-4 font-medium">
                SERWA PROFESSIONAL
              </p>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-serwa-secondary mb-6 leading-tight">
                This is not a game changer.
                <br />
                <span className="text-serwa-accent">The game is changed.</span>
              </h1>
              
              <p className="text-base md:text-lg text-serwa-secondary/80 max-w-xl mx-auto md:mx-0 mb-4">
                The future of hair care is integrated, intelligent, and intentional.
              </p>
              
              <p className="text-base md:text-lg text-serwa-secondary/60 italic max-w-xl mx-auto md:mx-0 mb-8">
                One brand. One belief. One complete solution.
              </p>

              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <Link
                  to="/shop"
                  className="btn-primary px-8 py-3 text-base"
                >
                  Shop Now
                </Link>
                <Link
                  to="/our-story"
                  className="btn-outline px-8 py-3 text-base"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Model Image Container (NO bottle inside) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full md:w-1/2 flex justify-center md:justify-end"
            >
              {/* Container with gradient frame */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50 shadow-2xl">
                {/* Model image ONLY - bottle is separate */}
                <img
                  src={MODEL_IMAGE}
                  alt="SERWA Professional Model"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Bottle on LEFT - Content on RIGHT */}
      <section
        ref={section1Ref}
        className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-serwa-primary py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Empty space LEFT for bottle */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="w-48 aspect-[3/5]" />
            </div>

            {/* Content RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Beauty begins at the molecule
              </h2>
              <p className="text-serwa-secondary/80 text-lg leading-relaxed mb-6 max-w-xl">
                Serwa Professional began with a question: why does beauty ask us to choose between 
                science and soul? We refused that choice. Built in the space between formulation and 
                feeling — where precision meets intuition.
              </p>
              <Link to="/our-story" className="btn-primary inline-block">
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Bottle on RIGHT - Content on LEFT */}
      <section
        ref={section2Ref}
        className="relative min-h-screen flex items-center bg-gradient-to-b from-serwa-primary to-white py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            {/* Empty space RIGHT for bottle */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="w-48 aspect-[3/5]" />
            </div>

            {/* Content LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Professional Shampoo
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Clean. Nourish. Protect.
              </h2>
              <p className="text-serwa-secondary/80 text-lg leading-relaxed mb-6 max-w-xl">
                No rinse required. All nutrients stay locked inside your hair for deeper repair, 
                enhanced smoothness, and extended shine. Formaldehyde-free, designed for 
                professional salon use.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link to="/shop/shampoo" className="btn-primary inline-block">
                  Shop Now
                </Link>
                <Link to="/education" className="btn-outline inline-block">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section className="relative py-20 md:py-32 bg-serwa-primary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-4">
            Explore the Collection
          </h2>
          <p className="text-serwa-secondary/70 text-lg max-w-2xl mx-auto">
            Discover our complete range of molecular-intelligent haircare solutions
          </p>
        </motion.div>

        {/* Product carousel */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
            >
              <Link
                to={`/product/${product.handle}`}
                className="block bg-white rounded-3xl overflow-hidden shadow-xl border border-serwa-accent/10 hover:shadow-2xl hover:border-serwa-accent/30 transition-all duration-300 group"
              >
                <div className="aspect-[3/4] flex items-center justify-center p-6 bg-gradient-to-br from-serwa-primary/30 to-white">
                  <img
                    src={product.images[0] || '/placeholder-product.svg'}
                    alt={product.title}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-semibold text-serwa-secondary">
                    {product.title}
                  </h3>
                  <p className="text-serwa-secondary/70 text-sm mt-1">
                    {product.variants[0]?.option || 'Professional'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </section>

      {/* Additional content sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-serwa-secondary/10 to-serwa-accent/5">
              <div className="absolute inset-0 flex items-center justify-center text-serwa-secondary/20 text-6xl font-serif">
                Image
              </div>
            </div>
            <div>
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-2">
                Designed For
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Chemically-treated or damaged hair
              </h2>
              <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
                Treatments smooth. Botox fills. Collagen coats. Molecular 360 works at the molecular 
                level where strength, elasticity, repair, and longevity actually begin.
              </p>
              <Link to="/shop/treatment" className="btn-primary inline-block">
                Explore Treatment Range
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
