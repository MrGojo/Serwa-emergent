/**
 * SERWA Professional - Profile Page
 * 
 * User account dashboard with:
 * - Profile information
 * - Order history
 * - Saved addresses
 * - Preferences
 * - Luxury design matching brand aesthetic
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Mock user data - replace with actual auth/API integration
const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: 'January 2024',
}

const mockOrders = [
  {
    id: 'ORD-001',
    date: 'March 5, 2024',
    total: '$89.99',
    status: 'Delivered',
    items: 2,
  },
  {
    id: 'ORD-002',
    date: 'February 20, 2024',
    total: '$156.50',
    status: 'Delivered',
    items: 3,
  },
  {
    id: 'ORD-003',
    date: 'January 15, 2024',
    total: '$45.00',
    status: 'Delivered',
    items: 1,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile')

  return (
    <div className="min-h-screen bg-gradient-to-b from-serwa-primary to-[#f0e8dc] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-4">
            My Account
          </h1>
          <p className="text-serwa-secondary/70 text-lg">
            Welcome back, {mockUser.name}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8 flex-wrap"
        >
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-serwa-accent text-white shadow-lg'
                : 'bg-white text-serwa-secondary hover:bg-serwa-secondary/5'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-serwa-accent text-white shadow-lg'
                : 'bg-white text-serwa-secondary hover:bg-serwa-secondary/5'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'addresses'
                ? 'bg-serwa-accent text-white shadow-lg'
                : 'bg-white text-serwa-secondary hover:bg-serwa-secondary/5'
            }`}
          >
            Addresses
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-6">
                  Profile Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={mockUser.phone}
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={mockUser.joinDate}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/10 bg-serwa-primary/50 text-serwa-secondary/60"
                    />
                  </div>
                </div>
                <button className="mt-6 btn-primary">
                  Save Changes
                </button>
              </div>

              {/* Password Section */}
              <div className="border-t border-serwa-secondary/10 pt-8">
                <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-6">
                  Change Password
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-serwa-secondary/70 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-serwa-secondary/20 focus:border-serwa-accent focus:ring-2 focus:ring-serwa-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <button className="mt-6 btn-outline">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-6">
                Order History
              </h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-serwa-secondary/10 rounded-2xl p-6 hover:border-serwa-accent/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-serwa-secondary">
                            Order {order.id}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-serwa-secondary/60">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-semibold text-serwa-secondary">
                          {order.total}
                        </p>
                        <Link
                          to={`/order/${order.id}`}
                          className="btn-outline text-sm px-4 py-2"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {mockOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-serwa-secondary/60 mb-4">No orders yet</p>
                  <Link to="/shop" className="btn-primary inline-block">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-semibold text-serwa-secondary">
                  Saved Addresses
                </h2>
                <button className="btn-primary text-sm">
                  + Add New Address
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Example address card */}
                <div className="border border-serwa-secondary/10 rounded-2xl p-6 relative">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-serwa-accent/10 text-serwa-accent">
                    Default
                  </span>
                  <h3 className="font-semibold text-serwa-secondary mb-3">
                    Home
                  </h3>
                  <p className="text-serwa-secondary/70 text-sm leading-relaxed mb-4">
                    123 Luxury Lane<br />
                    Beverly Hills, CA 90210<br />
                    United States
                  </p>
                  <div className="flex gap-2">
                    <button className="text-sm text-serwa-accent hover:underline">
                      Edit
                    </button>
                    <span className="text-serwa-secondary/20">|</span>
                    <button className="text-sm text-serwa-secondary/60 hover:text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button className="text-serwa-secondary/60 hover:text-serwa-accent transition-colors underline">
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  )
}
