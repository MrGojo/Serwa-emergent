/**
 * SERWA Professional - Main App Component
 * 
 * Handles routing for all pages:
 * - Home (BIOTOP-inspired)
 * - Shop/Collection (Original & Mineral-inspired)
 * - Our Story
 * - Education
 * - Blog
 */

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePageNew from './pages/HomePageNew'
import ShopPage from './pages/ShopPage'
import OurStoryPage from './pages/OurStoryPage'
import EducationPage from './pages/EducationPage'
import BlogPage from './pages/BlogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import HelpSupportPage from './pages/HelpSupportPage'
import LegalPage from './pages/LegalPage'
import FaqPage from './pages/FaqPage'
import FeedbackPage from './pages/FeedbackPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePageNew />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:collectionHandle" element={<ShopPage />} />
        <Route path="/product/:productHandle" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        {/* Footer pages */}
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/help/:section" element={<HelpSupportPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/legal/:section" element={<LegalPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  )
}

export default App
