import { motion as Motion } from 'framer-motion'
import { ShoppingBag, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

export const Navbar = ({ onOpenCart, onOpenAuth }) => {
  const { count } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-blue-400/15 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-3">
          <span className="size-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Premium Store</p>
            <h1 className="text-xl font-semibold tracking-wide text-white">NeXora Gadgets</h1>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-xs text-slate-200 sm:block">
              {user?.contact}
            </div>
          ) : null}
          <Motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={isAuthenticated ? logout : onOpenAuth}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/55 px-3.5 py-2 text-sm text-slate-100 hover:border-blue-300/45 hover:text-blue-100"
          >
            <UserRound className="size-4" />
            {isAuthenticated ? 'Logout' : 'Login'}
          </Motion.button>

          <Motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={onOpenCart}
            className="group relative inline-flex items-center gap-3 rounded-xl border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100 transition-all hover:border-blue-300/55 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            <ShoppingBag className="size-4" />
            Cart
            <span className="inline-flex min-w-6 justify-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
              {count}
            </span>
          </Motion.button>
        </div>
      </div>
    </header>
  )
}
