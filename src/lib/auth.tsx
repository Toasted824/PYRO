import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase, isSupabaseConfigured } from './supabase'
import type { Role, User } from './types'

export interface RegisterData {
  role: Role
  name: string
  location: string
  contact: string
  email: string
  password: string
}

/** Thrown when Supabase returns signup success but no session (email confirmation enabled). */
export class EmailConfirmationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailConfirmationError'
  }
}

interface AuthCtx {
  user: User | null
  initializing: boolean
  configured: boolean
  login: (email: string, password: string, expectedRole?: Role) => Promise<User>
  register: (data: RegisterData) => Promise<User>
  logout: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

const NOT_CONFIGURED =
  'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'

function mapAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) return 'Incorrect email or password'
  if (m.includes('user already registered')) return 'An account with this email already exists'
  if (m.includes('email not confirmed')) return 'Please confirm your email address before logging in'
  if (m.includes('email takes too long')) return 'That email address looks invalid'
  if (m.includes('password should be')) return 'Password must be at least 6 characters'
  if (m.includes('rate limit')) return 'Too many attempts. Please try again in a minute'
  return message
}

function toAppUser(sb: { id: string; email?: string | null; user_metadata?: Record<string, unknown> }): User {
  const m = sb.user_metadata ?? {}
  const role: Role = m.role === 'restaurant' ? 'restaurant' : 'beneficiary'
  return {
    id: sb.id,
    email: sb.email ?? '',
    role,
    name: typeof m.name === 'string' ? m.name : '',
    location: typeof m.location === 'string' ? m.location : '',
    contact: typeof m.contact === 'string' ? m.contact : '',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (!supabase) {
      setInitializing(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setUser(data.session?.user ? toAppUser(data.session.user) : null)
      setInitializing(false)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return
      setUser(session?.user ? toAppUser(session.user) : null)
      setInitializing(false)
    })
    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string, expectedRole?: Role) => {
    if (!supabase) throw new Error(NOT_CONFIGURED)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) throw new Error(mapAuthError(error?.message ?? 'Login failed'))
    const u = toAppUser(data.user)
    if (expectedRole && u.role !== expectedRole) {
      await supabase.auth.signOut()
      throw new Error(`This account is registered as a ${u.role}. Please switch to ${u.role}.`)
    }
    setUser(u)
    return u
  }

  const register = async (data: RegisterData) => {
    if (!supabase) throw new Error(NOT_CONFIGURED)
    const { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: data.role,
          name: data.name,
          location: data.location,
          contact: data.contact,
        },
      },
    })
    if (error) throw new Error(mapAuthError(error.message))
    if (res.session?.user) {
      const u = toAppUser(res.session.user)
      setUser(u)
      return u
    }
    throw new EmailConfirmationError(
      `Account created for ${data.email}. Check your inbox to confirm your email, then log in.`,
    )
  }

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <Ctx.Provider value={{ user, initializing, configured: isSupabaseConfigured, login, register, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth outside provider')
  return v
}