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
import { distanceFromCenter } from '../../lib/distance'
import type { Donation } from '../../lib/types'

function fmtUntil(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })
}
function kmAway(d: Donation) {
  return distanceFromCenter(d.lat, d.lng).toFixed(1)
}

export function BeneficiaryProfile() {
  const { user, configured, initializing } = useAuth()
  const nav = useNavigate()
  const { donations, loading, error } = useDonations()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!initializing && !user) nav('/login?role=beneficiary')
    else if (user && user.role !== 'beneficiary') nav('/restaurant/profile')
  }, [user, initializing, nav])

  const myClaimed = useMemo(() => {
    if (!user) return []
    return donations.filter(d => d.claimedBy === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [donations, user])

  const stats = useMemo(() => {
    const total = myClaimed.length
    const mealsRescued = myClaimed.reduce((a, b) => a + b.meals, 0)
    const pickedUp = myClaimed.filter(d => d.status === 'PICKED_UP').length
    const claimed = myClaimed.filter(d => d.status === 'CLAIMED').length
    const mealsPickedUp = myClaimed.filter(d => d.status === 'PICKED_UP').reduce((a, b) => a + b.meals, 0)
    const restaurantsSupported = new Set(myClaimed.map(d => d.restaurantId)).size
    return { total, mealsRescued, pickedUp, claimed, mealsPickedUp, restaurantsSupported }
  }, [myClaimed])

  const selected = donations.find(d => d.id === selectedId) || null

  if (initializing) return <div className="min-h-screen bg-[#FFFBEB] grid place-items-center text-sm text-stone-500">Loading…</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <SEO title={`${user.name} — Beneficiary Profile`} description="View your claimed meals, history and claimed locations on FoodLoop." canonicalPath="/beneficiary/profile" noIndex />
      <Header />
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 pt-4 pb-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Profile' }]} />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-display font-bold tracking-tight text-stone-900">Profile</h1>
            <p className="text-sm text-stone-600">Your beneficiary account — claims, meals and history.</p>
          </div>
          <Link to="/beneficiary/dashboard" className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-dark text-white font-semibold px-6 py-3 rounded-full shadow-sm transition-all">Find food nearby</Link>
        </motion.div>

        {/* Identity card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.4 }} className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 relative overflow-hidden">
          <div aria-hidden="true" className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#F0FDF4] border border-green-100" />
          <div className="relative flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 grid place-items-center text-[20px] font-black text-sky-700 shrink-0">{user.name.charAt(0).toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[20px] font-bold text-stone-900 tracking-tight">{user.name}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">📍 {user.location || 'Kathmandu Valley'}</span>
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">✉️ {user.email}</span>
                <span className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full text-stone-700">📞 {user.contact || '—'}</span>
              </div>
              {myClaimed[0] && <div className="mt-2 text-xs text-stone-500">Last claim: {fmtDate(myClaimed[0].createdAt)} · {myClaimed[0].restaurantName}</div>}
            </div>
            <Link to="/beneficiary/dashboard" className="hidden sm:inline-flex text-xs font-semibold bg-stone-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
          </div>
        </motion.div>

        {!configured && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900">
            <span className="font-bold">Supabase not connected.</span> Add credentials to .env to see real data.
          </div>
        )}
        {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{error}</div>}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total claims', value: stats.total, hint: 'meals you claimed' },
            { label: 'Meals rescued', value: stats.mealsRescued, hint: 'all statuses' },
            { label: 'Picked up', value: stats.pickedUp, hint: `${stats.mealsPickedUp} meals completed` },
            { label: 'Restaurants supported', value: stats.restaurantsSupported, hint: 'unique donors' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }} className="bg-white rounded-2xl border border-stone-200 p-4 pt-3.5 relative overflow-hidden hover:shadow-sm hover:-translate-y-[1px] transition-all">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-leaf" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-widest text-stone-400">{s.label.toUpperCase()}</div>
              <div className="mt-1 text-[26px] font-bold text-stone-900 leading-none">{s.value}</div>
              <div className="text-xs text-stone-500 mt-1">{s.hint}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <div className="bg-white rounded-xl border border-stone-200 p-4 text-center flex flex-col items-center justify-center min-h-[72px]"><div className="font-bold text-stone-900 text-[16px] leading-none">{stats.claimed}</div><div className="text-stone-500 mt-1">Claimed</div></div>
          <div className="bg-[#F0FDF4] rounded-xl border border-green-200 p-4 text-center flex flex-col items-center justify-center min-h-[72px]"><div className="font-bold text-leaf text-[16px] leading-none">{stats.pickedUp}</div><div className="text-stone-500 mt-1">Picked up</div></div>
          <div className="bg-white rounded-xl border border-stone-200 p-4 text-center flex flex-col items-center justify-center min-h-[72px]"><div className="font-bold text-stone-900 text-[16px] leading-none">{stats.total}</div><div className="text-stone-500 mt-1">Total</div></div>
        </div>

        {/* History + Map */}
        <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900">Claim history</h2>
              <span className="text-xs bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full">{myClaimed.length} total</span>
            </div>
            {loading && myClaimed.length === 0 ? (
              <div className="mt-6 text-center py-10 text-sm text-stone-500">Loading history…</div>
            ) : myClaimed.length === 0 ? (
              <div className="mt-6 text-center py-12 bg-[#FFFBEB]/50 rounded-2xl border border-dashed border-stone-200">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 grid place-items-center mx-auto text-stone-400">◎</div>
                <div className="mt-3 font-semibold text-stone-900">No claims yet</div>
                <div className="text-sm text-stone-500">Browse available food to make your first claim</div>
                <Link to="/beneficiary/dashboard" className="mt-4 inline-flex bg-leaf text-white font-semibold px-6 py-2.5 rounded-full text-sm">Find food nearby</Link>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <LayoutGroup>
                  <div className="space-y-3">
                    {myClaimed.map(d => (
                      <motion.div
                        key={d.id}
                        layout
                        onClick={() => setSelectedId(d.id)}
                        className={`rounded-2xl border p-4 cursor-pointer transition-all ${selectedId === d.id ? 'bg-white border-leaf shadow ring-1 ring-leaf/20' : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${d.status === 'CLAIMED' ? 'bg-amber-500' : 'bg-leaf'}`} />
                          <span className="text-[11px] font-semibold tracking-widest text-stone-500">{d.status.replace('_',' ')}</span>
                          <span className="ml-auto text-xs text-stone-400">{kmAway(d)} km away · {fmtDate(d.createdAt)}</span>
                        </div>
                        <div className="mt-1.5 font-semibold text-stone-900">{d.restaurantName} <span className="font-normal text-stone-500">· {d.foodType}</span></div>
                        <div className="text-sm text-stone-600">{d.meals} meals · Pickup by {fmtUntil(d.availableUntil)} · {d.pickupLocation}</div>
                        {d.description && <div className="text-xs text-stone-500 mt-1 line-clamp-2">{d.description}</div>}
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
                <div className="text-xs font-semibold tracking-widest text-stone-500">CLAIMED MAP</div>
                <span className="text-xs bg-[#F0FDF4] border border-green-200 text-leaf px-2 py-1 rounded-full font-medium">{myClaimed.length} pinned</span>
              </div>
              <div className="h-[360px]">
                <TeammateMap donations={myClaimed} onMarkerClick={setSelectedId} selectedId={selectedId} />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="bg-white rounded-2xl border border-stone-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest text-stone-400">SELECTED</div>
                      <div className="font-semibold text-stone-900">{selected.restaurantName} · {selected.foodType}</div>
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
