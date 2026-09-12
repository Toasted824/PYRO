import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAuth } from '../../lib/auth'
import { deleteDonation, updateDonationStatus } from '../../lib/store'
import { useDonations } from '../../hooks/useDonations'
import { Header } from '../../components/layout/Header'
import { StatusStepper } from '../../components/ui/StatusStepper'
import { pushToast } from '../../components/ui/Toast'
import type { Donation } from '../../lib/types'

function timeLeft(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 'Expired'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (h > 0) return `${h}h ${m}m left`
  return `${m}m left`
}

export function RestaurantDashboard() {
  const { user, configured } = useAuth()
  const nav = useNavigate()
  const { donations, loading, error, reload } = useDonations()
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) nav('/login?role=restaurant')
    else if (user.role !== 'restaurant') nav('/beneficiary/dashboard')
  }, [user, nav])

  if (!user) return null

  const myDonations = donations.filter(d => d.restaurantId === user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const mealsShared = myDonations
    .filter(d => d.status === 'DELIVERED' || d.status === 'PICKUP' || d.status === 'CLAIMED')
    .reduce((a, b) => a + b.meals, 0)

  const advance = async (d: Donation) => {
    const order: Donation['status'][] = ['AVAILABLE', 'CLAIMED', 'PICKUP', 'DELIVERED']
    const idx = order.indexOf(d.status)
    if (idx >= order.length - 1) return
    try {
      await updateDonationStatus(d.id, order[idx + 1])
      pushToast(`Moved to ${order[idx + 1]}`)
      reload()
    } catch (e: unknown) {
      pushToast(e instanceof Error ? e.message : 'Update failed', 'info')
    }
  }

  const remove = async (d: Donation) => {
    if (confirmingId !== d.id) {
      setConfirmingId(d.id)
      return
    }
    try {
      await deleteDonation(d.id)
      pushToast('Listing removed')
      reload()
    } catch (e: unknown) {
      pushToast(e instanceof Error ? e.message : 'Delete failed', 'info')
    } finally {
      setConfirmingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }} className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-display font-bold tracking-tight text-stone-900">Restaurant Dashboard</h1>
            <p className="text-sm text-stone-600">Welcome, <span className="font-semibold text-stone-900">{user.name}</span> · {user.location} · Track your loop</p>
          </div>
          <Link to="/restaurant/new" className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-dark text-white font-semibold px-6 py-3 rounded-full shadow-[0_6px_16px_rgba(22,163,74,0.20)] hover:shadow-[0_8px_20px_rgba(22,163,74,0.26)] hover:-translate-y-[1px] active:translate-y-0 transition-all">
            Add available food
          </Link>
        </motion.div>

        {!configured && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900">
            <div className="font-bold">Supabase not connected</div>
            <div className="mt-1">Add your project credentials to <code className="bg-white border border-amber-200 rounded px-1.5 py-0.5 text-xs">.env</code> (see README) to start sharing real food.</div>
          </div>
        )}
        {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-xl">{error}</div>}

        {/* decluttered stats — 3 with leaf accent, less noise than 4 */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Active', value: myDonations.filter(d=>d.status==='AVAILABLE').length, hint: 'on map now' },
            { label: 'Claimed', value: myDonations.filter(d=>d.status==='CLAIMED').length, hint: 'awaiting pickup' },
            { label: 'Meals shared', value: mealsShared, hint: 'claimed/pickup/delivered' },
          ].map((s, i)=> (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06*i, duration: 0.4 }} className="bg-white rounded-2xl border border-stone-200 p-4 pt-3.5 relative overflow-hidden hover:shadow-sm hover:-translate-y-[1px] transition-all">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-leaf" aria-hidden="true" />
              <div className="text-[11px] font-semibold tracking-widest text-stone-400">{s.label.toUpperCase()}</div>
              <div className="mt-1 text-[26px] font-bold text-stone-900 leading-none">{s.value}</div>
              <div className="text-xs text-stone-500 mt-1">{s.hint}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.35fr_0.75fr] gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900">Your donations</h2>
              <span className="text-xs bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full font-medium text-stone-600">{myDonations.length} total</span>
            </div>
            {loading && myDonations.length === 0 ? (
              <div className="mt-6 text-center py-10 text-sm text-stone-500">Loading donations…</div>
            ) : myDonations.length === 0 ? (
              <div className="mt-6 text-center py-12 bg-[#FFFBEB]/50 rounded-2xl border border-dashed border-stone-200">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 grid place-items-center mx-auto text-stone-400">＋</div>
                <div className="mt-3 font-semibold text-stone-900">No donations yet</div>
                <div className="text-sm text-stone-500">Add your first listing — takes about a minute</div>
                <Link to="/restaurant/new" className="mt-4 inline-flex bg-leaf text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-leaf-dark transition-colors">Add available food</Link>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {myDonations.map(d=> (
                  <motion.div key={d.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-stone-200 p-4 bg-white hover:border-stone-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-semibold tracking-widest px-2.5 py-1 rounded-full border ${d.status==='AVAILABLE'?'bg-[#F0FDF4] border-green-200 text-leaf': d.status==='CLAIMED'?'bg-amber-50 border-amber-200 text-amber-700':'bg-sky-50 border-sky-200 text-sky-700'}`}>{d.status}</span>
                          <span className="text-xs text-stone-500">{timeLeft(d.availableUntil)} · {d.meals} meals</span>
                        </div>
                        <div className="mt-1.5 font-semibold text-stone-900">{d.foodType} · {d.meals} meals</div>
                        <div className="text-sm text-stone-600 truncate">{d.pickupLocation} · Until {new Date(d.availableUntil).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                        {d.description && <div className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{d.description}</div>}
                        {d.claimedByName && <div className="mt-2 inline-flex bg-[#FFFBEB] border border-stone-200 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full">Claimed by {d.claimedByName}</div>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {d.status==='AVAILABLE' && (
                          <button onClick={()=>{setConfirmingId(null); advance(d)}} className="text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors bg-stone-900 text-white hover:bg-black border-stone-900">Mark claimed</button>
                        )}
                        {d.status!=='AVAILABLE' && (
                          <button onClick={()=>advance(d)} disabled={d.status==='DELIVERED'} className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${d.status==='DELIVERED'?'bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed':'bg-stone-900 text-white hover:bg-black border-stone-900'}`}>{d.status==='CLAIMED'?'Move to pickup':d.status==='PICKUP'?'Mark delivered':'Completed'}</button>
                        )}
                        {d.status==='AVAILABLE' && (
                          <button onClick={()=>remove(d)} className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors ${confirmingId===d.id?'bg-red-600 text-white border-red-600':'bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'}`}>{confirmingId===d.id?'Confirm?':'Delete'}</button>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 bg-[#FCFCF9] rounded-xl border border-stone-200 p-3">
                      <StatusStepper status={d.status} />
                      {d.status==='CLAIMED' && <div className="mt-2.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">Claimed — prepare for pickup during the stated window.</div>}
                      {d.status==='DELIVERED' && <div className="mt-2.5 text-xs font-medium text-leaf bg-[#F0FDF4] border border-green-200 rounded-xl px-3 py-2">Delivered — thank you for completing the loop.</div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="bg-stone-900 rounded-2xl p-6 text-white">
              <div className="text-[11px] font-semibold tracking-widest text-white/50">HOW STATUS WORKS</div>
              <div className="mt-2 text-sm leading-relaxed text-white/80">When a kitchen claims your food, you’ll see <em className="text-white not-italic">Claimed</em>. Move it to Pickup then Delivered so both sides have a clear record.</div>
              <div className="mt-4 bg-white/[0.08] rounded-xl p-3 border border-white/10">
                <div className="text-sm font-medium">Tip</div>
                <div className="text-xs opacity-60 leading-relaxed mt-1">Add listings via “Add Available Food” — they appear live on the beneficiary map via Supabase realtime.</div>
              </div>
            </motion.div>

            <details className="group bg-white rounded-2xl border border-stone-200">
              <summary className="list-none flex items-center justify-between p-5 cursor-pointer">
                <h3 className="font-semibold text-stone-900 text-sm">Status guide</h3>
                <span className="w-7 h-7 rounded-full bg-stone-100 grid place-items-center text-stone-500 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 -mt-1 space-y-2.5 text-sm border-t border-stone-100 pt-4">
                {[
                  { k: 'AVAILABLE', d: 'Visible on the map for nearby kitchens' },
                  { k: 'CLAIMED', d: 'A kitchen requested it — prepare for pickup' },
                  { k: 'PICKUP', d: 'Kitchen is collecting' },
                  { k: 'DELIVERED', d: 'Loop completed' },
                ].map(s=> (
                  <div key={s.k} className="flex gap-3">
                    <span className="shrink-0 text-[11px] font-semibold tracking-widest bg-stone-900 text-white px-2 py-1 rounded-full h-fit">{s.k}</span>
                    <span className="text-stone-600 leading-relaxed text-sm">{s.d}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
