/**
 * SERWA Professional - Shopify Integration
 * 
 * Uses @shopify/hydrogen-react for Storefront API integration.
 * 
 * SETUP REQUIRED: Create a .env file with:
 * VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 * VITE_SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_api_token
 * 
 * Get tokens from: Shopify Admin > Settings > Apps and sales channels > 
 * Develop apps > Create app > Configure Storefront API scopes
 * 
 * Or use the Headless sales channel: https://apps.shopify.com/headless
 */

import { createContext, useContext, useCallback, useState, ReactNode } from 'react'
import { createStorefrontClient } from '@shopify/hydrogen-react'

// =============================================================================
// Shopify Client Configuration
// =============================================================================

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || ''
const publicToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || ''

// Create the Storefront API client (works with or without credentials - uses mock data when not configured)
export const storefrontClient = storeDomain && publicToken 
  ? createStorefrontClient({
      storeDomain: `https://${storeDomain}`,
      storefrontApiVersion: '2024-10',
      publicStorefrontToken: publicToken,
    })
  : null

// Check if Shopify is properly configured
export const isShopifyConfigured = !!storefrontClient

// =============================================================================
// Cart State (for when Shopify cart is used - cart ID persists in localStorage)
// =============================================================================

export interface CartItem {
  id: string
  title: string
  variantId: string
  quantity: number
  price: string
  image?: string
}

interface ShopifyContextType {
  // Cart
  cartItems: CartItem[]
  cartCount: number
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>
  removeFromCart: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  
  // Shopify status
  isConfigured: boolean
  isLoading: boolean
}

const ShopifyContext = createContext<ShopifyContextType | null>(null)

// =============================================================================
// Mock Cart (when Shopify not configured - for development/structure phase)
// =============================================================================

const CART_STORAGE_KEY = 'serwa-cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load cart from storage:', e)
  }
  return []
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('Failed to save cart to storage:', e)
  }
}

// =============================================================================
// Shopify Provider Component
// =============================================================================

export function ShopifyProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage)
  const [isLoading, setIsLoading] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = useCallback(async (item: Omit<CartItem, 'id'>) => {
    setIsLoading(true)
    try {
      if (storefrontClient) {
        // TODO: Use Storefront API cartCreate/cartLinesAdd mutation
        // For now, use local cart when Shopify mutations are implemented
        const newItem: CartItem = {
          ...item,
          id: `mock-${Date.now()}-${item.variantId}`,
        }
        setCartItems(prev => {
          const existing = prev.find(i => i.variantId === item.variantId)
          const next = existing
            ? prev.map(i => i.variantId === item.variantId 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i)
            : [...prev, newItem]
          saveCartToStorage(next)
          return next
        })
      } else {
        // Mock cart for development
        const newItem: CartItem = {
          ...item,
          id: `mock-${Date.now()}-${item.variantId}`,
        }
        setCartItems(prev => {
          const existing = prev.find(i => i.variantId === item.variantId)
          const next = existing
            ? prev.map(i => i.variantId === item.variantId 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i)
            : [...prev, newItem]
          saveCartToStorage(next)
          return next
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeFromCart = useCallback((variantId: string) => {
    setCartItems(prev => {
      const next = prev.filter(i => i.variantId !== variantId)
      saveCartToStorage(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId)
      return
    }
    setCartItems(prev => {
      const next = prev.map(i => 
        i.variantId === variantId ? { ...i, quantity } : i
      )
      saveCartToStorage(next)
      return next
    })
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
    saveCartToStorage([])
  }, [])

  const value: ShopifyContextType = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isConfigured: isShopifyConfigured,
    isLoading,
  }

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  )
}

export function useShopify() {
  const ctx = useContext(ShopifyContext)
  if (!ctx) {
    throw new Error('useShopify must be used within ShopifyProvider')
  }
  return ctx
}
