import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { mockStore } from '../../lib/mockStore'
import { FOOD_TYPES } from '../../lib/types'
import { Header } from '../../components/layout/Header'
import { pushToast } from '../../components/ui/Toast'

export function CreateDonation() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ foodType: FOOD_TYPES[0], meals: '10', availableUntil: '', pickupLocation: '', description: '', lat: '27.7172', lng: '85.3240' })
  const [err, setErr] = useState('')

  if (!user || user.role !== 'restaurant') {
    nav('/login?role=restaurant')
    return null
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const meals = parseInt(form.meals)
    if (!meals || meals < 1) return setErr('Number of meals must be at least 1')
    if (!form.availableUntil) return setErr('Please set available until time')
    if (new Date(form.availableUntil).getTime() <= Date.now()) return setErr('Available until must be in the future')
    if (!form.pickupLocation.trim()) return setErr('Pickup location is required')
    const lat = parseFloat(form.lat), lng = parseFloat(form.lng)
    if (isNaN(lat) || isNaN(lng)) return setErr('Invalid coordinates')

    mockStore.createDonation({
      restaurantId: user.id,
      restaurantName: user.name,
      foodType: form.foodType,
      meals,
      availableUntil: new Date(form.availableUntil).toISOString(),
      pickupLocation: form.pickupLocation.trim(),
      description: form.description.trim(),
      lat, lng,
    })
    pushToast('Your food is now in the loop. ♻')
    nav('/restaurant/dashboard')
  }

  // default availableUntil to +3h rounded
  const defaultUntil = () => {
    const d = new Date(Date.now() + 3 * 60 * 60 * 1000)
    d.setMinutes(0, 0, 0)
    return d.toISOString().slice(0, 16)
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 pt-8 pb-12">
        <button onClick={() => nav(-1)} className="text-sm font-semibold text-stone-500 hover:text-stone-800">← Back to dashboard</button>
        <div className="mt-4 bg-white rounded-[24px] border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white grid place-items-center font-bold text-xl">+</div>
            <div>
              <h1 className="text-[24px] font-black tracking-tight text-stone-900 leading-none">Add Available Food</h1>
              <p className="text-sm text-stone-500">Share surplus with your community — takes 30 seconds</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">FOOD TYPE</label>
                <select value={form.foodType} onChange={e=>setForm({...form, foodType:e.target.value as typeof form.foodType})} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]">
                  {FOOD_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">NUMBER OF MEALS</label>
                <input type="number" min={1} value={form.meals} onChange={e=>setForm({...form, meals:e.target.value})} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">AVAILABLE UNTIL</label>
              <input type="datetime-local" value={form.availableUntil || defaultUntil()} onChange={e=>setForm({...form, availableUntil:e.target.value})} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">PICKUP LOCATION</label>
              <input value={form.pickupLocation} onChange={e=>setForm({...form, pickupLocation:e.target.value})} placeholder="Thamel, Kathmandu - near Garden of Dreams" className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">LAT</label>
                <input value={form.lat} onChange={e=>setForm({...form, lat:e.target.value})} className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">LNG</label>
                <input value={form.lng} onChange={e=>setForm({...form, lng:e.target.value})} className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">OPTIONAL DESCRIPTION</label>
              <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={3} placeholder="Fresh dal bhat, still warm. Vegetarian. Best for 3-4 hours." className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>

            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{err}</div>}

            <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold py-4 rounded-full shadow transition text-[16px]">Share food → Your food is now in the loop.</button>
            <p className="text-center text-xs text-stone-400">It will appear instantly on the FoodLoop map for nearby beneficiaries</p>
          </form>
        </div>
      </div>
    </div>
  )
}
