/**
 * SERWA Professional - Header / Navigation
 * 
 * Mega-menu dropdown for Shop (and other nav items with subparts).
 * Smooth, seamless Framer Motion animations.
 * Optional top promo bar.
 */

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShopify } from '../lib/shopify'
import { categoryLabels, getProductsByCategory, type ProductCategory } from '../data/products'

// =============================================================================
// Nav structure - add subItems for items that need dropdowns
// =============================================================================

interface NavLink {
  to: string
  label: string
  hasDropdown?: boolean
}

const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop', hasDropdown: true },
  { to: '/our-story', label: 'Our Story' },
  { to: '/education', label: 'Education' },
  { to: '/blog', label: 'Blog' },
]

// SERWA product categories - only categories that have products
const shopCategories = Object.entries(categoryLabels).map(([handle, label]) => ({
  handle: handle as ProductCategory,
  label,
  to: `/shop/${handle}`,
}))

// =============================================================================
// Mega-menu dropdown animation variants
// =============================================================================

const mainDropdownVariants = {
  closed: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeOut' } },
  open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [shopLinkCenterX, setShopLinkCenterX] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(80)
  const headerRef = useRef<HTMLElement>(null)
  const shopLinkRef = useRef<HTMLAnchorElement>(null)
  const portalDropdownRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { cartCount } = useShopify()

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => setShopDropdownOpen(false), 180)
  }

  // Update positions when dropdown is open (resize/scroll)
  useEffect(() => {
    function updatePositions() {
      if (shopLinkRef.current && headerRef.current) {
        const rect = shopLinkRef.current.getBoundingClientRect()
        setShopLinkCenterX(rect.left + rect.width / 2)
        setHeaderHeight(headerRef.current.getBoundingClientRect().height)
      }
    }
    if (shopDropdownOpen) {
      updatePositions()
      window.addEventListener('resize', updatePositions)
      window.addEventListener('scroll', updatePositions)
      return () => {
        window.removeEventListener('resize', updatePositions)
        window.removeEventListener('scroll', updatePositions)
      }
    }
  }, [shopDropdownOpen])

  const openShopDropdown = () => {
    if (shopLinkRef.current && headerRef.current) {
      const rect = shopLinkRef.current.getBoundingClientRect()
      setShopLinkCenterX(rect.left + rect.width / 2)
      setHeaderHeight(headerRef.current.getBoundingClientRect().height)
    }
    setShopDropdownOpen(true)
  }

  // Close dropdown when clicking outside (header nav area and dropdown)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const inHeader = headerRef.current?.contains(target)
      const inDropdown = portalDropdownRef.current?.contains(target)
      if (!inHeader && !inDropdown) {
        clearCloseTimeout()
        setShopDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      clearCloseTimeout()
    }
  }, [])

  // Close shop dropdown when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      clearCloseTimeout()
      setShopDropdownOpen(false)
    }
  }, [mobileMenuOpen])

  // Clear timeout on unmount
  useEffect(() => () => clearCloseTimeout(), [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-serwa-primary/95 backdrop-blur-sm border-b border-serwa-secondary/10">
      {/* Optional top promo bar - toggle visibility or edit as needed */}
      <div className="bg-serwa-secondary text-serwa-primary text-center py-2 px-4 text-sm">
        FLAT 10% Off On First Purchase. Code: <span className="font-semibold text-serwa-gold">FIRST10</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-serwa-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary tracking-tight">
              SERWA
            </span>
            <span className="block text-xs text-serwa-secondary/70 -mt-0.5">Professional</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              link.hasDropdown ? (
                /* Shop - with mega-menu dropdown */
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimeout()
                    openShopDropdown()
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    ref={shopLinkRef}
                    to={link.to}
                    className={`inline-flex items-center px-4 py-2 font-medium transition-all duration-200 ${
                      shopDropdownOpen
                        ? 'text-serwa-accent'
                        : 'text-serwa-secondary hover:text-serwa-accent'
                    }`}
                  >
                    {link.label}
                  </Link>

                  {/* Mega-menu dropdown - portal with STATIC wrapper so Framer doesn't override transform */}
                  {shopDropdownOpen && createPortal(
                    <div
                      ref={portalDropdownRef}
                      className="fixed z-50 left-0 right-0"
                      style={{
                        left: 0,
                        right: 0,
                        top: `${headerHeight}px`,
                        marginTop: '8px',
                        width: '100vw',
                      }}
                      onMouseEnter={clearCloseTimeout}
                      onMouseLeave={scheduleClose}
                    >
                      <AnimatePresence>
                        <motion.div
                          key="shop-dropdown"
                          variants={mainDropdownVariants}
                          initial="closed"
                          animate="open"
                          exit="exit"
                          className="relative w-full"
                        >
                          {/* Arrow - positioned under Shop link */}
                          <div className="absolute -top-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-serwa-secondary drop-shadow-lg" style={{ left: `${shopLinkCenterX}px`, transform: 'translateX(-50%)' }} aria-hidden />
                        <div className="relative bg-serwa-secondary rounded-b-2xl shadow-2xl overflow-hidden border-x-0 border-b border-t border-serwa-primary/10 backdrop-blur-sm w-full">
                          <div className="py-8 px-8 md:px-12 flex flex-wrap">
                            <div className="flex-1 min-w-0 flex-grow-[2]">
                            <h4 className="font-serif font-semibold text-serwa-primary text-sm uppercase tracking-wider mb-6">
                              SERWA Products
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-6">
                              {shopCategories.map(item => {
                                const categoryProducts = getProductsByCategory(item.handle)
                                return (
                                  <div key={item.label} className="min-w-0">
                                    <Link to={item.to} onClick={() => setShopDropdownOpen(false)} className="block mb-3">
                                      <h5 className="font-semibold text-serwa-primary text-sm uppercase tracking-wide mb-3 hover:text-serwa-accent transition-colors">
                                        {item.label}
                                      </h5>
                                    </Link>
                                    <ul className="space-y-1">
                                      {categoryProducts.length > 0 ? (
                                        categoryProducts.map(product => (
                                          <li key={product.id}>
                                            <Link
                                              to={`/product/${product.handle}`}
                                              onClick={() => setShopDropdownOpen(false)}
                                              className="block text-sm py-1.5 text-serwa-primary/80 hover:text-serwa-gold transition-colors"
                                            >
                                              {product.title}
                                              {product.variants.length === 1 && product.variants[0].option && (
                                                <span className="text-serwa-primary/60 ml-1">— {product.variants[0].option}</span>
                                              )}
                                            </Link>
                                          </li>
                                        ))
                                      ) : (
                                        <li>
                                          <Link
                                            to={item.to}
                                            onClick={() => setShopDropdownOpen(false)}
                                            className="block text-sm py-1.5 text-serwa-primary/60 hover:text-serwa-gold transition-colors"
                                          >
                                            View {item.label}
                                          </Link>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="mt-6 pt-5 border-t border-serwa-primary/10 text-center">
                              <Link
                                to="/shop"
                                onClick={() => setShopDropdownOpen(false)}
                                className="inline-flex items-center text-sm font-semibold text-serwa-accent hover:text-serwa-gold transition-colors"
                              >
                                Shop All
                                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                            </div>
                            {/* Image placeholder - right side, ready for product/hero image */}
                            <div className="hidden lg:flex flex-shrink-0 w-72 xl:w-80 aspect-[4/5] items-center justify-center rounded-lg bg-serwa-primary/10 border border-serwa-primary/20 overflow-hidden">
                              <span className="text-serwa-primary/40 text-xs font-medium">Image</span>
                            </div>
                          </div>
                        </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>,
                    document.body
                  )}
                </div>
              ) : (
                /* Regular nav link */
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-serwa-secondary hover:text-serwa-accent transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right side: Search, Account, Cart */}
          <div className="flex items-center gap-2">
            {/* Search - placeholder icon */}
            <button
              className="p-2 text-serwa-secondary hover:text-serwa-accent transition-colors hidden sm:block"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Account - Profile */}
            <Link
              to="/profile"
              className="p-2 text-serwa-secondary hover:text-serwa-accent transition-colors hidden sm:block"
              aria-label="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-serwa-secondary hover:text-serwa-accent transition-colors"
              aria-label={`Cart with ${cartCount} items`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-serwa-gold text-serwa-secondary text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu - with Shop submenu expand */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-serwa-secondary/10 bg-serwa-primary"
          >
            <nav className="py-4 px-4 flex flex-col gap-1">
              {navLinks.map(link => (
                link.hasDropdown ? (
                  <MobileShopSubmenu 
                    key={link.to} 
                    onLinkClick={() => setMobileMenuOpen(false)} 
                  />
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-serwa-secondary hover:text-serwa-accent font-medium py-3 px-2"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Mobile: Shop expandable submenu with mega-menu content
function MobileShopSubmenu({ onLinkClick }: { onLinkClick: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-serwa-secondary/10 pb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-serwa-secondary hover:text-serwa-accent font-medium py-3 px-2 text-left"
      >
        Shop
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pl-4 pt-3 space-y-4 bg-serwa-secondary/5 rounded-xl p-5 mt-3 border border-serwa-secondary/10">
              <div>
                <h4 className="font-serif font-semibold text-serwa-secondary text-sm mb-4 tracking-wide">
                  SERWA Products
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {shopCategories.map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={onLinkClick}
                      className="block text-sm py-2 px-3 rounded-lg text-serwa-secondary hover:text-serwa-primary hover:bg-serwa-primary/5 transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link 
                    to="/shop" 
                    onClick={onLinkClick} 
                    className="block text-sm py-2 px-3 rounded-lg text-serwa-accent hover:text-serwa-primary hover:bg-serwa-accent/10 transition-colors font-semibold col-span-2 text-center border-t border-serwa-secondary/10 pt-3 mt-2"
                  >
                    Shop All
                  </Link>
                </div>
              </div>
              {/* Mobile: nested product lists per category */}
              <div className="space-y-4 pt-3 border-t border-serwa-secondary/10">
                {shopCategories.map(cat => {
                  const categoryProducts = getProductsByCategory(cat.handle)
                  if (categoryProducts.length === 0) return null
                  return (
                    <div key={cat.label}>
                      <h5 className="font-serif font-semibold text-serwa-secondary text-xs mb-3 tracking-wide">{cat.label}</h5>
                      <div className="space-y-1.5">
                        {categoryProducts.map(product => (
                          <Link
                            key={product.id}
                            to={`/product/${product.handle}`}
                            onClick={onLinkClick}
                            className="block text-sm py-2 px-3 rounded-lg text-serwa-secondary/80 hover:text-serwa-primary hover:bg-serwa-primary/5 transition-colors"
                          >
                            <span className="font-medium">{product.title}</span>
                            {product.variants.length === 1 && product.variants[0].option && (
                              <span className="text-serwa-secondary/60 ml-2 text-xs">— {product.variants[0].option}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
