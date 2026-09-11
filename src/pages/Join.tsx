import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export function Join() {
  const [selected, setSelected] = useState<'restaurant' | 'beneficiary' | null>(null)
  const nav = useNavigate()

  const go = () => {
    if (!selected) return
    // store pending role for login/register defaults
    sessionStorage.setItem('foodloop_pending_role', selected)
    nav(`/register/${selected}`)
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3 py-1 text-xs font-bold tracking-widest text-stone-500">STEP 1 OF FOODLOOP</div>
          <h1 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-stone-900 leading-none">JOIN FOODLOOP</h1>
          <p className="mt-3 text-[17px] font-medium text-stone-600">How would you like to help?</p>
          <p className="text-sm text-stone-500">Restaurants have food • Beneficiaries need food • FoodLoop connects them</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5 sm:gap-6 max-w-[760px] mx-auto">
          {/* Restaurant */}
          <button
            onClick={() => setSelected('restaurant')}
            className={`text-left bg-white rounded-[24px] border-2 p-6 sm:p-7 shadow-sm transition relative overflow-hidden group ${selected === 'restaurant' ? 'border-[#16A34A] ring-4 ring-[#16A34A]/15' : 'border-stone-200 hover:border-stone-300 hover:shadow-md'}`}
          >
            {selected === 'restaurant' && <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#16A34A] text-white grid place-items-center text-sm">✓</span>}
            <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-amber-200 grid place-items-center text-2xl">🍽️</div>
            <div className="mt-4 text-[12px] font-black tracking-[0.18em] text-amber-600">RESTAURANT</div>
            <div className="mt-1 font-extrabold text-[20px] text-stone-900">Donate surplus food</div>
            <div className="mt-2 text-sm leading-relaxed text-stone-600">Share your surplus meals with nearby shelters and community kitchens. Post in 30 seconds.</div>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li className="flex items-center gap-2 text-stone-700"><span className="w-5 h-5 rounded-full bg-[#F0FDF4] border border-green-200 grid place-items-center text-[11px] text-[#16A34A]">✓</span> Reduce waste, help community</li>
              <li className="flex items-center gap-2 text-stone-700"><span className="w-5 h-5 rounded-full bg-[#F0FDF4] border border-green-200 grid place-items-center text-[11px] text-[#16A34A]">✓</span> Track every donation</li>
            </ul>
            <div className={`mt-5 inline-flex items-center justify-center w-full font-bold py-3 rounded-full transition ${selected === 'restaurant' ? 'bg-[#16A34A] text-white' : 'bg-stone-900 text-white group-hover:bg-black'}`}>Continue as Restaurant →</div>
          </button>

          {/* Beneficiary */}
          <button
            onClick={() => setSelected('beneficiary')}
            className={`text-left bg-white rounded-[24px] border-2 p-6 sm:p-7 shadow-sm transition relative overflow-hidden group ${selected === 'beneficiary' ? 'border-sky-500 ring-4 ring-sky-500/15' : 'border-stone-200 hover:border-stone-300 hover:shadow-md'}`}
          >
            {selected === 'beneficiary' && <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-sky-500 text-white grid place-items-center text-sm">✓</span>}
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 grid place-items-center text-2xl">🤝</div>
            <div className="mt-4 text-[12px] font-black tracking-[0.18em] text-sky-600">BENEFICIARY</div>
            <div className="mt-1 font-extrabold text-[20px] text-stone-900">Find available food nearby</div>
            <div className="mt-2 text-sm leading-relaxed text-stone-600">Discover fresh, available donations on the FoodLoop map and claim what you need.</div>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li className="flex items-center gap-2 text-stone-700"><span className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200 grid place-items-center text-[11px] text-sky-600">✓</span> Real-time map & distance</li>
              <li className="flex items-center gap-2 text-stone-700"><span className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200 grid place-items-center text-[11px] text-sky-600">✓</span> Claim in one tap</li>
            </ul>
            <div className={`mt-5 inline-flex items-center justify-center w-full font-bold py-3 rounded-full transition ${selected === 'beneficiary' ? 'bg-sky-500 text-white' : 'bg-stone-900 text-white group-hover:bg-black'}`}>Continue as Beneficiary →</div>
          </button>
        </div>

        <div className="max-w-[760px] mx-auto mt-6 flex flex-col sm:flex-row gap-3">
          <button
            disabled={!selected}
            onClick={go}
            className={`flex-1 py-3.5 rounded-full font-extrabold transition ${selected ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
          >
            Continue →
          </button>
          <Link to="/login" className="flex-1 text-center py-3.5 rounded-full font-bold bg-white border border-stone-200 hover:bg-stone-50 text-stone-700">Already have account? Log in</Link>
        </div>

        {/* Story footer */}
        <div className="max-w-[760px] mx-auto mt-8 bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-amber-100 grid place-items-center">🍽️</span> Restaurant</span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-amber-200 via-[#16A34A] to-sky-200 mx-2" />
          <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white grid place-items-center text-xs">♻</span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-[#16A34A] to-sky-200 mx-2" />
          <span className="flex items-center gap-2">Beneficiary <span className="w-8 h-8 rounded-full bg-sky-100 grid place-items-center">🤝</span></span>
          <span className="hidden sm:inline-flex items-center gap-2 ml-3 pl-3 border-l border-stone-200"><span className="w-8 h-8 rounded-full bg-stone-900 text-white grid place-items-center text-xs">🏘️</span> Community</span>
        </div>
      </div>
    </div>
  )
}
