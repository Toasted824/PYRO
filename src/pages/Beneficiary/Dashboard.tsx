import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../lib/auth'
import { mockStore } from '../../lib/mockStore'
import { Header } from '../../components/layout/Header'
import { TeammateMap } from '../../components/map/TeammateMap'
import { StatusStepper } from '../../components/ui/StatusStepper'
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
  const { user } = useAuth()
  const [donations, setDonations] = useState<Donation[]>(() => mockStore.getDonations())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showClaimed, setShowClaimed] = useState(false)

  const refresh = () => setDonations([...mockStore.getDonations()])

  useEffect(() => {
    const h = () => refresh()
    window.addEventListener('foodloop:donations', h)
    window.addEventListener('storage', h)
    const iv = setInterval(refresh, 2000)
    return () => { window.removeEventListener('foodloop:donations', h); window.removeEventListener('storage', h); clearInterval(iv) }
  }, [])

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

  const claim = (d: Donation) => {
    if (publicMode) {
      pushToast('Please log in as Beneficiary to claim food', 'info')
      return
    }
    if (!user) { pushToast('Please log in as Beneficiary', 'info'); return }
    if (user.role !== 'beneficiary') { pushToast('Only beneficiaries can claim food', 'info'); return }
    try {
      mockStore.claimDonation(d.id, user.id, user.name)
      pushToast('Food claimed successfully. 🎉')
      refresh()
      setSelectedId(d.id)
    } catch (e: unknown) {
      pushToast(e instanceof Error ? e.message : 'Claim failed', 'info')
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <Header />
      {/* Top bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-black text-stone-900">FoodLoop</span>
            <span className="hidden sm:inline text-xs bg-[#F0FDF4] border border-green-200 text-[#16A34A] font-bold px-2 py-1 rounded-full">{publicMode ? 'Public map' : 'Beneficiary'}</span>
            <span className="hidden md:inline text-sm text-stone-500">Find available food nearby</span>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end max-w-[560px]">
            <div className="relative flex-1 max-w-[360px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">⌕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search food, restaurant, area..." className="w-full rounded-full border border-stone-200 bg-stone-50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500" />
            </div>
            {!publicMode && user && (
              <button onClick={() => setShowClaimed(v=>!v)} className={`hidden sm:inline-flex text-xs font-bold px-4 py-2 rounded-full border transition ${showClaimed ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:bg-stone-50'}`}>
                {myClaimed.length ? `Claimed (${myClaimed.length})` : 'Claimed'} {showClaimed ? '• showing' : ''}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* Left panel */}
        <div className="w-full lg:w-[380px] xl:w-[400px] border-r border-stone-200 bg-white flex flex-col lg:h-[calc(100vh-120px)] lg:overflow-hidden">
          <div className="p-4 border-b border-stone-200 bg-[#FFFBEB]/30">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-stone-900 tracking-tight">AVAILABLE FOOD</h2>
              <span className="text-xs font-bold bg-[#16A34A] text-white px-2.5 py-1 rounded-full">{available.length} nearby</span>
            </div>
            <div className="mt-1 text-xs text-stone-500">Tap a card or map marker to view details</div>
          </div>

          <div className="flex-1 overflow-auto p-3 space-y-3 bg-stone-50/50">
            {showClaimed && myClaimed.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-black tracking-widest text-sky-700">MY CLAIMED</div>
                {myClaimed.map(d=> (
                  <div key={d.id} className="bg-sky-50 border border-sky-200 rounded-2xl p-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-700"><span className="w-2 h-2 rounded-full bg-sky-500" /> CLAIMED • {d.meals} meals</div>
                    <div className="font-bold text-stone-900 text-sm mt-1">{d.restaurantName} • {d.foodType}</div>
                    <div className="text-xs text-stone-600">{d.pickupLocation} • Pickup by {fmtUntil(d.availableUntil)}</div>
                    <div className="mt-2 bg-white rounded-xl border border-sky-100 p-2">
                      <StatusStepper status={d.status} compact />
                    </div>
                    <div className="mt-2 text-xs font-semibold text-sky-700 bg-white border border-sky-200 rounded-lg px-2 py-1">Donation claimed. 🎉 {d.status==='CLAIMED'?'Next: pickup at location': d.status}</div>
                  </div>
                ))}
                <div className="h-[1px] bg-stone-200 my-2" />
                <div className="text-[11px] font-black tracking-widest text-stone-500">MORE AVAILABLE</div>
              </div>
            )}

            {available.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-3xl">😋</div>
                <div className="mt-2 font-bold text-stone-900">No matches</div>
                <div className="text-sm text-stone-500">Try a different search or check back soon</div>
              </div>
            ) : (
              available.map(d=> (
                <div key={d.id} onClick={()=>setSelectedId(d.id)} className={`rounded-2xl border p-4 cursor-pointer transition text-left ${selectedId===d.id ? 'bg-sky-50 border-sky-300 shadow' : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-green-200 grid place-items-center text-sm">🍲</div>
                    <span className="text-[11px] font-black tracking-widest bg-[#F0FDF4] border border-green-200 text-[#16A34A] px-2 py-1 rounded-full">{d.status}</span>
                  </div>
                  <div className="mt-2 font-extrabold text-stone-900">{d.meals} meals • {d.foodType}</div>
                  <div className="text-sm text-stone-600">{d.restaurantName}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    <span className="bg-stone-900 text-white px-2 py-1 rounded-full font-semibold">{kmAway(d)} km away</span>
                    <span className="bg-amber-100 border border-amber-200 text-amber-800 px-2 py-1 rounded-full font-semibold">Pickup by {fmtUntil(d.availableUntil)}</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-2 line-clamp-2">{d.pickupLocation} • {d.description}</div>
                  <button onClick={(e)=>{e.stopPropagation(); setSelectedId(d.id)}} className={`mt-3 w-full font-bold py-2 rounded-full text-sm transition ${selectedId===d.id ? 'bg-sky-500 text-white' : 'bg-stone-900 text-white hover:bg-black'}`}>View →</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 p-3 sm:p-4 bg-[#FFFBEB] flex flex-col gap-3 lg:h-[calc(100vh-120px)] lg:overflow-hidden">
          <div className="flex-1 min-h-[420px]">
            <TeammateMap donations={available} onMarkerClick={setSelectedId} selectedId={selectedId} />
          </div>

          {/* Detail card */}
          {selected ? (
            <div className="bg-white rounded-[20px] border border-stone-200 shadow-sm p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black tracking-widest text-sky-600">DONATION DETAILS</div>
                  <div className="mt-1 font-black text-[18px] text-stone-900">{selected.restaurantName}</div>
                  <div className="text-sm text-stone-600">{selected.foodType} • {selected.meals} meals • {kmAway(selected)} km away</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full font-semibold">📍 {selected.pickupLocation}</span>
                    <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full font-semibold">Pickup by {fmtUntil(selected.availableUntil)}</span>
                  </div>
                  {selected.description && <div className="mt-2 text-sm text-stone-600 bg-stone-50 border border-stone-200 rounded-xl p-3">{selected.description}</div>}
                  <div className="mt-3">
                    <StatusStepper status={selected.status} />
                  </div>
                </div>
                <button onClick={()=>setSelectedId(null)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 grid place-items-center text-stone-600">×</button>
              </div>
              <div className="mt-4 flex gap-3">
                {selected.status === 'AVAILABLE' ? (
                  <button onClick={()=>claim(selected)} className="flex-1 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold py-3 rounded-full shadow transition">Claim Food →</button>
                ) : (
                  <div className="flex-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold py-3 rounded-full text-center">Claimed by {selected.claimedByName || 'someone'} • {selected.status}</div>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full border border-stone-200 bg-white font-bold text-sm hover:bg-stone-50">Directions</a>
              </div>
              {selected.status !== 'AVAILABLE' && <div className="mt-2 text-xs text-center font-semibold text-stone-600">Food claimed successfully. Next stages: Pickup → Delivered visible to both users.</div>}
            </div>
          ) : (
            <div className="bg-white rounded-[20px] border border-dashed border-stone-300 p-4 text-center text-sm text-stone-500">
              Click a map marker or <span className="font-bold text-stone-900">View</span> on a card to see donation details and claim
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
