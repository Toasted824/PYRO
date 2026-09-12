import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'

export function Landing() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FoodLoop',
    url: 'https://foodloop.org',
    slogan: "Good food shouldn't be wasted",
    description: "Good food shouldn't be wasted — FoodLoop connects Kathmandu restaurants with surplus meals to verified community kitchens and shelters. Post a listing in one minute, find food nearby on a map, coordinate pickup directly.",
    areaServed: { '@type': 'City', name: 'Kathmandu', addressCountry: 'NP' },
    foundingLocation: { '@type': 'Place', address: 'Kathmandu Valley, Nepal' },
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FoodLoop',
    url: 'https://foodloop.org',
    image: 'https://foodloop.org/og-image.svg',
    address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressRegion: 'Bagmati', addressCountry: 'NP' },
    description: 'Surplus food listing and coordination service for Kathmandu Valley. Good food shouldn’t be wasted.',
    priceRange: 'Free',
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] overflow-hidden">
      <SEO
        title="FoodLoop — Good food shouldn't be wasted"
        description="Good food shouldn't be wasted. FoodLoop connects Kathmandu restaurants with surplus meals to verified community kitchens and shelters. Post a listing in one minute, find food nearby on a map, coordinate pickup directly."
        canonicalPath="/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Header transparent />

      {/* HERO — slogan first, centered, airy */}
      <section className="relative geometric-grid">
        <div aria-hidden="true" className="hero-blob -top-[180px] left-1/2 -translate-x-1/2 hidden sm:block" />
        <div aria-hidden="true" className="hero-blob -top-[120px] left-1/2 -translate-x-1/2 sm:hidden" style={{ width: 360, height: 360 }} />
        <div className="relative max-w-[860px] mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-10 sm:pb-14 text-center">
          <div className="motion-fade-up inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 text-xs font-semibold text-stone-600 shadow-sm">
            <span className="w-2 h-2 bg-leaf rounded-full relative leaf-pulse" aria-hidden="true" /> Available in Kathmandu Valley
          </div>

          <h1 className="motion-fade-up motion-delay-1 mt-6 font-display font-extrabold tracking-tight text-stone-900 leading-[0.9] text-[38px] sm:text-[60px] lg:text-[68px]">
            Good food
            <br />
            <span className="text-leaf">shouldn&apos;t be wasted</span>
          </h1>

          <p className="motion-fade-up motion-delay-2 mt-5 text-[17px] sm:text-[19px] leading-relaxed text-stone-600 max-w-[620px] mx-auto">
            FoodLoop connects Kathmandu restaurants with surplus meals to verified community kitchens and shelters. Post a listing in one minute, find food nearby on a map, coordinate pickup directly.
          </p>
          <p className="motion-fade-up motion-delay-2 mt-2 text-sm text-stone-500 max-w-[560px] mx-auto">
            Free to use. No commission. Restaurants keep control of what they share.
          </p>

          <div className="motion-fade-up motion-delay-3 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/join"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-leaf hover:bg-leaf-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(22,163,74,0.22)] hover:shadow-[0_10px_28px_rgba(22,163,74,0.28)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200"
            >
              Join FoodLoop
            </Link>
            <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-500 px-2 py-2">
              Browse available food <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="motion-fade-up motion-delay-3 mt-4 flex items-center justify-center gap-4 text-xs text-stone-400">
            <Link to="/how-it-works" className="hover:text-stone-600 underline underline-offset-4">How it works</Link>
            <span aria-hidden="true">·</span>
            <Link to="/about" className="hover:text-stone-600 underline underline-offset-4">About</Link>
            <span aria-hidden="true">·</span>
            <Link to="/impact" className="hover:text-stone-600 underline underline-offset-4">Project status</Link>
          </div>
        </div>
      </section>

      {/* PROOF — muted example, secondary */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-8" aria-label="Example listing">
        <div className="motion-fade-up bg-white/80 backdrop-blur rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-green-200 grid place-items-center text-[11px] font-black text-leaf">FL</div>
            <div className="hidden sm:block w-px h-10 bg-stone-200" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-stone-900">Kathmandu Kitchen, Thamel — example</span>
              <span className="text-[10px] font-semibold tracking-widest bg-white border border-green-200 text-leaf px-2 py-0.5 rounded-full">AVAILABLE · EXAMPLE</span>
              <span className="text-xs text-stone-400">Illustrative only</span>
            </div>
            <div className="text-sm text-stone-600 mt-0.5">Dal bhat · 12 meals · Pickup 8:00–9:30 pm · Cooked today, stored safely. Vegetarian.</div>
            <div className="mt-2 flex gap-1.5 text-xs">
              <span className="bg-white border border-stone-200 px-2 py-1 rounded-full">0.8 km away · example distance</span>
              <span className="bg-white border border-stone-200 px-2 py-1 rounded-full">Within Kathmandu Valley</span>
            </div>
          </div>
          <Link to="/how-it-works" className="shrink-0 inline-flex items-center justify-center bg-stone-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">See how it works</Link>
        </div>
        <p className="mt-2 text-center text-xs text-stone-400">No fake totals. Activity appears only after real listings and pickups happen. <Link to="/impact" className="underline underline-offset-4 hover:text-stone-600">Project status</Link>.</p>
      </section>

      {/* MINIMAL NAV — text links, not cards */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-12" aria-labelledby="explore-links">
        <h2 id="explore-links" className="sr-only">Explore FoodLoop</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { to: '/how-it-works', k: '01', title: 'How it works', desc: 'Post in ~1 min. Claim in one tap. Pickup directly.' },
            { to: '/about', k: '02', title: 'About FoodLoop', desc: 'Why we built it for Kathmandu and how verification works.' },
            { to: '/impact', k: '03', title: 'Project status', desc: 'What exists, what’s not yet included, how we’ll measure.' },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200"
            >
              <div className="text-xs font-semibold tracking-widest text-leaf">{c.k}</div>
              <div className="mt-1.5 font-semibold text-stone-900 group-hover:text-ink">{c.title}</div>
              <div className="mt-1 text-sm text-stone-600 leading-relaxed">{c.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-stone-900 group-hover:gap-1.5 transition-all">Explore <span aria-hidden="true">→</span></div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-stone-500">
          <span>© 2026 FoodLoop · Kathmandu Valley · <Link to="/terms" className="underline underline-offset-4">Terms</Link></span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-stone-700 underline underline-offset-4">Terms and Conditions</Link>
            <Link to="/about" className="hover:text-stone-700">About</Link>
            <Link to="/how-it-works" className="hover:text-stone-700">How it works</Link>
            <Link to="/impact" className="hover:text-stone-700">Project status</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
