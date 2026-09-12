import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, EmailConfirmationError } from '../../lib/auth'
import { Header } from '../../components/layout/Header'
import { pushToast } from '../../components/ui/Toast'

export function RegisterBeneficiary() {
  const [form, setForm] = useState({ name: '', location: '', contact: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user, initializing, register } = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    if (initializing || !user) return
    nav(user.role === 'restaurant' ? '/restaurant/dashboard' : '/beneficiary/dashboard')
  }, [user, initializing, nav])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setInfo('')
    if (!form.name.trim()) return setErr('Organization name is required')
    if (!form.location.trim()) return setErr('Location is required')
    if (!form.contact.trim()) return setErr('Contact is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr('Enter a valid email')
    if (form.password.length < 6) return setErr('Password must be at least 6 characters')
    setSubmitting(true)
    try {
      const u = await register({ ...form, role: 'beneficiary', name: form.name.trim(), email: form.email.trim() })
      pushToast(`Welcome, ${u.name}! Beneficiary account created.`)
      nav('/beneficiary/dashboard')
    } catch (e: unknown) {
      if (e instanceof EmailConfirmationError) setInfo(e.message)
      else setErr(e instanceof Error ? e.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[560px] mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 grid place-items-center">🤝</div>
            <div>
              <h1 className="text-[22px] font-black tracking-tight text-stone-900 leading-none">Beneficiary registration</h1>
              <p className="text-xs font-bold tracking-widest text-sky-600">FIND FOOD NEARBY • COMMUNITY</p>
            </div>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Organization name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Community Kitchen Patan" />
            <Field label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="Patan Dhoka, Lalitpur" />
            <Field label="Contact information" value={form.contact} onChange={v => setForm({ ...form, contact: v })} placeholder="+977 98XXXXXXXX" />
            <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="hello@communitykitchen.org" type="email" />
            <Field label="Password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="At least 6 characters" type="password" />
            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{err}</div>}
            {info && <div className="bg-[#F0FDF4] border border-green-200 text-[#15803D] text-sm px-3 py-2 rounded-xl">{info}</div>}
            <button type="submit" disabled={submitting} className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-extrabold py-3.5 rounded-full shadow transition">{submitting ? 'Creating account…' : 'Create beneficiary account →'}</button>
          </form>
          <div className="mt-4 text-center text-sm text-stone-600">Already have account? <Link to="/login?role=beneficiary" className="font-bold text-sky-600 hover:underline">Log in</Link> • <Link to="/join" className="font-semibold text-stone-500 hover:text-stone-700">Change role</Link></div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold tracking-widest text-stone-500">{label.toUpperCase()}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-stone-200 bg-sky-50/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500" />
    </div>
  )
}