import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { createDonation } from '../../lib/store'
import { FOOD_TYPES, FOOD_TYPE_DEFAULT_PERISHABILITY, type Perishability } from '../../lib/types'
import { Header } from '../../components/layout/Header'
import { LocationPicker, type LocationValue } from '../../components/map/LocationPicker'
import { pushToast } from '../../components/ui/Toast'

export function CreateDonation() {
  const { user, initializing, configured } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ foodType: FOOD_TYPES[0], meals: '10', availableUntil: '', description: '' })
  const [perishability, setPerishability] = useState<Perishability>(FOOD_TYPE_DEFAULT_PERISHABILITY[FOOD_TYPES[0]] ?? 'perishable')
  const [location, setLocation] = useState<LocationValue>({ lat: null, lng: null, label: '' })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const defaultUntil = useMemo(() => {
    const d = new Date(Date.now() + 3 * 60 * 60 * 1000)
    d.setMinutes(0, 0, 0)
    return d.toISOString().slice(0, 16)
  }, [])

  const maxUntil = useMemo(() => {
    if (perishability !== 'perishable') return undefined
    const d = new Date(Date.now() + 12 * 60 * 60 * 1000)
    return d.toISOString().slice(0, 16)
  }, [perishability])

  const handleFoodTypeChange = (v: string) => {
    setForm(s => ({ ...s, foodType: v as typeof s.foodType }))
    const guessed = FOOD_TYPE_DEFAULT_PERISHABILITY[v]
    if (guessed) setPerishability(guessed)
  }

  useEffect(() => {
    if (initializing) return
    if (!user || user.role !== 'restaurant') nav('/')
  }, [user, initializing, nav])

  if (initializing || !user || user.role !== 'restaurant') return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const meals = parseInt(form.meals)
    if (!meals || meals < 1) return setErr('Number of meals must be at least 1')
    if (!form.availableUntil) return setErr('Please set available until time')
    if (new Date(form.availableUntil).getTime() <= Date.now()) return setErr('Available until must be in the future')
    if (perishability === 'perishable') {
      const max = Date.now() + 12 * 60 * 60 * 1000
      if (new Date(form.availableUntil).getTime() > max) return setErr('Perishable food cannot be available for more than 12 hours — please choose an earlier pickup time or mark as non-perishable')
    }
    if (!location.label.trim()) return setErr('Pickup location is required — search a landmark or use current location')
    if (location.lat == null || location.lng == null) return setErr('Please pick a location on the map or choose a search result')
    setSubmitting(true)
    try {
      await createDonation({
        restaurantId: user.id,
        restaurantName: user.name,
        foodType: form.foodType,
        perishability,
        meals,
        availableUntil: new Date(form.availableUntil).toISOString(),
        pickupLocation: location.label.trim(),
        description: form.description.trim(),
        lat: location.lat,
        lng: location.lng,
      })
      pushToast('Your food is now in the loop. ♻')
      nav('/restaurant/dashboard')
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Could not create donation')
    } finally {
      setSubmitting(false)
    }
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

          {!configured && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900">
              <span className="font-bold">Supabase not connected.</span> Add your project credentials to .env (see README) to share food.
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">FOOD TYPE</label>
                <select value={form.foodType} onChange={e => handleFoodTypeChange(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]">
                  {FOOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <p className="mt-1 text-[11px] text-stone-400">Auto-guesses perishability — toggle below to override.</p>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-stone-500">PERISHABILITY</label>
                <div className="mt-1 flex items-center p-1 rounded-full bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setPerishability('perishable')}
                    className={`flex-1 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${perishability==='perishable' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    Perishable
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerishability('non_perishable')}
                    className={`flex-1 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${perishability==='non_perishable' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    Non-perishable
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-stone-500">{perishability==='perishable' ? 'Must be picked up within 12 hours.' : 'No time limit — shelf-stable.'}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">NUMBER OF MEALS</label>
              <input type="number" min={1} value={form.meals} onChange={e => setForm({ ...form, meals: e.target.value })} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">AVAILABLE UNTIL</label>
              <input type="datetime-local" value={form.availableUntil || defaultUntil} onChange={e => setForm({ ...form, availableUntil: e.target.value })} max={maxUntil} className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
              {perishability==='perishable' ? (
                <p className="mt-1 text-[11px] text-amber-700">Perishable foods cannot be available for more than 12 hours from now.</p>
              ) : (
                <p className="mt-1 text-[11px] text-stone-400">Non-perishable — no date limit.</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">PICKUP LOCATION</label>
              <p className="text-xs text-stone-500 mt-1 mb-2">Search a landmark or use your current location — no coordinates needed.</p>
              <LocationPicker value={location} onChange={setLocation} />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-stone-500">OPTIONAL DESCRIPTION</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Fresh dal bhat, still warm. Vegetarian. Best for 3-4 hours." className="mt-1 w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]" />
            </div>

            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{err}</div>}

            <button type="submit" disabled={submitting || !configured} className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-full shadow transition text-[16px]">{submitting ? 'Sharing…' : 'Share food → Your food is now in the loop.'}</button>
            <p className="text-center text-xs text-stone-400">It will appear instantly on the FoodLoop map for nearby beneficiaries</p>
          </form>
        </div>
      </div>
    </div>
  )
}
