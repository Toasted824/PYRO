import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function About() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="About FoodLoop — Surplus sharing in Kathmandu Valley"
        description="Learn why FoodLoop was built for Kathmandu Valley, how restaurants and shelters coordinate surplus food, and how verification works."
        canonicalPath="/about"
      />
      <Header />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="max-w-[680px] mt-6">
          <div className="inline-flex bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold tracking-widest text-stone-500">
            ABOUT FOODLOOP
          </div>
          <h1 className="mt-4 text-[34px] sm:text-[40px] font-bold tracking-tight leading-none text-stone-900">
            A straightforward way to share surplus food in Kathmandu.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-stone-600">
            Restaurants often have safe, edible food left at the end of service. Nearby shelters and community kitchens can use it the same evening. FoodLoop is a listing and coordination tool that connects the two, with pickup handled directly between them.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-stone-600">
            We started with Kathmandu Valley because it is where we live and can verify participants in person. The system is designed to be simple, so any neighbourhood can run it if there is trust on both sides. See <Link to="/how-it-works" className="underline underline-offset-4 font-medium text-stone-900">how it works</Link> or <Link to="/impact" className="underline underline-offset-4 font-medium text-stone-900">project status</Link>.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="text-xs font-semibold tracking-widest text-stone-500">01</div>
            <h2 className="mt-2 font-semibold text-stone-900">Reduce waste where possible</h2>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">Surplus is listed with clear timing, so food is used the same day instead of discarded.</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="text-xs font-semibold tracking-widest text-stone-500">02</div>
            <h2 className="mt-2 font-semibold text-stone-900">Closest first</h2>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">Listings are sorted by distance, so kitchens see what is practical to collect.</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="text-xs font-semibold tracking-widest text-stone-500">03</div>
            <h2 className="mt-2 font-semibold text-stone-900">Verification matters</h2>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">Only accounts we have checked can claim food. This keeps the process respectful and reliable.</p>
          </div>
        </div>

        <div className="mt-8 bg-stone-900 rounded-xl p-6 sm:p-7 text-white">
          <div className="text-xs font-semibold tracking-widest text-white/60">OUR APPROACH</div>
          <p className="mt-2 text-[17px] leading-relaxed max-w-[640px]">
            FoodLoop does not handle money, delivery, or storage. It provides a shared list, a map, and a clear status for each donation from available to delivered. Restaurants and beneficiaries coordinate pickup directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/how-it-works" className="bg-white text-stone-900 font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-stone-100 transition-colors">
              How it works
            </Link>
            <Link to="/impact" className="bg-white/10 border border-white/20 text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-white hover:text-stone-900 transition-colors">
              Project status
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-sm text-stone-600 leading-relaxed">
          <h2 className="font-semibold text-stone-900">Limitations</h2>
          <p className="mt-2">This is an early version built for demonstration and small scale coordination. Food safety remains the responsibility of the restaurant and the receiving organization. We recommend listing only food that has been stored safely and can be collected within the stated window.</p>
          <p className="mt-2">
            Questions? <Link to="/join" className="underline underline-offset-4 font-medium text-stone-900">Join as restaurant or beneficiary</Link>, browse <Link to="/explore" className="underline underline-offset-4 font-medium text-stone-900">available food</Link>, or see our <Link to="/terms" className="underline underline-offset-4 font-medium text-stone-900">Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
