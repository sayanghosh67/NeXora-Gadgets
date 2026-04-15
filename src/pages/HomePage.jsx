import { useMemo, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Truck, Package, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FiltersPanel } from '../components/FiltersPanel.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

const PERKS = [
  { icon: Zap, label: 'Same-day dispatch' },
  { icon: Shield, label: '2-year warranty' },
  { icon: Truck, label: 'Free returns' },
  { icon: Package, label: 'Secure packaging' },
]

const STATS = [
  { value: '50K+', label: 'Happy customers' },
  { value: '13+', label: 'Products listed' },
  { value: '4.7★', label: 'Avg. rating' },
]

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

  const handleClearFilters = () => {
    setSearchTerm('')
    setCategory('All')
    setMaxPrice(70000)
  }

  return (
    <section className="space-y-14">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-3xl border border-blue-400/14 px-8 py-16 sm:px-14 sm:py-24"
        style={{
          background:
            'radial-gradient(ellipse at 65% 50%, rgba(37,99,235,0.18) 0%, transparent 65%), radial-gradient(ellipse at 15% 0%, rgba(6,182,212,0.14) 0%, transparent 55%), linear-gradient(145deg, #0a1628 0%, #030a1a 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 size-32 -translate-y-1/2 rounded-full bg-blue-600/10 blur-2xl" />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow badge */}
          <Motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-400/28 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-blue-400" />
            Future of Everyday Tech
          </Motion.span>

          {/* Headline */}
          <Motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            Premium gadgets{' '}
            <span className="text-gradient-blue">crafted for you.</span>
          </Motion.h2>

          {/* Sub-text */}
          <Motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300/85"
          >
            Discover curated hardware with modern industrial design — built for
            creators, gamers, and professionals who demand the best.
          </Motion.p>

          {/* CTA row */}
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#catalog"
              className="btn-premium inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              Shop now <ArrowRight className="size-4" />
            </a>
            <Link
              to="/products/hx-900"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-blue-200"
            >
              View best seller →
            </Link>
          </Motion.div>
        </div>

        {/* Stats row */}
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          className="relative z-10 mt-12 flex flex-wrap gap-6 border-t border-white/8 pt-8 sm:gap-10"
        >
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white sm:text-3xl">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </Motion.div>

        {/* Perks row */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10 mt-6 flex flex-wrap gap-3"
        >
          {PERKS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-slate-900/50 px-3.5 py-2 text-xs font-medium text-slate-300"
            >
              <Icon className="size-3.5 text-blue-400" />
              {label}
            </span>
          ))}
        </Motion.div>
      </Motion.div>

      {/* ─── Catalog section ──────────────────────────────────────────────── */}
      <div id="catalog" className="space-y-8">
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3
            className="mb-1 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            All Products
          </h3>
          <p className="text-sm text-slate-400">
            Search, filter, and find exactly what you need.
          </p>
        </Motion.div>

        <FiltersPanel
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          category={category}
          onCategory={setCategory}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
        />

        {/* Results bar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing{' '}
            <span className="font-semibold text-blue-200">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'product' : 'products'}
            {category !== 'All' && (
              <span className="text-slate-500"> in {category}</span>
            )}
          </p>
          {(searchTerm || category !== 'All' || maxPrice < 70000) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid / empty state */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <Motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card flex flex-col items-center justify-center rounded-2xl py-20 text-center"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Package className="size-6" />
              </div>
              <p className="mb-1 text-xl font-semibold text-white">No products found</p>
              <p className="mb-5 text-sm text-slate-400">
                Try adjusting your search term or filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-premium rounded-xl px-5 py-2 text-sm font-semibold text-white"
              >
                Clear all filters
              </button>
            </Motion.div>
          ) : (
            <Motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
