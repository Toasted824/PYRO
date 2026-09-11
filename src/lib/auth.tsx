import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { mockStore } from './mockStore'
import type { User, Role } from './types'

interface AuthCtx {
  user: User | null
  login: (email: string, password: string, expectedRole?: Role) => User
  register: (data: Omit<User, 'id'>) => User
  logout: () => void
  refresh: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => mockStore.getSession())

  const refresh = () => setUser(mockStore.getSession())

  useEffect(() => {
    const h = () => refresh()
    window.addEventListener('foodloop:auth', h)
    window.addEventListener('storage', h)
    return () => {
      window.removeEventListener('foodloop:auth', h)
      window.removeEventListener('storage', h)
    }
  }, [])

  const login = (email: string, password: string, expectedRole?: Role) => {
    const u = mockStore.findUserByEmail(email)
    if (!u) throw new Error('No account found with this email')
    if (u.password !== password) throw new Error('Incorrect password')
    if (expectedRole && u.role !== expectedRole) throw new Error(`This account is registered as ${u.role}. Please switch to ${u.role}.`)
    mockStore.setSession(u)
    setUser(u)
    return u
  }

  const register = (data: Omit<User, 'id'>) => {
    const u = mockStore.createUser(data)
    mockStore.setSession(u)
    setUser(u)
    return u
  }

  const logout = () => {
    mockStore.setSession(null)
    setUser(null)
  }

  return <Ctx.Provider value={{ user, login, register, logout, refresh }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth outside provider')
  return v
}
