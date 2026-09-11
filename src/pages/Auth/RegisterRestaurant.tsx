import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { Header } from '../../components/layout/Header'
import { pushToast } from '../../components/ui/Toast'

export function RegisterRestaurant() {
  const [form, setForm] = useState({ name: '', location: '', contact: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const { register } = useAuth()
  const nav = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    if (!form.name.trim()) return setErr('Restaurant name is required')
    if (!form.location.trim()) return setErr('Location is required')
    if (!form.contact.trim()) return setErr('Contact is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr('Enter a valid email')
    if (form.password.length < 6) return setErr('Password must be at least 6 characters')
    try {
      const u = register({ ...form, role: 'restaurant', name: form.name.trim(), email: form.email.trim() })
      pushToast(`Welcome, ${u.name}! Restaurant account created.`)
      nav('/restaurant/dashboard')
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[560px] mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-amber-200 grid place-items-center">🍽️</div>
            <div>
              <h1 className="text-[22px] font-black tracking-tight text-stone-900 leading-none">Restaurant registration</h1>
              <p className="text-xs font-bold tracking-widest text-amber-600">DONATE SURPLUS • REDUCE WASTE</p>
            </div>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Restaurant name" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Kathmandu Kitchen" />
            <Field label="Location" value={form.location} onChange={v=>setForm({...form,location:v})} placeholder="Thamel, Kathmandu" />
            <Field label="Contact information" value={form.contact} onChange={v=>setForm({...form,contact:v})} placeholder="+977 98XXXXXXXX" />
            <Field label="Email" value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="hello@kathmandukitchen.com" type="email" />
            <Field label="Password" value={form.password} onChange={v=>setForm({...form,password:v})} placeholder="At least 6 characters" type="password" />
            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{err}</div>}
            <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold py-3.5 rounded-full shadow transition">Create restaurant account →</button>
          </form>
          <div className="mt-4 text-center text-sm text-stone-600">Already have account? <Link to="/login?role=restaurant" className="font-bold text-[#16A34A] hover:underline">Log in</Link> • <Link to="/join" className="font-semibold text-stone-500 hover:text-stone-700">Change role</Link></div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type='text' }: { label:string; value:string; onChange:(v:string)=>void; placeholder:string; type?:string }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest text-stone-500">{label.toUpperCase()}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
    </div>
  )
}
