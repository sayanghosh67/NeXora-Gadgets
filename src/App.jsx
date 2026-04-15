import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { CartSidebar } from './components/CartSidebar.jsx'
import { AuthModal } from './components/AuthModal.jsx'
import { Footer } from './components/Footer.jsx'
import { Preloader } from './components/Preloader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProductDetailsPage } from './pages/ProductDetailsPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-apple-dark text-slate-100 overflow-hidden selection:bg-orange-500/40 selection:text-white">
      {/* ─── Central Apple-style Warm Spotlight ─── */}
      <div className="hero-glow" />
      
      {/* ─── Premium Noise Texture Overlay ─── */}
      <div className="noise-overlay" />

      {/* ─── Main Content Wrapper ─── */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />

        <main className="mx-auto flex-1 w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <Motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
    </>
  )
}

export default App
