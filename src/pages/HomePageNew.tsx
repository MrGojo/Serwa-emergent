/**
 * SERWA Professional - Enhanced Home Page with Flowing Bottle Animation
 * 
 * Features:
 * - Smooth GSAP ScrollTrigger bottle animation (Instagram reel-inspired)
 * - Section 1: Bottle flows on left, company content on right
 * - Section 2: Bottle transitions left → right, product content on left
 * - Section 3: Bottle enters product carousel
 * - Luxurious aesthetic (Kerastase + Simply Organic Beauty inspired)
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const SHAMPOO_BOTTLE_IMG = '/shampoo-bottle.jpg'

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export default function HomePageNew() {
  const bottleRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const carouselBottleRef = useRef<HTMLDivElement>(null)

  const bestsellers = products.slice(0, 4)

  useEffect(() => {
    if (!bottleRef.current || !section1Ref.current || !section2Ref.current || !section3Ref.current) return

    const bottle = bottleRef.current
    
    // Only run animations on desktop/tablet (not on mobile)
    const isMobile = window.innerWidth < 768
    
    if (isMobile) {
      // On mobile, hide the floating bottle completely
      gsap.set(bottle, { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      // Initial state: bottle starts at model's hand position (right side, near top)
      // This creates the "popping out" effect from the hero image
      gsap.set(bottle, {
        position: 'fixed',
        right: '15%', // Positioned where model's hand would be
        top: '40%',
        width: 'clamp(200px, 22vw, 320px)',
        zIndex: 50,
        opacity: 0,
        scale: 0.8,
      })

      // Phase 1: Bottle "pops out" from model's hand and starts flowing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: 'top bottom', // Start as soon as user scrolls
          end: 'center center',
          scrub: 1.5,
          // markers: true, // Uncomment for debugging
        },
      })

      // Pop out from hand and scale up
      tl.to(bottle, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })

      // Move to left side while flowing down
      tl.to(bottle, {
        right: 'auto',
        left: '8%',
        top: '50%',
        y: '-50%',
        duration: 1,
        ease: 'power2.inOut',
      })

      // Phase 2: Bottle stays on left during section 1
      tl.to(bottle, {
        left: '8%',
        top: '50%',
        y: '-50%',
        duration: 0.5,
      })

      // Phase 3: Bottle transitions LEFT → RIGHT (section 2)
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top center',
          end: 'center center',
          scrub: 1.8,
          // markers: true,
        },
      })

      tl2.to(bottle, {
        left: 'auto',
        right: '8%',
        top: '50%',
        y: '-50%',
        duration: 1,
        ease: 'power2.inOut',
      })

      // Phase 4: Bottle moves into carousel (section 3)
      gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top center',
          end: 'top top',
          scrub: 1,
          onEnter: () => {
            // Hide floating bottle, show carousel bottle
            gsap.to(bottle, { opacity: 0, duration: 0.3 })
            if (carouselBottleRef.current) {
              gsap.fromTo(
                carouselBottleRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
              )
            }
          },
          onLeaveBack: () => {
            // Show floating bottle again
            gsap.to(bottle, { opacity: 1, duration: 0.3 })
            if (carouselBottleRef.current) {
              gsap.to(carouselBottleRef.current, { opacity: 0, duration: 0.3 })
            }
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative">
      {/* ========== FLOATING BOTTLE (GSAP Controlled) ========== */}
      <div
        ref={bottleRef}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          willChange: 'transform',
        }}
      >
        <img
          src={SHAMPOO_BOTTLE_IMG}
          alt="SERWA Professional Shampoo"
          className="w-full h-auto object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.svg'
          }}
        />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-serwa-primary via-serwa-primary to-[#f0e8dc]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-serwa-secondary/80 uppercase tracking-[0.3em] text-sm mb-4"
            >
              SERWA Professional
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-serwa-secondary mb-6 leading-tight"
            >
              This is not a game changer.{' '}
              <span className="block text-serwa-accent">The game is changed.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-serwa-secondary/90 max-w-2xl mx-auto md:mx-0 mb-4"
            >
              The future of hair care is integrated, intelligent, and intentional.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-serwa-secondary/70 max-w-2xl mx-auto md:mx-0 italic mb-8"
            >
              One brand. One belief. One complete solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <Link to="/shop" className="btn-primary inline-block">
                Shop Now
              </Link>
              <Link to="/our-story" className="btn-outline inline-block">
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Hero image - Model with bottle */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              {/* Try to load model image first, fallback to bottle image */}
              <img
                src="/model-with-bottle.jpg"
                alt="SERWA Professional Model"
                className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
                onError={(e) => {
                  // Fallback: Show bottle with gradient background if model image not found
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const fallback = document.createElement('div')
                    fallback.className = 'absolute inset-0 bg-gradient-to-br from-serwa-accent/20 to-serwa-gold/20 rounded-2xl flex items-center justify-center'
                    const bottle = document.createElement('img')
                    bottle.src = SHAMPOO_BOTTLE_IMG
                    bottle.alt = 'SERWA Bottle'
                    bottle.className = 'w-2/3 h-auto object-contain drop-shadow-2xl'
                    bottle.onerror = () => {
                      bottle.style.display = 'none'
                    }
                    fallback.appendChild(bottle)
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 1: Bottle on LEFT, Company content on RIGHT ========== */}
      <section
        ref={section1Ref}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-serwa-primary py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-[80vh]">
            {/* Empty space on left - bottle flows here (Desktop only) */}
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-start">
              {/* Mobile: Show static bottle */}
              <div className="block md:hidden relative w-48 aspect-[3/5]">
                <img
                  src={SHAMPOO_BOTTLE_IMG}
                  alt="SERWA Professional Shampoo"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.svg'
                  }}
                />
              </div>
              {/* Desktop: Empty space for floating bottle */}
              <div className="hidden md:block relative w-64 aspect-[3/5] opacity-0 pointer-events-none" />
            </div>

            {/* Company content - right side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center md:text-left z-10"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                SERWA Professional
              </h2>
              <p className="text-serwa-secondary/80 text-lg max-w-xl mb-4 leading-relaxed">
                Serwa Professional began with a question: why does beauty ask us to choose between 
                science and soul? We refused that choice.
              </p>
              <p className="text-serwa-secondary/70 text-base max-w-xl mb-8 leading-relaxed">
                Built in the space between formulation and feeling — where precision meets intuition. 
                Every product is crafted with molecular intelligence and sensorial artistry.
              </p>
              <Link to="/our-story" className="btn-outline inline-block">
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: Bottle transitions LEFT → RIGHT, Product content on LEFT ========== */}
      <section
        ref={section2Ref}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-serwa-primary to-[#faf7f3] py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16 min-h-[80vh]">
            {/* Empty space on right - bottle moves here (Desktop only) */}
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-end">
              {/* Mobile: Show static bottle */}
              <div className="block md:hidden relative w-48 aspect-[3/5]">
                <img
                  src={SHAMPOO_BOTTLE_IMG}
                  alt="SERWA Professional Shampoo"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.svg'
                  }}
                />
              </div>
              {/* Desktop: Empty space for floating bottle */}
              <div className="hidden md:block relative w-64 aspect-[3/5] opacity-0 pointer-events-none" />
            </div>

            {/* Product content - left side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 max-w-xl text-center md:text-left z-10"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Professional Shampoo
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Clean. Nourish. Protect.
              </h2>
              <p className="text-serwa-secondary/80 text-lg mb-4 leading-relaxed">
                No rinse required. All nutrients stay locked inside your hair for deeper repair, 
                enhanced smoothness, and extended shine.
              </p>
              <p className="text-serwa-secondary/70 text-base mb-8 leading-relaxed">
                Formaldehyde-free, designed for professional salon use. Experience molecular-level 
                transformation with every wash.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link to="/shop/shampoo" className="btn-primary inline-block">
                  Shop Shampoo
                </Link>
                <Link to="/education" className="btn-outline inline-block">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: Bottle enters CAROUSEL ========== */}
      <section
        ref={section3Ref}
        className="relative py-20 md:py-32 bg-gradient-to-b from-[#faf7f3] to-serwa-primary overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 px-4"
        >
          <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-3">
            Complete Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-4">
            Explore the Professional Range
          </h2>
          <p className="text-serwa-secondary/70 max-w-xl mx-auto text-lg">
            Discover our complete lineup of molecular-intelligent haircare solutions.
          </p>
        </motion.div>

        {/* Carousel: bottle as first item */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative px-4 md:px-8 lg:px-16"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-serwa-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-serwa-primary to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollPaddingLeft: '1rem',
              scrollPaddingRight: '1rem',
            }}
          >
            {/* First card: shampoo bottle (animated in) */}
            <div
              ref={carouselBottleRef}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-center opacity-0"
            >
              <Link
                to="/shop/shampoo"
                className="block bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-2 border-serwa-accent/20 hover:shadow-2xl hover:border-serwa-accent/40 transition-all duration-300 group"
              >
                <div className="aspect-[3/4] flex items-center justify-center p-8 bg-gradient-to-br from-serwa-primary/50 to-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-serwa-accent/5 to-serwa-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={SHAMPOO_BOTTLE_IMG}
                    alt="SERWA Professional Shampoo"
                    className="max-h-full w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300 relative z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.svg'
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-semibold text-serwa-secondary mb-1">
                    Professional Shampoo
                  </h3>
                  <p className="text-serwa-secondary/70 text-sm mb-3">350ml & 1000ml</p>
                  <span className="inline-block text-serwa-accent font-medium text-sm group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            </div>

            {/* Rest: other products */}
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-center"
              >
                <Link
                  to={`/product/${product.handle}`}
                  className="block bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-serwa-secondary/10 hover:shadow-2xl hover:border-serwa-accent/30 transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] flex items-center justify-center p-6 bg-gradient-to-br from-serwa-primary/30 to-white">
                    <img
                      src={product.images[0] || '/placeholder-product.svg'}
                      alt={product.title}
                      className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-serwa-secondary mb-1">
                      {product.title}
                    </h3>
                    <p className="text-serwa-secondary/70 text-sm mb-3">
                      {product.variants[0]?.option || 'Professional'}
                    </p>
                    <span className="inline-block text-serwa-accent font-medium text-sm group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop" className="btn-primary inline-block">
            View All Products
          </Link>
        </motion.div>
      </section>

      {/* ========== BANNER - Split layout ========== */}
      <section className="py-16 md:py-24 bg-serwa-primary">
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

      {/* ========== BESTSELLERS ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-serwa-primary to-[#f0e8dc] border-t border-serwa-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary text-center mb-12"
          >
            Bestsellers
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {bestsellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} layout="grid" />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/shop" className="btn-outline inline-block">
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
