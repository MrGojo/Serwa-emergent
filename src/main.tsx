/**
 * SERWA Professional - Main Entry Point
 * 
 * This is the root of the React application.
 * Wraps the app with necessary providers (Shopify, Router).
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ShopifyProvider } from './lib/shopify'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopifyProvider>
        <App />
      </ShopifyProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
