import { useMemo, useState } from 'react'
import { CartContext } from './cartStore.js'
import { persistCart, readInitialCart } from './cartStorage.js'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readInitialCart)

  const persist = (next) => {
    setItems(next)
    persistCart(next)
  }

  const addToCart = (product) => {
    const exists = items.find((item) => item.id === product.id)
    if (exists) {
      persist(
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
      return
    }
    persist([...items, { ...product, quantity: 1 }])
  }

  const removeFromCart = (productId) => {
    persist(items.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    persist(
      items.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item,
      ),
    )
  }

  const clearCart = () => persist([])

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const price = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    return { count, price }
  }, [items])

  const value = {
    items,
    ...totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
