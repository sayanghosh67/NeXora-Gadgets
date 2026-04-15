import { motion as Motion } from 'framer-motion'
import { ArrowLeft, Star, ShoppingCart, Package, Shield, Zap } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BrandName, formatBrandText } from '../components/BrandName.jsx'
import { useCart } from '../hooks/useCart.js'
import { products } from '../data/products.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

const FEATURE_MAP = {
  Headphones: ['Active Noise Cancellation', 'Bluetooth 5.4', '40-hour battery', 'Hi-Res Audio'],
  'Smart Watches': ['AMOLED display', 'Heart rate & SpO2', 'GPS built-in', 'IP68 water resistant'],
  'Mechanical Keyboards': ['Hot-swappable switches', 'Per-key RGB', 'Tri-mode connectivity', 'Gasket mount design'],
  'Gaming Mouse': ['Optical sensor', 'Programmable buttons', 'Low-latency wireless', 'Custom DPI profiles'],
  Monitors: ['Factory colour-calibrated', 'Adaptive sync', 'USB-C / HDMI', 'Adjustable stand'],
  'Tech Accessories': ['Plug & play', 'Universal compatibility', 'Premium aluminium build', 'Compact design'],
}

export const ProductDetailsPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find((item) => item.id === id)
  const [added, setAdded] = useState(false)

  const related = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 3)

  if (!product) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <p className="mb-2 text-2xl font-semibold text-white">Product not found</p>
        <p className="mb-6 text-neutral-400">The product you're looking for doesn't exist.</p>
        <Link
          className="btn-premium inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          to="/"
        >
          Back to catalog
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const features = FEATURE_MAP[product.category] ?? []

  return (
    <section className="space-y-12">
      {/* ─── Main product section ──────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Image */}
        <Motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300"
          >
            <ArrowLeft className="size-4" />
            All products
          </Link>

          <div className="glass-card group overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
              }}
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Features list */}
          {features.length > 0 && (
            <div className="glass-card rounded-2xl p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Key features
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Zap className="size-3.5 shrink-0 text-orange-400" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Motion.div>

        {/* Right: Details */}
        <Motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white">
                  {product.badge}
                </span>
              )}
            </div>

            <h2
              className="text-3xl font-bold leading-tight text-white sm:text-4xl"
              style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
            >
              {formatBrandText(product.name)}
            </h2>

            <p className="text-base leading-relaxed text-neutral-300">
              {formatBrandText(product.description)}
            </p>
          </div>

          {/* Rating */}
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/20 bg-amber-500/8 px-3.5 py-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-4 ${
                    s <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-neutral-700 text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-amber-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-neutral-500">/ 5.0</span>
          </div>

          {/* Purchase card */}
          <div className="glass-card rounded-2xl p-5 space-y-5">
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-white sm:text-5xl">
                {formatINR(product.price)}
              </p>
              <span className="mb-1 text-sm text-neutral-400">incl. GST</span>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <div
                className={`size-2 rounded-full ${
                  product.stock > 10
                    ? 'bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                    : 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                }`}
              />
              <p className="text-sm text-neutral-300">
                {product.stock > 10
                  ? `${product.stock} units in stock`
                  : `Only ${product.stock} units left — order soon`}
              </p>
            </div>

            <Motion.button
              id={`pdp-add-to-cart-${product.id}`}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 ${
                added
                  ? 'border border-orange-500/40 bg-orange-500/20 text-orange-300 shadow-[0_0_24px_rgba(245,158,11,0.3)]'
                  : 'btn-premium'
              }`}
            >
              <ShoppingCart className="size-4" />
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </Motion.button>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-xs text-neutral-400">
                <Shield className="size-3.5 text-orange-400 shrink-0" />
                2-year warranty
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-xs text-neutral-400">
                <Package className="size-3.5 text-orange-400 shrink-0" />
                Free returns
              </div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* ─── Related products ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="space-y-5">
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
          >
            More in {product.category}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.id}`}
                className="glass-card group flex gap-3 overflow-hidden rounded-2xl p-3 transition-all"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_PRODUCT_IMAGE }}
                  className="size-16 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white group-hover:text-orange-300">
                    {formatBrandText(rel.name)}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400 line-clamp-1">{rel.shortDescription}</p>
                  <p className="mt-1.5 text-sm font-bold text-white">{formatINR(rel.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

