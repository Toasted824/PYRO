import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { useAuth } from '../../lib/auth'
import { useDonations } from '../../hooks/useDonations'
import { Header } from '../../components/layout/Header'
import { TeammateMap } from '../../components/map/TeammateMap'
import { StatusStepper } from '../../components/ui/StatusStepper'
import { SEO } from '../../components/SEO'
import { Breadcrumbs } from '../../components/layout/Breadcrumbs'

function fmtUntil(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })
}

export function RestaurantProfile() {
  const { user, configured, initializing } = useAuth()
  const nav = useNavigate()
  const { donations, loading, error } = useDonations()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!initializing && !user) nav('/login?role=restaurant')
    else if (user && user.role !== 'restaurant') nav('/beneficiary/profile')
  }, [user, initializing, nav])

  const myDonations = useMemo(() => {
    if (!user) return []
    return donations.filter(d => d.restaurantId === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [donations, user])

  const stats = useMemo(() => {
    const total = myDonations.length
    const active = myDonations.filter(d => d.status === 'AVAILABLE').length
    const claimed = myDonations.filter(d => d.status === 'CLAIMED').length
    const pickup = myDonations.filter(d => d.status === 'PICKUP').length
    const delivered = myDonations.filter(d => d.status === 'DELIVERED').length
    const mealsListed = myDonations.reduce((a, b) => a + b.meals, 0)
    const mealsShared = myDonations.filter(d => ['CLAIMED', 'PICKUP', 'DELIVERED'].includes(d.status)).reduce((a, b) => a + b.meals, 0)
    return { total, active, claimed, pickup, delivered, mealsListed, mealsShared }
  }, [myDonations])

  const selected = myDonations.find(d => d.id === selectedId) || null

  if (initializing) return <div className="min-h-screen bg-[#FFFBEB] grid place-items-center text-sm text-stone-500">Loading…</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <SEO title={`${user.name} — Restaurant Profile`} description="Your restaurant profile — donations, meals listed and donation locations on FoodLoop." canonicalPath="/restaurant/profile" noIndex />
      <Header />
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 pt-4 pb-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Profile' }]} />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-display font-bold tracking-tight text-stone-900">Profile</h1>
            <p className="text-sm text-stone-600">Your restaurant account — donations, meals and locations.</p>
          </div>
          <Link to="/restaurant/dashboard" className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-dark text-white font-semibold px-6 py-3 rounded-full shadow-sm">Go to dashboard</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.4 }} className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 relative overflow-hidden">
          <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#FFF7ED] border border-amber-100" />
          <div className="relative flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#16A34A] text-white grid place-items-center text-[20px] font-black shrink-0">{user.name.charAt(0).toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[20px] font-bold text-stone-900 tracking-tight">{user.name}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">📍 {user.location || 'Kathmandu Valley'}</span>
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">✉️ {user.email}</span>
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">📞 {user.contact || '—'}</span>
              </div>
              {myDonations[0] && <div className="mt-2 text-xs text-stone-500">Latest donation: {fmtDate(myDonations[0].createdAt)} · {myDonations[0].foodType} · {myDonations[0].meals} meals</div>}
            </div>
            <Link to="/restaurant/new" className="hidden sm:inline-flex text-xs font-semibold bg-stone-900 text-white px-4 py-2 rounded-full">Add food</Link>
          </div>
        </motion.div>

        {!configured && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900">
            <span className="font-bold">Supabase not connected.</span> Add credentials to .env to see real data.
          </div>
        )}
        {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{error}</div>}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total donations', value: stats.total, hint: 'all time' },
            { label: 'Active', value: stats.active, hint: 'on map now' },
            { label: 'Meals listed', value: stats.mealsListed, hint: 'all donations' },
            { label: 'Meals shared', value: stats.mealsShared, hint: 'claimed+pickup+delivered' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }} className="bg-white rounded-2xl border border-stone-200 p-4 pt-3.5 relative overflow-hidden hover:shadow-sm hover:-translate-y-[1px] transition-all">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-leaf" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-widest text-stone-400">{s.label.toUpperCase()}</div>
              <div className="mt-1 text-[26px] font-bold text-stone-900 leading-none">{s.value}</div>
              <div className="text-xs text-stone-500 mt-1">{s.hint}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><div className="font-bold text-leaf">{stats.active}</div><div className="text-stone-500">Available</div></div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-3 text-center"><div className="font-bold text-amber-700">{stats.claimed}</div><div className="text-stone-500">Claimed</div></div>
          <div className="bg-sky-50 rounded-xl border border-sky-200 p-3 text-center"><div className="font-bold text-sky-700">{stats.pickup}</div><div className="text-stone-500">Pickup</div></div>
          <div className="bg-[#F0FDF4] rounded-xl border border-green-200 p-3 text-center"><div className="font-bold text-leaf">{stats.delivered}</div><div className="text-stone-500">Delivered</div></div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900">Donation history</h2>
              <span className="text-xs bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full">{myDonations.length} total</span>
            </div>
            {loading && myDonations.length === 0 ? (
              <div className="mt-6 text-center py-10 text-sm text-stone-500">Loading history…</div>
            ) : myDonations.length === 0 ? (
              <div className="mt-6 text-center py-12 bg-[#FFFBEB]/50 rounded-2xl border border-dashed border-stone-200">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 grid place-items-center mx-auto text-stone-400">＋</div>
                <div className="mt-3 font-semibold text-stone-900">No donations yet</div>
                <div className="text-sm text-stone-500">Add your first listing to see it here</div>
                <Link to="/restaurant/new" className="mt-4 inline-flex bg-leaf text-white font-semibold px-6 py-2.5 rounded-full text-sm">Add available food</Link>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <LayoutGroup>
                  <div className="space-y-3">
                    {myDonations.map(d => (
                      <motion.div key={d.id} layout onClick={() => setSelectedId(d.id)} className={`rounded-2xl border p-4 cursor-pointer transition-all ${selectedId === d.id ? 'bg-white border-leaf shadow ring-1 ring-leaf/20' : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${d.status === 'AVAILABLE' ? 'bg-leaf' : d.status === 'CLAIMED' ? 'bg-amber-500' : d.status === 'PICKUP' ? 'bg-sky-500' : 'bg-stone-400'}`} />
                          <span className="text-[11px] font-semibold tracking-widest text-stone-500">{d.status}</span>
                          <span className="ml-auto text-xs text-stone-400">{fmtDate(d.createdAt)} · {d.meals} meals</span>
                        </div>
                        <div className="mt-1.5 font-semibold text-stone-900">{d.foodType} · {d.meals} meals</div>
                        <div className="text-xs text-stone-500">{d.pickupLocation} · Pickup by {fmtUntil(d.availableUntil)}</div>
                        {d.description && <div className="text-xs text-stone-500 mt-1 line-clamp-2">{d.description}</div>}
                        {d.claimedByName && <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 inline-flex">Claimed by {d.claimedByName}</div>}
                        <div className="mt-3 bg-[#FCFCF9] rounded-xl border border-stone-200 p-2.5">
                          <StatusStepper status={d.status} compact />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </LayoutGroup>
              </div>
            )}
          </motion.div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="p-3 border-b border-stone-200 flex items-center justify-between">
                <div className="text-xs font-semibold tracking-widest text-stone-500">DONATIONS MAP</div>
                <span className="text-xs bg-[#F0FDF4] border border-green-200 text-leaf px-2 py-1 rounded-full font-medium">{myDonations.length} pinned</span>
              </div>
              <div className="h-[360px]">
                <TeammateMap donations={myDonations} onMarkerClick={setSelectedId} selectedId={selectedId} />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="bg-white rounded-2xl border border-stone-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest text-stone-400">SELECTED</div>
                      <div className="font-semibold text-stone-900">{selected.foodType} · {selected.meals} meals</div>
                      <div className="text-xs text-stone-500">{selected.pickupLocation} · {fmtUntil(selected.availableUntil)}</div>
                    </div>
                    <button onClick={() => setSelectedId(null)} className="w-7 h-7 rounded-full bg-stone-100 grid place-items-center text-stone-600">×</button>
                  </div>
                  <div className="mt-3"><StatusStepper status={selected.status} /></div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer" className="mt-3 block text-center text-sm font-medium bg-stone-900 text-white py-2.5 rounded-full hover:bg-black">Directions</a>
                </motion.div>
              ) : (
                <div className="bg-[#FFFBEB]/50 rounded-2xl border border-dashed border-stone-200 p-4 text-center text-sm text-stone-500">Select a history card or map pin</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
