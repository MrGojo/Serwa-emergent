/**
 * SERWA Professional - Shop / Collection Page
 * 
 * Original & Mineral inspired:
 * - Collection header with product count and tagline
 * - Sidebar filters (Product type, Sort)
 * - Product grid with Quick shop / Add to cart
 * - Grid/List view toggle (optional)
 */

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, categoryLabels, type ProductCategory } from '../data/products'
import ProductCard from '../components/ProductCard'

type SortOption = 'featured' | 'az' | 'za' | 'price-low' | 'price-high'

export default function ShopPage() {
  const { collectionHandle } = useParams<{ collectionHandle?: string }>()
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    (collectionHandle as ProductCategory) || 'all'
  )
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  // Sync filter when URL changes (e.g. /shop/conditioner)
  useEffect(() => {
    if (collectionHandle && Object.keys(categoryLabels).includes(collectionHandle)) {
      setSelectedCategory(collectionHandle as ProductCategory)
    } else if (!collectionHandle) {
      setSelectedCategory('all')
    }
  }, [collectionHandle])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'all' 
      ? [...products] 
      : products.filter(p => p.category === selectedCategory)
    
    switch (sortBy) {
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'price-low':
        result.sort((a, b) => Number(a.variants[0].price) - Number(b.variants[0].price))
        break
      case 'price-high':
        result.sort((a, b) => Number(b.variants[0].price) - Number(a.variants[0].price))
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [selectedCategory, sortBy])

  const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Products' },
    ...Object.entries(categoryLabels).map(([value, label]) => ({ value: value as ProductCategory, label })),
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* ========== Collection Header - Original & Mineral style ========== */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12"
      >
        <p className="text-serwa-secondary/70 text-sm mb-2">{filteredProducts.length} products</p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-4">
          {selectedCategory === 'all' ? 'Shop All' : categoryLabels[selectedCategory]}
        </h1>
        <p className="text-serwa-secondary/80 max-w-2xl">
          Healthy hair begins when it&apos;s free from stress. Reduce the chemical overload.
          Content placeholder - add collection description from client.
        </p>
      </motion.header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ========== Sidebar Filters - Original & Mineral style ========== */}
        <aside className="lg:w-64 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Product type filter */}
            <div>
              <h3 className="font-semibold text-serwa-secondary mb-3">Product type</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.value}>
                    <button
                      onClick={() => setSelectedCategory(cat.value as ProductCategory | 'all')}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-serwa-secondary text-serwa-primary'
                          : 'text-serwa-secondary/80 hover:bg-serwa-secondary/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-serwa-secondary mb-3">Sort</h3>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-serwa-secondary/20 rounded bg-serwa-primary text-serwa-secondary focus:outline-none focus:ring-2 focus:ring-serwa-accent"
              >
                <option value="featured">Featured</option>
                <option value="az">Alphabetically, A-Z</option>
                <option value="za">Alphabetically, Z-A</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
              </select>
            </div>
          </motion.div>
        </aside>

        {/* ========== Product Grid ========== */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} layout="grid" />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-serwa-secondary/70 py-12">
              No products found in this collection.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
