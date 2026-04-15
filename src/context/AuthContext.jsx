import { useMemo, useState } from 'react'
import { AuthContext } from './authStore.js'
import { clearAuthSession, persistAuthSession, readAuthSession } from './authStorage.js'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readAuthSession)

  const login = ({ contact, method }) => {
    const session = {
      id: `user-${Math.random().toString(36).slice(2, 10)}`,
      contact,
      method,
    }
    setUser(session)
    persistAuthSession(session)
  }

  const logout = () => {
    setUser(null)
    clearAuthSession()
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
