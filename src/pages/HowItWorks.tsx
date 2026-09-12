import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function HowItWorks() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How FoodLoop works',
    description: 'Restaurants post surplus meals and verified community kitchens claim them same day in Kathmandu Valley.',
    totalTime: 'PT5M',
    step: [
      { '@type': 'HowToStep', name: 'Restaurant posts surplus', text: 'Add food type, meals, pickup window, and location. Listing appears immediately on the map.' },
      { '@type': 'HowToStep', name: 'Kitchen finds it nearby', text: 'Verified beneficiaries browse by distance and food type, then request pickup.' },
      { '@type': 'HowToStep', name: 'Pickup and confirmation', text: 'Restaurant confirms, kitchen collects, both sides mark delivered.' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="How FoodLoop Works — 3 steps in Kathmandu"
        description="FoodLoop in three steps: restaurants post surplus, verified kitchens find it nearby on a map, and both sides coordinate same day pickup in Kathmandu Valley."
        canonicalPath="/how-it-works"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How it works' }]} />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }} className="max-w-[640px] mt-6">
          <div className="inline-flex bg-white border border-stone-200 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-widest text-stone-500">
            HOW IT WORKS
          </div>
          <h1 className="mt-4 text-[34px] sm:text-[42px] font-display font-bold tracking-tight text-stone-900 leading-none">
            Three steps. Same day.
          </h1>
          <p className="mt-3 text-stone-600 leading-relaxed">
            The flow is intentionally short. Restaurants post in under a minute. Kitchens check the map and request what they can collect. Learn more <Link to="/about" className="underline underline-offset-4 font-medium text-stone-900">about the project</Link> or see <Link to="/impact" className="underline underline-offset-4 font-medium text-stone-900">project status</Link>.
          </p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { k: '01', t: 'Restaurant posts surplus', d: 'Add food type, number of meals, pickup window, and exact location. The listing appears immediately on the map.' },
            { k: '02', t: 'Kitchen finds it nearby', d: 'Verified beneficiaries browse by distance and food type, then tap to request a pickup.' },
            { k: '03', t: 'Pickup and confirmation', d: 'The restaurant confirms, the kitchen collects, and both sides mark the donation as delivered.' },
          ].map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08*i, duration: 0.45 }} className="rounded-2xl border border-stone-200 p-6 bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all">
              <div className="text-xs font-semibold tracking-widest text-leaf">{s.k}</div>
              <h2 className="mt-3 font-semibold text-stone-900 text-[16px]">{s.t}</h2>
              <p className="mt-1 text-sm text-stone-600 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900">What happens after posting</h2>
          <ol className="mt-3 space-y-2 text-sm text-stone-600 list-decimal list-inside leading-relaxed">
            <li>Listing is visible to verified beneficiaries within Kathmandu Valley.</li>
            <li>When a kitchen claims it, the restaurant receives the kitchen name and contact.</li>
            <li>Status moves from Available to Claimed to Picked up to Delivered, so both sides can track it.</li>
          </ol>
          <p className="mt-3 text-sm text-stone-500">No automated delivery. Both parties coordinate timing and handling directly. <Link to="/explore" className="underline underline-offset-4 font-medium text-stone-700">Browse live listings</Link>.</p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/join" className="inline-flex bg-leaf hover:bg-leaf-dark text-white font-medium px-7 py-3 rounded-lg transition-colors">
            Create an account
          </Link>
          <p className="mt-3 text-sm text-stone-500">
            Already have an account? <Link to="/login" className="underline underline-offset-4 font-medium text-stone-900">Log in</Link> · <Link to="/terms" className="underline underline-offset-4 font-medium text-stone-900">Terms</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
