import { motion as Motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { products } from '../data/products.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

export const ProductDetailsPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <p className="mb-3 text-2xl font-semibold text-white">Product not found</p>
        <Link className="text-blue-200 hover:text-blue-100" to="/">
          Back to catalog
        </Link>
      </div>
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <Motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-blue-100">
          <ArrowLeft className="size-4" />
          Back to products
        </Link>
        <div className="glass-card overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE
            }}
            className="h-[420px] w-full object-cover"
          />
        </div>
      </Motion.div>

      <Motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-200/70">{product.category}</p>
        <h2 className="text-4xl font-semibold text-white">{product.name}</h2>
        <p className="max-w-xl text-slate-300">{product.description}</p>

        <div className="inline-flex items-center gap-2 rounded-lg border border-blue-300/20 bg-blue-500/10 px-3 py-1.5 text-sm">
          <Star className="size-4 fill-blue-300 text-blue-300" />
          {product.rating.toFixed(1)} rating
        </div>

        <div className="glass-card rounded-2xl p-5">
          <p className="mb-4 text-4xl font-semibold text-blue-100">{formatINR(product.price)}</p>
          <p className="mb-5 text-sm text-slate-300">In stock: {product.stock} units</p>
          <button
            onClick={() => addToCart(product)}
            className="btn-premium w-full rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            Add to Cart
          </button>
        </div>
      </Motion.div>
    </section>
  )
}
