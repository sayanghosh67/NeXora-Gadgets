import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

export const CartSidebar = ({ open, onClose }) => {
  const { items, price, removeFromCart, updateQuantity, clearCart } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          <Motion.button
            aria-label="Close cart"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-sm"
          />

          <Motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-blue-400/20 bg-slate-900/95 p-5 shadow-[0_0_40px_rgba(37,99,235,0.35)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Your Cart</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 p-2 text-slate-200 hover:border-blue-300/40 hover:text-blue-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="glass-card rounded-2xl p-6 text-center text-slate-300">
                  Your cart is empty.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="glass-card rounded-2xl p-3">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(event) => {
                          event.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                        }}
                        className="size-16 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1 space-y-2">
                        <h3 className="truncate text-sm font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-blue-200">{formatINR(item.price)}</p>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="size-3.5 text-slate-300" />
                            </button>
                            <span className="min-w-5 text-center text-sm text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="size-3.5 text-slate-300" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-rose-300 hover:text-rose-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-300">Total</p>
                <p className="text-2xl font-semibold text-blue-100">{formatINR(price)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={clearCart}
                  className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-rose-300/60 hover:text-rose-200"
                >
                  Clear
                </button>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-premium rounded-xl px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
