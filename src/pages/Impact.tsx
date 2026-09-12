import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function Impact() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="Project Status — FoodLoop Kathmandu Valley"
        description="FoodLoop is an early build for Kathmandu Valley. See what exists now, what is not yet included, and how impact will be measured with real data only."
        canonicalPath="/impact"
      />
      <Header />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Project status' }]} />
        <div className="max-w-[640px] mt-6">
          <div className="inline-flex bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold tracking-widest text-stone-500">
            PROJECT STATUS
          </div>
          <h1 className="mt-4 text-[34px] sm:text-[40px] font-bold tracking-tight text-stone-900">Where FoodLoop stands today</h1>
          <p className="mt-2 text-stone-600 leading-relaxed">This is an early build focused on Kathmandu Valley. We are not publishing impact totals until there is real usage to report. Learn <Link to="/about" className="underline underline-offset-4 font-medium text-stone-900">why we built it</Link> and <Link to="/how-it-works" className="underline underline-offset-4 font-medium text-stone-900">how it works</Link>.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-semibold text-stone-900">What exists now</h2>
            <ul className="mt-3 space-y-2 text-sm text-stone-600 list-disc list-inside leading-relaxed">
              <li>Restaurant posting with meals, pickup window, and map location</li>
              <li>Beneficiary map sorted by distance, with claim flow</li>
              <li>Account verification step and status tracking from Available to Delivered</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-semibold text-stone-900">What is not yet included</h2>
            <ul className="mt-3 space-y-2 text-sm text-stone-600 list-disc list-inside leading-relaxed">
              <li>No live impact totals or public leaderboards</li>
              <li>No automated delivery or payment handling</li>
              <li>No large scale verification beyond our direct contacts</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900">How we will measure impact later</h2>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            When real donations are completed, we will count delivered meals, active restaurants, and receiving organizations based on actual records in the system. We will show methodology alongside numbers, and keep the data local to Kathmandu Valley until we have a reliable process elsewhere.
          </p>
          <p className="mt-2 text-sm text-stone-500">No estimates are shown here. We prefer to report nothing than to show figures that are not real. <Link to="/explore" className="underline underline-offset-4 font-medium text-stone-700">See current listings</Link>.</p>
        </div>

        <div className="mt-6 bg-stone-50 rounded-xl border border-dashed border-stone-300 p-6">
          <h2 className="font-semibold text-stone-900 text-sm">Map integration note</h2>
          <p className="mt-1 text-sm text-stone-600 leading-relaxed">The map uses Leaflet with standard tiles. Your teammate can replace the placeholder component at <code className="bg-white border border-stone-200 px-1.5 py-0.5 rounded text-xs">src/components/map/TeammateMap.tsx</code>. Keep donation data, onMarkerClick, and selectedId as props so claiming still works.</p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/join" className="inline-flex bg-stone-900 hover:bg-black text-white font-medium px-7 py-3 rounded-lg transition-colors">
            Start using FoodLoop
          </Link>
        </div>
      </div>
    </div>
  )
}
