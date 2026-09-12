import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { useAuth } from '../../lib/auth'
import { claimDonation } from '../../lib/store'
import { useDonations } from '../../hooks/useDonations'
import { Header } from '../../components/layout/Header'
import { TeammateMap } from '../../components/map/TeammateMap'
import { StatusStepper } from '../../components/ui/StatusStepper'
import { SEO } from '../../components/SEO'
import { pushToast } from '../../components/ui/Toast'
import { distanceFromCenter } from '../../lib/distance'
import type { Donation } from '../../lib/types'

function fmtUntil(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function kmAway(d: Donation) {
  return distanceFromCenter(d.lat, d.lng).toFixed(1)
}

export function BeneficiaryDashboard({ publicMode }: { publicMode?: boolean }) {
  const { user, configured } = useAuth()
  const { donations, loading, error, reload } = useDonations()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'available' | 'claimed'>('available')
  const [claiming, setClaiming] = useState(false)

  const available = useMemo(() => {
    let list = donations.filter(d => d.status === 'AVAILABLE')
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(d => d.foodType.toLowerCase().includes(q) || d.restaurantName.toLowerCase().includes(q) || d.pickupLocation.toLowerCase().includes(q))
    }
    return list.sort((a,b)=> distanceFromCenter(a.lat,a.lng) - distanceFromCenter(b.lat,b.lng))
  }, [donations, search])

  const myClaimed = useMemo(() => {
    if (!user) return []
    return donations.filter(d => d.claimedBy === user.id).sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [donations, user])

  const selected = donations.find(d=> d.id === selectedId) || null
  const list = tab === 'claimed' ? myClaimed : available

  const claim = async (d: Donation) => {
    if (publicMode) {
      pushToast('Please log in as Beneficiary to claim food', 'info')
      return
    }
    if (!user) { pushToast('Please log in as Beneficiary', 'info'); return }
    if (user.role !== 'beneficiary') { pushToast('Only beneficiaries can claim food', 'info'); return }
    setClaiming(true)
    try {
      await claimDonation(d.id, user)
      pushToast('Food claimed successfully. 🎉')
      reload()
      setSelectedId(d.id)
      setTab('claimed')
    } catch (e: unknown) {
      pushToast(e instanceof Error ? e.message : 'Claim failed', 'info')
    } finally {
      setClaiming(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <SEO
        title={publicMode ? 'Browse available food — FoodLoop Kathmandu' : 'Find food nearby — FoodLoop Beneficiary'}
        description="Browse surplus food listings on a map in Kathmandu Valley, sorted by distance. Verified community kitchens can claim food for same day pickup."
        canonicalPath={publicMode ? '/explore' : '/beneficiary/dashboard'}
        noIndex={Boolean(publicMode && !user) ? false : !publicMode ? true : true}
      />
      <Header />
      {/* single sub-header: title + search — decluttered */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[52px] flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <h1 className="font-semibold text-stone-900 text-sm tracking-tight">{publicMode ? 'Explore' : 'Find food'}</h1>
            <span className="hidden sm:inline-flex text-[11px] font-semibold tracking-widest bg-[#F0FDF4] border border-green-200 text-leaf px-2 py-0.5 rounded-full">
              {tab === 'claimed' ? `${myClaimed.length} claimed` : `${available.length} nearby`}
            </span>
            <span className="hidden md:inline text-xs text-stone-400">· Kathmandu Valley · sorted by distance</span>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2 max-w-[520px] ml-auto">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm" aria-hidden="true">⌕</span>
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search food, restaurant, area…"
                className="w-full rounded-full border border-stone-200 bg-stone-50 pl-8 pr-3 py-2 text-sm focus:outline-none focus:bg-white focus:border-stone-300 focus:ring-2 focus:ring-leaf/15 transition-all"
              />
            </div>
            {!publicMode && user && (
              <div className="hidden sm:flex items-center p-0.5 rounded-full bg-stone-100 border border-stone-200">
                <button
                  onClick={() => setTab('available')}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${tab==='available' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Available
                </button>
                <button
                  onClick={() => setTab('claimed')}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${tab==='claimed' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Claimed{myClaimed.length ? ` · ${myClaimed.length}` : ''}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row min-h-0 lg:min-h-[calc(100vh-116px)]">
        {/* LEFT — list */}
        <div className="w-full lg:w-[380px] xl:w-[400px] border-r border-stone-200 bg-white flex flex-col lg:h-[calc(100vh-116px)] lg:overflow-hidden">
          <div className="p-3 border-b border-stone-200 bg-[#FFFBEB]/40 flex items-center justify-between">
            <div className="text-xs font-semibold tracking-widest text-stone-500">{tab === 'claimed' ? 'MY CLAIMED' : 'AVAILABLE FOOD'}</div>
            <span className="text-xs text-stone-400 hidden sm:inline">Tap card or marker</span>
          </div>

          <div className="flex-1 overflow-auto p-3 bg-[#FCFCF9]">
            {/* mobile claimed toggle */}
            {!publicMode && user && (
              <div className="sm:hidden flex gap-2 mb-3">
                <button onClick={() => setTab('available')} className={`flex-1 text-xs font-medium py-2 rounded-full border ${tab==='available' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200'}`}>Available ({available.length})</button>
                <button onClick={() => setTab('claimed')} className={`flex-1 text-xs font-medium py-2 rounded-full border ${tab==='claimed' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200'}`}>Claimed ({myClaimed.length})</button>
              </div>
            )}

            {!configured && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 mb-3">
                <span className="font-bold">Supabase not connected.</span> Add your project credentials to .env (see README).
              </div>
            )}
            {error && !loading && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl mb-3">{error}</div>}
            {loading && donations.length === 0 && <div className="text-center py-8 text-sm text-stone-500">Loading available food…</div>}

            {!loading && list.length === 0 && !error ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-stone-200">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] border border-stone-200 grid place-items-center mx-auto text-stone-400">∅</div>
                <div className="mt-3 font-medium text-stone-900">{tab==='claimed' ? 'No claimed donations yet' : 'No matches'}</div>
                <div className="text-sm text-stone-500 mt-1">{tab==='claimed' ? 'Claimed food will appear here with pickup status.' : 'Try a different search or check back soon'}</div>
              </motion.div>
            ) : (
              <LayoutGroup>
                <div className="space-y-2.5">
                  {list.map(d=> (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      onClick={()=>setSelectedId(d.id)}
                      className={`group rounded-2xl border p-4 cursor-pointer text-left transition-all duration-200 ${selectedId===d.id ? 'bg-white border-leaf shadow-[0_8px_20px_rgba(22,163,74,0.10)] ring-1 ring-leaf/20' : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm hover:-translate-y-[1px]'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${d.status==='AVAILABLE' ? 'bg-leaf' : d.status==='CLAIMED' ? 'bg-amber-500' : 'bg-sky-500'}`} aria-hidden="true" />
                        <span className="text-[11px] font-semibold tracking-widest text-stone-500">{d.status}</span>
                        {tab==='available' && <span className="ml-auto text-xs text-stone-400">{kmAway(d)} km away</span>}
                      </div>
                      <div className="mt-2 font-semibold text-stone-900 leading-tight">{d.restaurantName} <span className="font-normal text-stone-500">· {d.foodType}</span></div>
                      <div className="text-sm text-stone-600">{d.meals} meals · Pickup by {fmtUntil(d.availableUntil)}</div>
                      <div className="text-xs text-stone-500 mt-1 line-clamp-1">{d.pickupLocation}</div>
                      {d.description && <div className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{d.description}</div>}
                      {tab==='claimed' && (
                        <div className="mt-3 bg-[#FFFBEB] rounded-xl border border-stone-200 p-2.5">
                          <StatusStepper status={d.status} compact />
                        </div>
                      )}
                      <button
                        onClick={(e)=>{e.stopPropagation(); setSelectedId(d.id)}}
                        className={`mt-3 w-full font-medium py-2 rounded-full text-sm transition-colors ${selectedId===d.id ? 'bg-leaf text-white' : 'bg-stone-900 text-white group-hover:bg-black'}`}
                      >
                        View details
                      </button>
                    </motion.div>
                  ))}
                </div>
              </LayoutGroup>
            )}
          </div>
        </div>

        {/* RIGHT — donation details on top, map below (never hidden behind map) */}
        <div className="flex-1 min-h-0 p-3 sm:p-4 bg-[#FFFBEB] flex flex-col gap-3 lg:h-[calc(100vh-116px)] lg:overflow-auto">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-stone-400">DONATION DETAILS <span className={`ml-1 px-2 py-0.5 rounded-full border text-[10px] ${selected.status==='AVAILABLE' ? 'bg-[#F0FDF4] border-green-200 text-leaf' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>{selected.status}</span></div>
                    <div className="mt-1 font-semibold text-[17px] text-stone-900 truncate">{selected.restaurantName}</div>
                    <div className="text-sm text-stone-600">{selected.foodType} · {selected.meals} meals · {kmAway(selected)} km away</div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full">{selected.pickupLocation}</span>
                      <span className="bg-[#FFFBEB] border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full">Pickup by {fmtUntil(selected.availableUntil)}</span>
                    </div>
                    {selected.description && <div className="mt-2 text-sm text-stone-600 bg-stone-50 border border-stone-200 rounded-xl p-3 leading-relaxed">{selected.description}</div>}
                    <div className="mt-3">
                      <StatusStepper status={selected.status} />
                    </div>
                  </div>
                  <button onClick={()=>setSelectedId(null)} aria-label="Close details" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 grid place-items-center text-stone-600 shrink-0">×</button>
                </div>
                <div className="mt-4 flex gap-2">
                  {selected.status === 'AVAILABLE' ? (
                    <button onClick={()=>claim(selected)} disabled={claiming} className="flex-1 bg-leaf hover:bg-leaf-dark disabled:bg-stone-300 text-white font-semibold py-3 rounded-full transition-colors">Claim food</button>
                  ) : (
                    <div className="flex-1 bg-stone-50 border border-stone-200 text-stone-700 font-medium py-3 rounded-full text-center text-sm">Claimed by {selected.claimedByName || 'someone'} · {selected.status}</div>
                  )}
                  <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full border border-stone-200 bg-white font-medium text-sm hover:bg-stone-50 grid place-items-center">Directions</a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="h-[360px] sm:h-[420px] lg:h-auto lg:flex-1 min-h-[360px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-[#F7F5EF]">
            <TeammateMap donations={available} onMarkerClick={setSelectedId} selectedId={selectedId} />
          </div>

          {!selected && (
            <div className="hidden lg:flex bg-white rounded-2xl border border-dashed border-stone-300 p-3 text-center text-sm text-stone-500 justify-center">
              Select a card or map marker to claim
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
