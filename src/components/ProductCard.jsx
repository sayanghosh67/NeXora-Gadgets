import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandName, formatBrandText } from './BrandName.jsx'
import { useCart } from '../hooks/useCart.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

// Minimal, warm badge styling
const BADGE_STYLES = {
  'Top Rated': 'bg-white/10 text-white border-white/20',
  New: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Popular: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Best Value': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Limited: 'bg-red-500/10 text-red-500 border-red-500/20',
  Sale: 'bg-orange-600/10 text-orange-500 border-orange-600/20',
}

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  // Item variants for the staggered grid animation in HomePage
  // Apple style: slow fade, slight upward motion, and cinematic blur
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 45,
      filter: 'blur(15px)',
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 0.85, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  }

  const handleAddToCart = (e) => {
    e.preventDefault() // prevent navigating to product detail
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={itemVariants}
    >
      <Link
        to={`/products/${product.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-card text-left outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
      >
        {/* ─── Image Container ───────────────────────────────────────────── */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111] border-b border-white/5">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] group-hover:brightness-105"
            loading="lazy"
          />

          {/* Fade overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Subtle badges */}
          <div className="absolute top-4 inset-x-4 flex items-start justify-between pointer-events-none">
            <div className="flex flex-col gap-2">
              {product.badge && (
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-medium tracking-widest uppercase backdrop-blur-md ${
                    BADGE_STYLES[product.badge] ?? 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ─── Product Info ──────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-1.5">
            <h3 className="text-lg font-medium tracking-tight text-white transition-colors duration-300">
              {formatBrandText(product.name)}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-400">
              {formatBrandText(product.shortDescription)}
            </p>
          </div>

          {/* Price & Action */}
          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xl font-medium tracking-tight text-white">
                {formatINR(product.price)}
              </p>
            </div>

            <Motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              className={`relative flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                added
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-white/10 border border-white/10 text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <Motion.svg
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </Motion.svg>
                ) : (
                  <Motion.div
                    key="plus"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Plus className="size-5" />
                  </Motion.div>
                )}
              </AnimatePresence>
            </Motion.button>
          </div>
        </div>
      </Link>
    </Motion.div>
  )
}
