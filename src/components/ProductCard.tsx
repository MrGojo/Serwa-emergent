/**
 * SERWA Professional - Product Card Component
 * 
 * Used in homepage product sections and shop grid.
 * BIOTOP-style: Image, title, price, "Add to cart" or "Choose options"
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShopify } from '../lib/shopify'
import type { Product, ProductVariant } from '../data/products'

interface ProductCardProps {
  product: Product
  variant?: ProductVariant
  /** Show "Choose options" when product has multiple variants */
  index?: number
  /** Layout: 'grid' for shop, 'carousel' for homepage */
  layout?: 'grid' | 'carousel'
}

export default function ProductCard({ product, variant, index = 0, layout = 'grid' }: ProductCardProps) {
  const { addToCart } = useShopify()
  const displayVariant = variant || product.variants[0]
  const hasMultipleVariants = product.variants.length > 1
  const image = product.images[0] || '/placeholder-product.svg'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent Link navigation when clicking Add to cart
    if (!hasMultipleVariants) {
      addToCart({
        variantId: displayVariant.id,
        title: `${product.title}${displayVariant.option ? ` - ${displayVariant.option}` : ''}`,
        quantity: 1,
        price: displayVariant.price,
        image,
      })
    }
  }

  const cardContent = (
    <>
      {/* Image container with hover effect */}
      <div className="relative aspect-[3/4] overflow-hidden bg-serwa-primary rounded-lg mb-4 group">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick add overlay - shown on hover for grid layout */}
        {layout === 'grid' && !hasMultipleVariants && (
          <div className="absolute inset-0 bg-serwa-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-serwa-accent text-white px-6 py-2 font-medium rounded hover:bg-pink-600 transition-colors"
            >
              Add to cart
            </button>
          </div>
        )}
      </div>

      {/* Product info */}
      <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-1 line-clamp-2">
        {product.title}
        {displayVariant.option && product.variants.length === 1 && (
          <span className="font-sans font-normal text-sm text-serwa-secondary/70"> - {displayVariant.option}</span>
        )}
      </h3>
      <p className="text-serwa-secondary/80 text-sm mb-2">
        {displayVariant.price === '0' ? 'Price on request' : `From ₹${displayVariant.price}`}
      </p>

      {/* CTA - Choose options for multi-variant, Add to cart for single */}
      {hasMultipleVariants ? (
        <Link
          to={`/product/${product.handle}`}
          className="inline-block text-serwa-accent font-medium text-sm hover:underline"
        >
          Choose options
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          className="text-serwa-accent font-medium text-sm hover:underline"
        >
          Add to cart
        </button>
      )}
    </>
  )

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay: index * 0.05 },
  }

  if (layout === 'carousel') {
    return (
      <motion.div {...animationProps} className="flex-shrink-0 w-64 md:w-72">
        <Link to={`/product/${product.handle}`} className="block group">
          {cardContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div {...animationProps}>
      <Link to={`/product/${product.handle}`} className="block group">
        {cardContent}
      </Link>
    </motion.div>
  )
}
