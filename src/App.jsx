import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { CartSidebar } from './components/CartSidebar.jsx'
import { AuthModal } from './components/AuthModal.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProductDetailsPage } from './pages/ProductDetailsPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_55%)]" />
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Motion.div>
        </AnimatePresence>
      </main>

      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}

export default App
