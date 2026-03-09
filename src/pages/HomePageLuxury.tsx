/**
 * SERWA Professional - PREMIUM LUXURY Scroll Hero Animation
 * 
 * Features:
 * - Model image as hero background
 * - Bottle PNG overlay perfectly aligned with model's hand
 * - Scroll-driven detach + curved motion path animation
 * - Liquid particle trail with canvas rendering
 * - Text reveals within the trail
 * - Micro-animations (rotation, shadow, floating)
 * - Position locking during text reading
 * - Smooth carousel transition
 * 
 * Tech: GSAP + ScrollTrigger + MotionPathPlugin + Canvas Particles
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { products } from '../data/products'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const BOTTLE_TRANSPARENT = '/bottle-transparent.png'
const MODEL_IMAGE = '/model-holding-bottle.png'

// Particle class for liquid trail
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  life: number
  maxLife: number
  opacity: number
  color: string

  constructor(x: number, y: number) {
    this.x = x + (Math.random() - 0.5) * 40
    this.y = y + (Math.random() - 0.5) * 40
    this.size = Math.random() * 8 + 4
    this.speedX = (Math.random() - 0.5) * 2
    this.speedY = Math.random() * 2 + 1
    this.life = 0
    this.maxLife = Math.random() * 60 + 60
    this.opacity = 0
    // Gold/champagne tones
    const colors = [
      'rgba(250, 220, 140, ',
      'rgba(255, 235, 180, ',
      'rgba(249, 220, 92, ',
      'rgba(255, 245, 200, ',
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.life++
    
    // Fade in quickly, fade out slowly
    if (this.life < this.maxLife * 0.2) {
      this.opacity = this.life / (this.maxLife * 0.2)
    } else {
      this.opacity = 1 - ((this.life - this.maxLife * 0.2) / (this.maxLife * 0.8))
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.opacity * 0.6
    ctx.fillStyle = this.color + this.opacity + ')'
    ctx.shadowBlur = 15
    ctx.shadowColor = this.color + '0.8)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  isDead() {
    return this.life >= this.maxLife
  }
}

export default function HomePageLuxury() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLElement>(null)
  
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  // Initialize particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.update()
        p.draw(ctx)
        return !p.isDead()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Main GSAP animation
  useEffect(() => {
    if (!bottleRef.current || !heroRef.current) return

    const bottle = bottleRef.current
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      gsap.set(bottle, { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      // Initial positioning - bottle overlays model's hand
      // Adjust these values based on where the bottle is in your model image
      gsap.set(bottle, {
        position: 'fixed',
        right: '28%', // Adjust based on model image
        top: '35%',   // Adjust based on model image
        width: '200px',
        zIndex: 50,
        rotation: -8,
        transformOrigin: 'center center',
      })

      // Idle floating animation
      gsap.to(bottle, {
        y: '+=15',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Main scroll animation
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3500',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          // markers: true,
          onUpdate: (self) => {
            // Generate particles during movement
            if (self.progress > 0.1 && self.progress < 0.9) {
              const rect = bottle.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2
              
              // Add particles at bottle position
              if (Math.random() > 0.7) {
                const newParticle = new Particle(centerX, centerY)
                particlesRef.current.push(newParticle)
              }
            }
          },
        },
      })

      // Phase 1: Detach + scale + glow (0-20%)
      mainTimeline.to(bottle, {
        scale: 1.15,
        rotation: 0,
        filter: 'drop-shadow(0 0 30px rgba(250, 220, 140, 0.6))',
        duration: 0.3,
        ease: 'power2.out',
      })

      // Phase 2: Move along curved path to LEFT side (20-40%)
      mainTimeline.to(bottle, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: -window.innerWidth * 0.3, y: 50 },
            { x: -window.innerWidth * 0.45, y: 20 },
          ],
          curviness: 1.5,
        },
        rotation: '+=5',
        duration: 0.4,
        ease: 'power1.inOut',
      })

      // Phase 3: Lock position LEFT - text reveals (40-50%)
      mainTimeline.to(bottle, {
        scale: 1.1,
        rotation: '-=3',
        duration: 0.2,
      })

      // Phase 4: Move to RIGHT side (50-70%)
      mainTimeline.to(bottle, {
        motionPath: {
          path: [
            { x: -window.innerWidth * 0.45, y: 20 },
            { x: 0, y: 80 },
            { x: window.innerWidth * 0.35, y: 40 },
          ],
          curviness: 1.5,
        },
        rotation: '-=8',
        duration: 0.4,
        ease: 'power1.inOut',
      })

      // Phase 5: Lock position RIGHT - text reveals (70-80%)
      mainTimeline.to(bottle, {
        scale: 1.05,
        rotation: '+=2',
        duration: 0.2,
      })

      // Phase 6: Scale down + move to carousel (80-100%)
      mainTimeline.to(bottle, {
        scale: 0.7,
        y: '+=200',
        rotation: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative bg-serwa-primary">
      {/* Canvas for particle trail */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* HERO SECTION - Pinned with model background */}
      <div
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Model background image - STATIC */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={MODEL_IMAGE}
            alt="SERWA Professional Model"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        </div>

        {/* Animated transparent bottle */}
        <div
          ref={bottleRef}
          className="hidden md:block"
        >
          <img
            src={BOTTLE_TRANSPARENT}
            alt="SERWA Bottle"
            className="w-full h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.2))',
            }}
          />
        </div>

        {/* Hero text content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            >
              SERWA Professional
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg italic"
            >
              Scroll to experience luxury
            </motion.p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Content RIGHT side (Bottle on LEFT) */}
      <section
        ref={section1Ref}
        className="relative min-h-screen flex items-center bg-gradient-to-b from-serwa-primary to-white py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Empty space LEFT for floating bottle */}
            <div className="flex-shrink-0 w-full md:w-1/2" />

            {/* Content RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6">
                Beauty begins at the molecule
              </h2>
              <p className="text-serwa-secondary/80 text-lg leading-relaxed mb-6">
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

      {/* SECTION 2: Content LEFT side (Bottle on RIGHT) */}
      <section
        ref={section2Ref}
        className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-serwa-primary py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            {/* Empty space RIGHT for floating bottle */}
            <div className="flex-shrink-0 w-full md:w-1/2" />

            {/* Content LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4">
                Professional Shampoo
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6">
                Clean. Nourish. Protect.
              </h2>
              <p className="text-serwa-secondary/80 text-lg leading-relaxed mb-6">
                No rinse required. All nutrients stay locked inside your hair for deeper repair, 
                enhanced smoothness, and extended shine. Formaldehyde-free, designed for 
                professional salon use.
              </p>
              <Link to="/shop/shampoo" className="btn-primary inline-block">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section
        ref={carouselRef}
        className="relative py-20 md:py-32 bg-serwa-primary"
      >
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
              className="flex-shrink-0 w-[300px] snap-center"
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

      {/* Additional sections can go here */}
    </div>
  )
}
