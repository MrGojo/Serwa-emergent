/**
 * SERWA Professional - Cart Page
 * 
 * Displays cart items with quantity controls.
 * Checkout redirects to Shopify checkout when configured.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShopify } from '../lib/shopify'
import { isShopifyConfigured } from '../lib/shopify'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useShopify()

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-4 py-24 text-center"
      >
        <h1 className="font-serif text-2xl font-semibold text-serwa-secondary mb-4">Your cart is empty</h1>
        <p className="text-serwa-secondary/80 mb-8">Add some products to get started.</p>
        <Link to="/shop" className="btn-primary inline-block">
          Continue shopping
        </Link>
      </motion.div>
    )
  }

  // Calculate total (placeholder - prices may be "0" during structure phase)
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0
    return sum + price * item.quantity
  }, 0)

  const handleCheckout = () => {
    if (isShopifyConfigured) {
      // TODO: Redirect to Shopify checkout URL
      // window.location.href = checkoutUrl
      alert('Shopify checkout integration: When connected, this will redirect to Shopify checkout.')
    } else {
      alert('Shopify not configured. Add your store credentials to enable checkout.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl font-semibold text-serwa-secondary mb-8"
      >
        Your Cart
      </motion.h1>

      <div className="space-y-6">
        {cartItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 p-4 bg-white rounded-lg border border-serwa-secondary/10"
          >
            <img
              src={item.image || '/placeholder-product.svg'}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-serwa-secondary">{item.title}</h3>
              <p className="text-sm text-serwa-secondary/70">₹{item.price} each</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  className="w-8 h-8 rounded border border-serwa-secondary/30 hover:bg-serwa-secondary/5"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  className="w-8 h-8 rounded border border-serwa-secondary/30 hover:bg-serwa-secondary/5"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="ml-4 text-serwa-accent hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-serwa-secondary">
                ₹{(parseFloat(item.price) || 0) * item.quantity}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <button
          onClick={clearCart}
          className="text-serwa-secondary/70 hover:text-serwa-accent text-sm"
        >
          Clear cart
        </button>
        <div className="flex items-center gap-6">
          <p className="text-lg font-semibold text-serwa-secondary">
            Subtotal: ₹{total}
          </p>
          <Link to="/shop" className="text-serwa-accent hover:underline">
            Continue shopping
          </Link>
          <button onClick={handleCheckout} className="btn-primary">
            Checkout
          </button>
        </div>
      </motion.div>
    </div>
  )
}
