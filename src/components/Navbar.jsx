import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, UserRound, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandName } from './BrandName.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

export const Navbar = ({ onOpenCart, onOpenAuth }) => {
  const { count } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group inline-flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.4)] transition-shadow group-hover:shadow-[0_0_36px_rgba(245,158,11,0.6)]">
            <Zap className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-neutral-400">
              Premium Store
            </p>
            <p
              className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-amber-500"
              style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
            >
              <BrandName /> Gadgets
            </p>
          </div>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Logged-in indicator */}
          <AnimatePresence>
            {isAuthenticated && (
              <Motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="hidden rounded-xl border border-emerald-400/20 bg-emerald-500/8 px-3 py-1.5 text-xs text-emerald-300 sm:block"
              >
                {user?.contact}
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Login / Logout */}
          <Motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            onClick={isAuthenticated ? logout : onOpenAuth}
            className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-orange-500/40 hover:text-white"
          >
            <UserRound className="size-4" />
            <span className="hidden sm:inline">{isAuthenticated ? 'Logout' : 'Login'}</span>
          </Motion.button>

          {/* Cart button */}
          <Motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            onClick={onOpenCart}
            className="group relative inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_28px_rgba(245,158,11,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
          >
            <ShoppingBag className="size-4" />
            <span>Cart</span>
            <AnimatePresence mode="wait">
              <Motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              >
                {count}
              </Motion.span>
            </AnimatePresence>
          </Motion.button>
        </div>
      </div>
    </header>
  )
}
