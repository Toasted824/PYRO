import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function Join() {
  const [selected, setSelected] = useState<'restaurant' | 'beneficiary' | null>(null)
  const nav = useNavigate()

  const go = () => {
    if (!selected) return
    sessionStorage.setItem('foodloop_pending_role', selected)
    nav(`/register/${selected}`)
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="Join FoodLoop — Restaurant or Community Kitchen"
        description="Choose how you will use FoodLoop in Kathmandu: share surplus meals as a restaurant or find food nearby as a community kitchen. Free to join."
        canonicalPath="/join"
      />
      <Header />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Join' }]} />
        <div className="text-center mt-6">
          <div className="inline-flex bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold tracking-widest text-stone-500">GET STARTED</div>
          <h1 className="mt-4 text-[30px] sm:text-[36px] font-bold tracking-tight text-stone-900">Join FoodLoop</h1>
          <p className="mt-2 text-stone-600">Choose how you will use FoodLoop. You can change this later. Need help? See <Link to="/how-it-works" className="underline underline-offset-4 font-medium text-stone-900">how it works</Link>.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-[720px] mx-auto">
          <button onClick={() => setSelected('restaurant')} className={`text-left bg-white rounded-xl border-2 p-6 text-left ${selected === 'restaurant' ? 'border-leaf bg-[#F0FDF4]' : 'border-stone-200 hover:border-stone-300'}`}>
            {selected === 'restaurant' && <span className="float-right text-xs font-semibold bg-leaf text-white px-2 py-1 rounded-md">Selected</span>}
            <div className="text-xs font-semibold tracking-widest text-stone-500">RESTAURANT</div>
            <h2 className="mt-1 font-semibold text-[17px] text-stone-900">Share surplus food</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">Post what is left after service with pickup time and location. Beneficiaries nearby will see it. <Link to="/register/restaurant" onClick={e => e.stopPropagation()} className="underline underline-offset-4 font-medium text-stone-700">Register directly</Link>.</p>
            <ul className="mt-3 space-y-1 text-sm text-stone-600 list-disc list-inside">
              <li>Posting takes about a minute</li>
              <li>You control what is listed</li>
            </ul>
            <div className={`mt-4 inline-flex w-full justify-center font-medium py-2.5 rounded-lg border text-sm ${selected === 'restaurant' ? 'bg-leaf text-white border-leaf' : 'bg-stone-900 text-white border-stone-900'}`}>Continue as restaurant</div>
          </button>

          <button onClick={() => setSelected('beneficiary')} className={`text-left bg-white rounded-xl border-2 p-6 text-left ${selected === 'beneficiary' ? 'border-sky-600 bg-sky-50' : 'border-stone-200 hover:border-stone-300'}`}>
            {selected === 'beneficiary' && <span className="float-right text-xs font-semibold bg-sky-600 text-white px-2 py-1 rounded-md">Selected</span>}
            <div className="text-xs font-semibold tracking-widest text-stone-500">COMMUNITY KITCHEN OR SHELTER</div>
            <h2 className="mt-1 font-semibold text-[17px] text-stone-900">Find food nearby</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">Browse available listings on the map, sorted by distance, and request what you can collect. <Link to="/register/beneficiary" onClick={e => e.stopPropagation()} className="underline underline-offset-4 font-medium text-stone-700">Register directly</Link>.</p>
            <ul className="mt-3 space-y-1 text-sm text-stone-600 list-disc list-inside">
              <li>Map shows distance and pickup window</li>
              <li>One tap to request</li>
            </ul>
            <div className={`mt-4 inline-flex w-full justify-center font-medium py-2.5 rounded-lg border text-sm ${selected === 'beneficiary' ? 'bg-sky-600 text-white border-sky-600' : 'bg-stone-900 text-white border-stone-900'}`}>Continue as beneficiary</div>
          </button>
        </div>

        <div className="max-w-[720px] mx-auto mt-6 flex flex-col sm:flex-row gap-3">
          <button disabled={!selected} onClick={go} className={`flex-1 py-3 rounded-lg font-semibold text-sm ${selected ? 'bg-leaf hover:bg-leaf-dark text-white' : 'bg-stone-200 text-stone-500 cursor-not-allowed'}`}>
            Continue
          </button>
          <Link to="/login" className="flex-1 text-center py-3 rounded-lg font-medium bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm">Already have an account? Log in</Link>
        </div>

        <p className="max-w-[720px] mx-auto mt-6 text-center text-xs text-stone-500 leading-relaxed">
          By continuing, you agree to our <Link to="/terms" className="underline underline-offset-4 font-medium text-stone-700">Terms and Conditions</Link>. Food safety and handling remain the responsibility of the restaurant and the receiving organization.
        </p>
      </div>
    </div>
  )
}
