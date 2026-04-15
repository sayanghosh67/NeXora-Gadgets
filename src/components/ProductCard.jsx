import { motion as Motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

export const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart()

  return (
    <Motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="group glass-card overflow-hidden rounded-2xl"
    >
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_PRODUCT_IMAGE
          }}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-blue-200/70">{product.category}</p>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-white transition group-hover:text-blue-200">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Star className="size-4 fill-blue-300 text-blue-300" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-blue-100">{formatINR(product.price)}</p>
          <Motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="btn-premium rounded-xl px-3.5 py-2 text-sm font-medium text-white"
          >
            Add to Cart
          </Motion.button>
        </div>
      </div>
    </Motion.article>
  )
}
