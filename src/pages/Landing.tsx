import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { useAuth } from '../lib/auth'

export function Landing() {
  const { user, initializing } = useAuth()

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

  if (initializing) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] grid place-items-center">
        <div className="text-sm text-stone-500">Loading…</div>
      </div>
    )
  }

  // Authenticated homes — separate for restaurant vs beneficiary, no "Join FoodLoop" CTA
  if (user) {
    if (user.role === 'restaurant') {
      return (
        <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
          <SEO title={`Welcome back, ${user.name} — FoodLoop Restaurant Home`} description="Your restaurant home on FoodLoop — post surplus food, track donations from Available to Delivered, and coordinate pickup with nearby kitchens." canonicalPath="/" />
          <Header transparent />
          <main className="flex-1">
            <section className="relative geometric-grid overflow-hidden">
              <div aria-hidden="true" className="hero-blob -top-[160px] left-1/2 -translate-x-1/2 hidden sm:block" />
              <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 text-center">
                <div className="motion-fade-up inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 text-xs font-semibold text-stone-600 shadow-sm">
                  <span className="w-2 h-2 bg-leaf rounded-full relative leaf-pulse" aria-hidden="true" /> Restaurant home · {user.location || 'Kathmandu Valley'}
                </div>
                <h1 className="motion-fade-up motion-delay-1 mt-6 font-display font-extrabold tracking-tight text-stone-900 leading-[0.92] text-[36px] sm:text-[54px]">
                  Welcome back,
                  <br />
                  <span className="text-leaf">{user.name}</span>
                </h1>
                <p className="motion-fade-up motion-delay-2 mt-4 text-[17px] leading-relaxed text-stone-600 max-w-[560px] mx-auto">
                  Share today&apos;s surplus in about a minute. Verified kitchens nearby will see it instantly on the map — you stay in control of what you list.
                </p>
                <p className="motion-fade-up motion-delay-2 mt-1 text-sm text-stone-500">Good food shouldn&apos;t be wasted — your next listing keeps the loop going.</p>
                <div className="motion-fade-up motion-delay-3 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/restaurant/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center bg-leaf hover:bg-leaf-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(22,163,74,0.22)] transition-all">Go to dashboard →</Link>
                  <Link to="/restaurant/new" className="w-full sm:w-auto inline-flex items-center justify-center bg-stone-900 hover:bg-black text-white font-semibold px-8 py-3.5 rounded-full transition-colors">Post surplus food</Link>
                </div>
                <div className="motion-fade-up motion-delay-3 mt-3 text-xs text-stone-400">
                  <Link to="/how-it-works" className="hover:text-stone-600 underline underline-offset-4">How it works</Link> · <Link to="/explore" className="hover:text-stone-600 underline underline-offset-4">View public map</Link>
                </div>
              </div>
            </section>
            <section className="max-w-[900px] mx-auto px-4 sm:px-6 pb-10 grid sm:grid-cols-3 gap-3">
              <Link to="/restaurant/dashboard" className="group bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm hover:-translate-y-[1px] transition-all">
                <div className="text-xs font-semibold tracking-widest text-leaf">DASHBOARD</div>
                <div className="mt-1 font-semibold text-stone-900">Track your donations</div>
                <div className="text-sm text-stone-600 leading-relaxed">Available → Claimed → Pickup → Delivered</div>
                <div className="mt-3 text-sm font-medium text-stone-900 group-hover:gap-1.5 inline-flex items-center gap-1">Open dashboard <span>→</span></div>
              </Link>
              <Link to="/restaurant/new" className="group bg-leaf text-white rounded-2xl p-5 hover:bg-leaf-dark transition-colors">
                <div className="text-xs font-semibold tracking-widest text-white/80">NEW LISTING</div>
                <div className="mt-1 font-semibold">Post surplus food</div>
                <div className="text-sm text-white/80 leading-relaxed">Meals, pickup window, and location — ~1 min</div>
                <div className="mt-3 text-sm font-medium inline-flex items-center gap-1">Create listing <span>→</span></div>
              </Link>
              <Link to="/how-it-works" className="group bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all">
                <div className="text-xs font-semibold tracking-widest text-stone-400">HELP</div>
                <div className="mt-1 font-semibold text-stone-900">How status works</div>
                <div className="text-sm text-stone-600 leading-relaxed">What happens after a kitchen claims.</div>
                <div className="mt-3 text-sm font-medium text-stone-900 inline-flex items-center gap-1">Learn more <span>→</span></div>
              </Link>
            </section>
          </main>
          <footer className="border-t border-stone-200 bg-white mt-auto"><div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 text-sm text-stone-500 flex justify-between"><span>© 2026 FoodLoop · Restaurant home</span><Link to="/terms" className="underline underline-offset-4">Terms</Link></div></footer>
        </div>
      )
    }

    // beneficiary home
    return (
      <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
        <SEO title={`Find food nearby — Welcome ${user.name}`} description="Your beneficiary home on FoodLoop — browse surplus food on a muted map sorted by distance, claim in one tap, and coordinate pickup same day in Kathmandu Valley." canonicalPath="/" />
        <Header transparent />
        <main className="flex-1">
          <section className="relative geometric-grid overflow-hidden">
            <div aria-hidden="true" className="hero-blob -top-[160px] left-1/2 -translate-x-1/2 hidden sm:block" />
            <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 text-center">
              <div className="motion-fade-up inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 text-xs font-semibold text-stone-600 shadow-sm">
                <span className="w-2 h-2 bg-sky-500 rounded-full relative leaf-pulse" aria-hidden="true" /> Beneficiary home · {user.location || 'Kathmandu Valley'}
              </div>
              <h1 className="motion-fade-up motion-delay-1 mt-6 font-display font-extrabold tracking-tight text-stone-900 leading-[0.92] text-[36px] sm:text-[54px]">
                Good food
                <br />
                <span className="text-leaf">near you, {user.name.split(' ')[0]}</span>
              </h1>
              <p className="motion-fade-up motion-delay-2 mt-1 text-sm text-stone-500">Verified kitchens only · No commission · Same-day pickup.</p>
              <div className="motion-fade-up motion-delay-3 mt-8 flex items-center justify-center">
                <Link to="/beneficiary/dashboard" className="inline-flex items-center justify-center bg-leaf hover:bg-leaf-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(22,163,74,0.22)] transition-all">Find food nearby</Link>
              </div>
              <div className="motion-fade-up motion-delay-3 mt-3 text-xs text-stone-400">
                <Link to="/beneficiary/dashboard" className="hover:text-stone-600 underline underline-offset-4">My claimed</Link> · <Link to="/how-it-works" className="hover:text-stone-600 underline underline-offset-4">How it works</Link>
              </div>
            </div>
          </section>
          <section className="max-w-[900px] mx-auto px-4 sm:px-6 pb-10 grid sm:grid-cols-3 gap-3">
            <Link to="/beneficiary/dashboard" className="group bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm hover:-translate-y-[1px] transition-all">
              <div className="text-xs font-semibold tracking-widest text-leaf">MAP</div>
              <div className="mt-1 font-semibold text-stone-900">Available nearby</div>
              <div className="text-sm text-stone-600 leading-relaxed">Sorted by distance · Carto Light map</div>
              <div className="mt-3 text-sm font-medium text-stone-900 inline-flex items-center gap-1">Open map <span>→</span></div>
            </Link>
            <Link to="/beneficiary/dashboard" className="group bg-sky-50 border border-sky-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-sm transition-all">
              <div className="text-xs font-semibold tracking-widest text-sky-700">CLAIMED</div>
              <div className="mt-1 font-semibold text-stone-900">My claimed food</div>
              <div className="text-sm text-stone-600 leading-relaxed">Pickup window + directions + status</div>
              <div className="mt-3 text-sm font-medium text-sky-700 inline-flex items-center gap-1">View claimed <span>→</span></div>
            </Link>
            <Link to="/how-it-works" className="group bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 transition-all">
              <div className="text-xs font-semibold tracking-widest text-stone-400">TRUST</div>
              <div className="mt-1 font-semibold text-stone-900">How verification works</div>
              <div className="text-sm text-stone-600 leading-relaxed">Verified kitchens · direct coordination</div>
              <div className="mt-3 text-sm font-medium text-stone-900 inline-flex items-center gap-1">Learn more <span>→</span></div>
            </Link>
          </section>
        </main>
        <footer className="border-t border-stone-200 bg-white mt-auto"><div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 text-sm text-stone-500 flex justify-between"><span>© 2026 FoodLoop · Beneficiary home</span><Link to="/terms" className="underline underline-offset-4">Terms</Link></div></footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col">
      <SEO
        title="FoodLoop — Good food shouldn't be wasted"
        description="Good food shouldn't be wasted. FoodLoop connects Kathmandu restaurants with surplus meals to verified community kitchens and shelters. Post a listing in one minute, find food nearby on a map, coordinate pickup directly."
        canonicalPath="/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Header transparent />

      <main className="flex-1">
        {/* HERO — slogan first, centered, airy — public only, no auth */}
        <section className="relative geometric-grid overflow-hidden">
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
      </main>

      <footer className="border-t border-stone-200 bg-white mt-auto">
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
