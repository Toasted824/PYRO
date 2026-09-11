import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { mockStore } from '../../lib/mockStore'
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
  const { user } = useAuth()
  const nav = useNavigate()
  const [donations, setDonations] = useState<Donation[]>(() => mockStore.getDonations())

  const refresh = () => setDonations([...mockStore.getDonations()])

  useEffect(() => {
    const h = () => refresh()
    window.addEventListener('foodloop:donations', h)
    window.addEventListener('storage', h)
    const iv = setInterval(refresh, 2000)
    return () => { window.removeEventListener('foodloop:donations', h); window.removeEventListener('storage', h); clearInterval(iv) }
  }, [])

  useEffect(() => {
    if (!user) nav('/login?role=restaurant')
    else if (user.role !== 'restaurant') nav('/beneficiary/dashboard')
  }, [user, nav])

  if (!user) return null
  // For demo clarity: if user is new, show only their donations, else show seeded r1 as theirs if name matches or show all if no filter
  const myDonations = donations.filter(d => d.restaurantId === user.id)
  const display = myDonations.length > 0 ? myDonations : donations.filter(d => d.status !== 'DELIVERED').slice(0, 6) // fallback show some for new user demo

  const claimedCount = display.filter(d=>d.status!=='AVAILABLE').length

  const advance = (d: Donation) => {
    const order: Donation['status'][] = ['AVAILABLE','CLAIMED','PICKUP','DELIVERED']
    const idx = order.indexOf(d.status)
    if (idx < order.length - 1) {
      mockStore.updateStatus(d.id, order[idx+1])
      pushToast(`Moved to ${order[idx+1]}`)
      refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-black tracking-tight text-stone-900">Restaurant Dashboard</h1>
            <p className="text-sm text-stone-600">Welcome, <span className="font-bold text-stone-900">{user.name}</span> • {user.location} • Track your loop</p>
          </div>
          <Link to="/restaurant/new" className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold px-6 py-3 rounded-full shadow transition">
            <span className="w-6 h-6 rounded-full bg-white text-[#16A34A] grid place-items-center text-[16px] leading-none">+</span> Add Available Food
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active donations', value: display.filter(d=>d.status==='AVAILABLE').length, icon: '●', bg: 'bg-white' },
            { label: 'Claimed', value: display.filter(d=>d.status==='CLAIMED').length, icon: '✓', bg: 'bg-amber-50' },
            { label: 'Meals shared', value: display.reduce((a,b)=>a+b.meals,0), icon: '🍽️', bg: 'bg-[#F0FDF4]' },
            { label: 'Impact', value: `${claimedCount}/${display.length}`, icon: '♻', bg: 'bg-stone-900 text-white' },
          ].map(s=> (
            <div key={s.label} className={`${s.bg} rounded-2xl border border-stone-200 p-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-stone-500">{s.label.toUpperCase()}</span>
                <span className="w-7 h-7 rounded-full bg-stone-100 grid place-items-center text-xs">{s.icon}</span>
              </div>
              <div className={`mt-1 text-[28px] font-black ${s.bg.includes('stone-900') ? 'text-white' : 'text-stone-900'}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* My donations */}
          <div className="bg-white rounded-[24px] border border-stone-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-stone-900">Your active donations</h2>
              <span className="text-xs bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full font-bold">{display.length} total</span>
            </div>
            {display.length === 0 ? (
              <div className="mt-6 text-center py-10 bg-[#FFFBEB] rounded-2xl border border-dashed border-amber-200">
                <div className="text-3xl">🍲</div>
                <div className="mt-2 font-bold text-stone-900">No donations yet</div>
                <div className="text-sm text-stone-500">Click “Add Available Food” to start the loop</div>
                <Link to="/restaurant/new" className="mt-4 inline-flex bg-[#16A34A] text-white font-bold px-5 py-2 rounded-full text-sm">+ Add Available Food</Link>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {display.map(d=> (
                  <div key={d.id} className="rounded-2xl border border-stone-200 p-4 hover:shadow-sm transition bg-[#FFFBEB]/30">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-black tracking-widest px-2 py-0.5 rounded-full border ${d.status==='AVAILABLE'?'bg-[#F0FDF4] border-green-200 text-[#16A34A]': d.status==='CLAIMED'?'bg-amber-50 border-amber-200 text-amber-700':'bg-sky-50 border-sky-200 text-sky-700'}`}>{d.status}</span>
                          <span className="text-xs text-stone-500">{timeLeft(d.availableUntil)} • {d.meals} meals</span>
                        </div>
                        <div className="mt-1 font-bold text-stone-900">{d.foodType} • {d.meals} meals</div>
                        <div className="text-sm text-stone-600">{d.pickupLocation} • Until {new Date(d.availableUntil).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                        {d.description && <div className="text-xs text-stone-500 mt-1 line-clamp-2">{d.description}</div>}
                        {d.claimedByName && <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full">🤝 Claimed by {d.claimedByName}</div>}
                      </div>
                      <button onClick={()=>advance(d)} disabled={d.status==='DELIVERED'} className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition ${d.status==='DELIVERED'?'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed':'bg-white hover:bg-stone-900 hover:text-white border-stone-200'}`}>{d.status==='AVAILABLE'?'Mark claimed':d.status==='CLAIMED'?'→ Pickup':d.status==='PICKUP'?'→ Delivered':'Completed ✓'}</button>
                    </div>
                    <div className="mt-4 bg-white rounded-xl border border-stone-200 p-3">
                      <StatusStepper status={d.status} />
                      {d.status==='CLAIMED' && <div className="mt-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">Your donation has been claimed. 🎉 Prepare for pickup — beneficiary will arrive soon.</div>}
                      {d.status==='DELIVERED' && <div className="mt-2 text-xs font-bold text-[#16A34A] bg-[#F0FDF4] border border-green-200 rounded-lg px-3 py-2">Delivered • FoodLoop completed! Thank you for reducing waste. ♻🏘️</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Story / next */}
          <div className="space-y-4">
            <div className="bg-stone-900 rounded-[24px] p-6 text-white">
              <div className="text-xs font-black tracking-widest text-white/60">YOUR LOOP • VISUAL</div>
              <div className="mt-3 flex items-center gap-2 text-sm font-bold">
                <span className="w-8 h-8 rounded-full bg-white text-stone-900 grid place-items-center">🍽️</span>
                <span>You</span>
                <span className="flex-1 h-[2px] bg-white/20" />
                <span className="w-8 h-8 rounded-full bg-[#16A34A] grid place-items-center">♻</span>
                <span className="flex-1 h-[2px] bg-white/20" />
                <span className="w-8 h-8 rounded-full bg-sky-500 grid place-items-center">🤝</span>
              </div>
              <div className="mt-3 text-xs leading-relaxed text-white/70">When a beneficiary claims your food, you’ll see <span className="text-white font-bold">“Your donation has been claimed.”</span> You can then advance to Pickup → Delivered and see community impact.</div>
              <div className="mt-4 bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#16A34A] grid place-items-center">✓</span>
                <div className="text-sm">
                  <div className="font-bold">Demo: open Beneficiary flow in incognito</div>
                  <div className="text-xs opacity-70">Claim food as beneficiary and watch this dashboard update live</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-stone-200 p-6 shadow-sm">
              <h3 className="font-extrabold text-stone-900">How status works</h3>
              <div className="mt-3 space-y-2 text-sm">
                {[
                  { k: 'AVAILABLE', d: 'Food appears on FoodLoop map for nearby beneficiaries' },
                  { k: 'CLAIMED', d: 'Beneficiary tapped Claim — you prepare for pickup' },
                  { k: 'PICKUP', d: 'Beneficiary is on the way / picking up' },
                  { k: 'DELIVERED', d: 'Loop completed — meals saved, waste prevented' },
                ].map(s=> (
                  <div key={s.k} className="flex gap-3">
                    <span className="shrink-0 text-[11px] font-black tracking-widest bg-stone-900 text-white px-2 py-1 rounded-full h-fit">{s.k}</span>
                    <span className="text-stone-600 leading-relaxed">{s.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
