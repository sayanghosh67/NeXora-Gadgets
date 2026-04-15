import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrandName } from './BrandName.jsx'

export const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="text-center">
        <Motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tighter md:text-6xl"
        >
          <BrandName /> <span className="text-white">Gadgets</span>
        </Motion.h1>
        
        <Motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-xs font-medium uppercase tracking-[0.4em] text-neutral-500 md:text-sm"
        >
          CREATED BY <span className="text-red-600">SAYAN</span> <span className="text-white">GHOSH</span>
        </Motion.p>
      </div>

      <Motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 via-red-600 to-white origin-left"
      />
    </Motion.div>
  )
}
