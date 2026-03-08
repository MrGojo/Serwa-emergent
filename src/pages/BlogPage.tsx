/**
 * SERWA Professional - Blog Page
 * 
 * Blog listing - ready for Shopify blog or headless CMS integration.
 * Content placeholders for structure.
 */

import { motion } from 'framer-motion'

// Placeholder blog posts - replace with Shopify Blog API or CMS
const blogPosts = [
  {
    id: 1,
    title: 'Blog Post Title 1',
    excerpt: 'Content placeholder - add blog post excerpt. Short description of the article.',
    date: '2025-02-01',
    image: '/placeholder-product.svg',
    slug: 'blog-post-1',
  },
  {
    id: 2,
    title: 'Blog Post Title 2',
    excerpt: 'Content placeholder - add blog post excerpt.',
    date: '2025-01-15',
    image: '/placeholder-product.svg',
    slug: 'blog-post-2',
  },
  {
    id: 3,
    title: 'Blog Post Title 3',
    excerpt: 'Content placeholder - add blog post excerpt.',
    date: '2025-01-01',
    image: '/placeholder-product.svg',
    slug: 'blog-post-3',
  },
]

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-serwa-secondary/80"
          >
            Content placeholder - add blog section intro from client.
          </motion.p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-serwa-secondary/10 mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-serwa-secondary/60 mb-2">
                {new Date(post.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <h2 className="font-serif text-xl font-semibold text-serwa-secondary mb-2 group-hover:text-serwa-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-serwa-secondary/80 text-sm">
                {post.excerpt}
              </p>
              {/* TODO: Link to /blog/[slug] when blog detail route is added */}
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
