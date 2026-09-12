import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { Header } from '../../components/layout/Header'
import { pushToast } from '../../components/ui/Toast'
import type { Role } from '../../lib/types'

export function Login() {
  const [params] = useSearchParams()
  const initial = (params.get('role') as Role) || (sessionStorage.getItem('foodloop_pending_role') as Role) || 'restaurant'
  const [role, setRole] = useState<Role>(initial === 'beneficiary' ? 'beneficiary' : 'restaurant')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user, initializing, login } = useAuth()
  const nav = useNavigate()

  useEffect(() => { sessionStorage.setItem('foodloop_pending_role', role) }, [role])

  useEffect(() => {
    if (initializing || !user) return
    nav(user.role === 'restaurant' ? '/restaurant/dashboard' : '/beneficiary/dashboard')
  }, [user, initializing, nav])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    if (!email.includes('@')) return setErr('Please enter a valid email')
    if (password.length < 6) return setErr('Password must be at least 6 characters')
    setSubmitting(true)
    try {
      const u = await login(email.trim(), password, role)
      pushToast(`Welcome back, ${u.name}!`)
      nav(u.role === 'restaurant' ? '/restaurant/dashboard' : '/beneficiary/dashboard')
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[520px] mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-[28px] font-black tracking-tight text-stone-900">Welcome back</h1>
            <p className="text-sm text-stone-500 mt-1">Continue as a...</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button onClick={() => setRole('restaurant')} className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-1 transition ${role === 'restaurant' ? 'border-[#16A34A] bg-[#F0FDF4]' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
              <span className="text-2xl">🍽️</span>
              <span className={`text-sm font-extrabold ${role === 'restaurant' ? 'text-[#16A34A]' : 'text-stone-700'}`}>Restaurant</span>
              {role === 'restaurant' && <span className="text-[11px] bg-[#16A34A] text-white px-2 py-0.5 rounded-full font-bold">Selected</span>}
            </button>
            <button onClick={() => setRole('beneficiary')} className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-1 transition ${role === 'beneficiary' ? 'border-sky-500 bg-sky-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
              <span className="text-2xl">🤝</span>
              <span className={`text-sm font-extrabold ${role === 'beneficiary' ? 'text-sky-600' : 'text-stone-700'}`}>Beneficiary</span>
              {role === 'beneficiary' && <span className="text-[11px] bg-sky-500 text-white px-2 py-0.5 rounded-full font-bold">Selected</span>}
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-email" className="text-xs font-bold tracking-widest text-stone-500">EMAIL</label>
              <input id="login-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@restaurant.com" className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>
            <div>
              <label htmlFor="login-password" className="text-xs font-bold tracking-widest text-stone-500">PASSWORD</label>
              <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>
            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{err}</div>}
            <button type="submit" disabled={submitting} className="w-full bg-stone-900 hover:bg-black disabled:bg-stone-400 text-white font-extrabold py-3.5 rounded-full shadow transition">{submitting ? 'Logging in…' : 'Login →'}</button>
          </form>

          <div className="mt-4 text-center text-sm text-stone-600">
            Don't have an account? <Link to={`/register/${role}`} className="font-bold text-[#16A34A] hover:underline">Register as {role}</Link>
          </div>

          <div className="mt-5 bg-[#FFFBEB] border border-amber-200 rounded-2xl p-3 text-xs leading-relaxed text-stone-600">
            Your account and password are managed securely by Supabase Auth. Create a restaurant or beneficiary account to start sharing food.
          </div>

          <div className="mt-4 text-center">
            <Link to="/join" className="text-xs font-semibold text-stone-500 hover:text-stone-700">← Back to role selection</Link>
          </div>
        </div>
      </div>
    </div>
  )
}