const STORAGE_KEY = 'nexora_auth_session'

export const readAuthSession = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved)
    if (!parsed?.contact || !parsed?.method) return null
    return parsed
  } catch {
    return null
  }
}

export const persistAuthSession = (session) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEY)
}
