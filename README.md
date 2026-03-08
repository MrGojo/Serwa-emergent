# SERWA Professional - E-Commerce Website

Professional haircare brand website built with React, integrated with Shopify for products, cart, and checkout.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (BIOTOP-inspired scroll animations)
- **E-Commerce**: Shopify Storefront API via @shopify/hydrogen-react
- **Routing**: React Router v6

## Design Inspiration

- **Homepage**: [BIOTOP India](https://biotopindia.com/) - Hero, product carousels, full-width banners, bestsellers
- **Shop/Collection**: [Original & Mineral](https://shop.simplyorganicbeauty.com/collections/original-mineral) - Filters, product grid, sort options

## Brand Colors

- Primary: `#EFE7DC` (cream/beige)
- Secondary: `#2F304D` (navy blue)
- Accent: `#FA198B` (pink)

## Project Structure

```
serwa-website/
├── src/
│   ├── components/     # Header, Footer, ProductCard, Layout
│   ├── data/           # Product placeholder data (replace with Shopify)
│   ├── lib/            # Shopify integration, cart context
│   ├── pages/          # All page components
│   └── main.tsx
├── public/             # Static assets
└── package.json
```

## Pages

1. **Home** - Hero, product ranges, banners, bestsellers
2. **Shop** - Collection with filters (product type, sort)
3. **Product** - Product detail with variant selector
4. **Cart** - Cart items, quantity, checkout
5. **Our Story** - Brand story
6. **Education** - Haircare education
7. **Blog** - Blog listing
8. **Help & Support** - Contact, shipping, returns
9. **Legalities** - Privacy, terms, cookies
10. **FAQ** - Frequently asked questions
11. **Feedback** - Feedback form

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Shopify Setup (Required for live store)

1. **Create a Shopify store** at [shopify.com](https://www.shopify.com)

2. **Enable Headless channel** or create a custom app:
   - Go to Shopify Admin → Settings → Apps and sales channels
   - Install "Headless" channel OR create a custom app
   - Get your **Storefront API** public token

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add:
   ```
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your_public_token
   ```

4. **Add products in Shopify Admin** - Products will automatically sync via the Storefront API

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

## Content Updates

The site uses **content placeholders** throughout. To add real content:

- **Products**: Add in Shopify Admin, or edit `src/data/products.ts` for development
- **Page content**: Search for "Content placeholder" in `src/pages/` and replace with client content
- **Images**: Replace `/placeholder-product.svg` and hero images in `public/`

## Shopify Integration Notes

- **Cart**: Uses local storage when Shopify is not configured (development mode)
- **Checkout**: Redirects to Shopify checkout when configured
- **Products**: Fetched from Shopify Collections via Storefront API when env vars are set

## Deployment

Build the static files and deploy to any hosting (Vercel, Netlify, etc.):

```bash
npm run build
```

The output is in the `dist/` folder.

## Support

For questions about this project, contact the developer.
