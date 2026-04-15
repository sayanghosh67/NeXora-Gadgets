import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, UserRound, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

export const Navbar = ({ onOpenCart, onOpenAuth }) => {
  const { count } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-blue-400/12 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group inline-flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_28px_rgba(56,189,248,0.55)] transition-shadow group-hover:shadow-[0_0_36px_rgba(56,189,248,0.75)]">
            <Zap className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-blue-300/65">
              Premium Store
            </p>
            <p
              className="text-[19px] font-bold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display, Inter), sans-serif' }}
            >
              NeXora Gadgets
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
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-blue-300/40 hover:text-blue-100"
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
            className="group relative inline-flex items-center gap-2.5 rounded-xl border border-blue-400/28 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100 transition-all hover:border-blue-300/55 hover:bg-blue-500/18 hover:shadow-[0_0_28px_rgba(59,130,246,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            <ShoppingBag className="size-4" />
            <span>Cart</span>
            <AnimatePresence mode="wait">
              <Motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-bold text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
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
