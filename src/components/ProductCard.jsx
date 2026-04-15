import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingCart, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

const BADGE_STYLES = {
  'Top Rated': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  New: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  Popular: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  'Best Value': 'bg-violet-500/20 text-violet-300 border-violet-400/30',
  Limited: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
  Sale: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
}

export const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.42,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group glass-card flex flex-col overflow-hidden rounded-2xl"
    >
      {/* ─── Image ─────────────────────────────────────────────────────── */}
      <Link
        to={`/products/${product.id}`}
        className="relative block overflow-hidden"
        tabIndex={-1}
        aria-hidden
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
          }}
          className="h-52 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category badge (top-left) */}
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-lg border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
              BADGE_STYLES[product.badge] ?? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Low-stock warning (top-right) */}
        {product.stock <= 8 && (
          <span className="absolute right-3 top-3 rounded-lg border border-rose-400/30 bg-rose-500/20 px-2.5 py-1 text-[11px] font-semibold text-rose-300 backdrop-blur-sm">
            Only {product.stock} left
          </span>
        )}
      </Link>

      {/* ─── Content ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-300/65">
            {product.category}
          </p>

          <Link to={`/products/${product.id}`}>
            <h3 className="text-base font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-blue-200">
              {product.name}
            </h3>
          </Link>

          <p className="line-clamp-1 text-sm text-slate-400">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-3 ${
                    star <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-700 text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-600">/ 5.0</span>
          </div>
        </div>

        {/* Price + Add-to-cart */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-blue-100">
              {formatINR(product.price)}
            </p>
            <p className="text-xs text-slate-500">incl. GST</p>
          </div>

          <Motion.button
            id={`add-to-cart-${product.id}`}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            onClick={handleAddToCart}
            className={`inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-white transition-all duration-300 ${
              added
                ? 'border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.25)]'
                : 'btn-premium'
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <Motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="size-3.5" /> Added
                </Motion.span>
              ) : (
                <Motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCart className="size-3.5" /> Add
                </Motion.span>
              )}
            </AnimatePresence>
          </Motion.button>
        </div>
      </div>
    </Motion.article>
  )
}
