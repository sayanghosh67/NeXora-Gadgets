import { useContext } from 'react'
import { CartContext } from '../context/cartStore.js'

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
