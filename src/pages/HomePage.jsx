import { useMemo, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FiltersPanel } from '../components/FiltersPanel.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { BrandName } from '../components/BrandName.jsx'
import { products } from '../data/products.js'

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(70000)

  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()
    return products.filter((p) => {
      const inCategory = category === 'All' || p.category === category
      const inPrice = p.price <= maxPrice
      const inSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      return inCategory && inPrice && inSearch
    })
  }, [category, maxPrice, searchTerm])

  // Smooth scroll handler with a "wow" effect
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog')
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Apple-style fade and slight upward motion, with staggered appearance
  // Added bidirectional support for scroll-up/down
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-32">
      {/* ─── Apple-style Cinematic Hero ─────────────────────────────────────── */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center pt-24 pb-16 text-center sm:pt-32 sm:pb-24">
        
        {/* Title */}
        <Motion.h1
          initial={{ opacity: 0, filter: 'blur(20px)', y: 80 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 max-w-5xl text-6xl font-semibold tracking-tight text-white sm:text-8xl lg:text-[7.5rem]"
          style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
        >
          <BrandName /> Gadgets
        </Motion.h1>

        {/* Subtitle */}
        <Motion.p
          initial={{ opacity: 0, filter: 'blur(15px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-xl font-medium text-neutral-400 sm:text-2xl leading-relaxed"
        >
          Engineered for Precision. <br className="hidden sm:block" />
          Designed for Experience.
        </Motion.p>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <Motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 122, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToCatalog}
            className="btn-premium flex items-center justify-center rounded-full px-10 py-4 text-base sm:text-lg font-medium tracking-wide shadow-2xl"
          >
            Explore Products
          </Motion.button>
        </Motion.div>
      </section>


      {/* ─── Catalog Section ────────────────────────────────────────────── */}
      <section id="catalog" className="scroll-mt-32 space-y-12">
        
        {/* Filters */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <FiltersPanel
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            category={category}
            onCategory={setCategory}
            maxPrice={maxPrice}
            onMaxPrice={setMaxPrice}
          />
        </Motion.div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-neutral-500">
            <span className="text-white">{filtered.length}</span> {filtered.length === 1 ? 'Product' : 'Products'}
            {category !== 'All' && <span className="text-neutral-500"> • {category}</span>}
          </p>
          {(searchTerm || category !== 'All' || maxPrice < 70000) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-medium text-orange-500 underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid / Empty State */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <Motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-white/5 bg-transparent text-center"
            >
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-500">
                <Search className="size-6" />
              </div>
              <h3 className="mb-2 text-2xl font-medium text-white">No matches found</h3>
              <p className="mb-8 max-w-sm text-base text-neutral-500">
                We couldn't find any products matching your current filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-secondary px-6 py-3 text-sm font-medium text-white"
              >
                Reset Filters
              </button>
            </Motion.div>
          ) : (
            <div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
