/**
 * SERWA Professional - Product Detail Page
 * 
 * Single product view with variant selector, add to cart.
 * Ready for Shopify product data integration.
 */

import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getProductByHandle } from '../data/products'
import { useShopify } from '../lib/shopify'
import type { ProductVariant } from '../data/products'

export default function ProductPage() {
  const { productHandle } = useParams<{ productHandle: string }>()
  const product = productHandle ? getProductByHandle(productHandle) : undefined
  const { addToCart } = useShopify()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-serwa-secondary mb-4">Product not found</h1>
        <Link to="/shop" className="text-serwa-accent hover:underline">Back to shop</Link>
      </div>
    )
  }

  const variant = selectedVariant || product.variants[0]
  const image = product.images[0] || '/placeholder-product.svg'

  const handleAddToCart = () => {
    addToCart({
      variantId: variant.id,
      title: `${product.title}${variant.option ? ` - ${variant.option}` : ''}`,
      quantity,
      price: variant.price,
      image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Product images */}
        <div className="aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-serwa-primary">
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product info */}
        <div>
          <Link to="/shop" className="text-serwa-secondary/70 hover:text-serwa-accent text-sm mb-4 inline-block">
            ← Back to shop
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-2">
            {product.title}
          </h1>
          <p className="text-serwa-secondary/80 mb-6">
            {product.description}
          </p>

          {/* Variant selector */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <label className="block font-medium text-serwa-secondary mb-2">Select option</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded border transition-colors ${
                      selectedVariant?.id === v.id || (!selectedVariant && v.id === variant.id)
                        ? 'border-serwa-accent bg-serwa-accent/10 text-serwa-accent'
                        : 'border-serwa-secondary/30 hover:border-serwa-secondary/50'
                    }`}
                  >
                    {v.option || v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <p className="text-xl font-semibold text-serwa-secondary mb-6">
            {variant.price === '0' ? 'Price on request' : `₹${variant.price}`}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium text-serwa-secondary">Quantity</label>
            <select
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="px-3 py-2 border border-serwa-secondary/20 rounded"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!variant.available}
            className={`w-full md:w-auto px-8 py-4 font-medium rounded transition-all ${
              added
                ? 'bg-green-600 text-white'
                : variant.available
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {added ? 'Added to cart!' : variant.available ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
