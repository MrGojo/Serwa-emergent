/**
 * SERWA Professional - Product Data
 * 
 * PLACEHOLDER DATA: Replace with Shopify collections when integrated.
 * Structure based on client product list:
 * 
 * 1. TREATMENT - reconstruction cream 1000ml
 * 2. MASK - one mask, 2 quantities
 * 3. SERUM - one serum 250ml
 * 4. SHAMPOO - 350ml, 1000ml
 * 5. SHOTS - 3 different shots
 * 6. CONDITIONER - 350ml, 1000ml
 */

export type ProductCategory = 
  | 'treatment' 
  | 'mask' 
  | 'serum' 
  | 'shampoo' 
  | 'shots' 
  | 'conditioner'

export interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  option?: string // e.g. "350ml", "1000ml"
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  category: ProductCategory
  variants: ProductVariant[]
  images: string[]
  featured?: boolean
}

// =============================================================================
// Placeholder products - structure ready for content push
// =============================================================================

export const products: Product[] = [
  {
    id: '1',
    handle: 'reconstruction-cream-1000ml',
    title: 'Reconstruction Cream',
    description: 'Professional reconstruction treatment cream. Content placeholder - add product description from client.',
    category: 'treatment',
    variants: [
      { id: 'v1', title: '1000ml', price: '0', compareAtPrice: undefined, available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '2',
    handle: 'hair-mask',
    title: 'Hair Mask',
    description: 'Nourishing hair mask. Content placeholder - add product description.',
    category: 'mask',
    variants: [
      { id: 'v2a', title: 'Size 1', price: '0', available: true, option: '250ml' },
      { id: 'v2b', title: 'Size 2', price: '0', available: true, option: '500ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '3',
    handle: 'hair-serum-250ml',
    title: 'Hair Serum',
    description: 'Professional hair serum 250ml. Content placeholder.',
    category: 'serum',
    variants: [
      { id: 'v3', title: '250ml', price: '0', available: true, option: '250ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '4',
    handle: 'shampoo-350ml',
    title: 'Professional Shampoo',
    description: 'Shampoo 350ml. Content placeholder.',
    category: 'shampoo',
    variants: [
      { id: 'v4', title: '350ml', price: '0', available: true, option: '350ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '5',
    handle: 'shampoo-1000ml',
    title: 'Professional Shampoo',
    description: 'Shampoo 1000ml. Content placeholder.',
    category: 'shampoo',
    variants: [
      { id: 'v5', title: '1000ml', price: '0', available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '6',
    handle: 'shot-1',
    title: 'Hair Shot 1',
    description: 'Professional hair shot. Content placeholder.',
    category: 'shots',
    variants: [
      { id: 'v6', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '7',
    handle: 'shot-2',
    title: 'Hair Shot 2',
    description: 'Professional hair shot. Content placeholder.',
    category: 'shots',
    variants: [
      { id: 'v7', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '8',
    handle: 'shot-3',
    title: 'Hair Shot 3',
    description: 'Professional hair shot. Content placeholder.',
    category: 'shots',
    variants: [
      { id: 'v8', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '9',
    handle: 'conditioner-350ml',
    title: 'Professional Conditioner',
    description: 'Conditioner 350ml. Content placeholder.',
    category: 'conditioner',
    variants: [
      { id: 'v9', title: '350ml', price: '0', available: true, option: '350ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '10',
    handle: 'conditioner-1000ml',
    title: 'Professional Conditioner',
    description: 'Conditioner 1000ml. Content placeholder.',
    category: 'conditioner',
    variants: [
      { id: 'v10', title: '1000ml', price: '0', available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
]

// Helper to get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category)
}

// Helper to get product by handle
export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle)
}

// Category display names for UI
export const categoryLabels: Record<ProductCategory, string> = {
  treatment: 'Treatment',
  mask: 'Mask',
  serum: 'Serum',
  shampoo: 'Shampoo',
  shots: 'Shots',
  conditioner: 'Conditioner',
}
