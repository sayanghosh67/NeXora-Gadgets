const STORAGE_KEY = 'nexora_cart'

export const readInitialCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const persistCart = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
