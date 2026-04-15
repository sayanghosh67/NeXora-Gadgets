import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatBrandText } from './BrandName.jsx'
import { useCart } from '../hooks/useCart.js'
import { formatINR } from '../utils/currency.js'
import { FALLBACK_PRODUCT_IMAGE } from '../utils/media.js'

export const CartSidebar = ({ open, onClose }) => {
  const { items, price, removeFromCart, updateQuantity, clearCart } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <Motion.button
            aria-label="Close cart"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm"
          />

          {/* Sidebar panel */}
          <Motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[400px] flex-col border-l border-white/5 bg-slate-950/80 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                  <ShoppingBag className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Your Cart</h2>
                  <p className="text-xs text-slate-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 p-2 text-neutral-400 transition-colors hover:border-orange-500/40 hover:text-orange-400"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <Motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
                      <ShoppingBag className="size-6" />
                    </div>
                    <p className="text-base font-semibold text-white">Cart is empty</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Add products from the store.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-5 btn-premium rounded-xl px-5 py-2 text-sm font-semibold text-white"
                    >
                      Browse products
                    </button>
                  </Motion.div>
                ) : (
                  items.map((item) => (
                    <Motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="glass-card rounded-2xl p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                          }}
                          className="size-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1 space-y-2">
                          <h3 className="truncate text-sm font-semibold text-white">
                            {formatBrandText(item.name)}
                          </h3>
                          <p className="text-sm font-bold text-white">
                            {formatINR(item.price)}
                          </p>

                          {/* Qty + remove */}
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-slate-300 transition-colors hover:text-white"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="min-w-5 text-center text-sm font-semibold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-slate-300 transition-colors hover:text-white"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-lg border border-white/8 p-1.5 text-slate-400 transition-colors hover:border-rose-400/40 hover:text-rose-300"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-4 border-t border-white/8 px-5 py-4">
                {/* Subtotal */}
                <div className="space-y-1.5 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-200">{formatINR(price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-slate-200">{formatINR(199)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 pt-3">
                  <p className="text-base font-semibold text-slate-200">Total</p>
                  <p className="text-2xl font-bold text-white">{formatINR(price + 199)}</p>
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-2.5">
                  <button
                    onClick={clearCart}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-300 transition-colors hover:border-rose-400/55 hover:text-rose-300"
                  >
                    <Trash2 className="size-3.5" /> Clear
                  </button>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="btn-premium flex items-center justify-center rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white"
                  >
                    Checkout →
                  </Link>
                </div>
              </div>
            )}
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
