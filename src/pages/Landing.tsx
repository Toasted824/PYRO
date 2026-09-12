import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export function Landing() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header transparent />
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" /> Real surplus food, shared live with the community
            </div>
            <h1 className="mt-4 text-[40px] sm:text-[56px] font-black leading-[0.9] tracking-tight text-stone-900">
              Surplus food,<br />
              <span className="text-[#16A34A]">shared</span> with<br />
              community.
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-stone-600 max-w-[560px]">
              Restaurants have food. Beneficiaries need food. <span className="font-semibold text-stone-900">FoodLoop connects them</span> — instantly, nearby, with dignity.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/join" className="inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold px-8 py-3.5 rounded-full shadow-md transition text-[16px]">
                Join FoodLoop →
              </Link>
              <Link to="/explore" className="inline-flex items-center justify-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-900 font-bold px-8 py-3.5 rounded-full transition">
                Explore available food
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-full bg-white border border-stone-200 grid place-items-center text-xs">✓</span> Free to join</span>
              <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-full bg-white border border-stone-200 grid place-items-center text-xs">✓</span> 2-min setup</span>
              <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-full bg-white border border-stone-200 grid place-items-center text-xs">✓</span> No waste</span>
            </div>
          </div>

          {/* Story visual */}
          <div className="bg-white rounded-[32px] border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[#FFFBEB] border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full tracking-widest">THE FOODLOOP STORY</div>
            </div>
            <div className="mt-6 relative flex flex-col items-center">
              {/* Restaurant */}
              <div className="w-full bg-[#FFF7ED] border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-amber-200 grid place-items-center text-xl">🍽️</div>
                <div className="flex-1">
                  <div className="font-extrabold text-stone-900 leading-none">RESTAURANT</div>
                  <div className="text-xs text-amber-800 font-medium">has surplus food</div>
                </div>
                <div className="text-xs font-bold bg-white border border-amber-200 px-2.5 py-1 rounded-full">live surplus</div>
              </div>

              <div className="flex flex-col items-center py-1">
                <div className="w-[2px] h-6 bg-amber-300" />
                <div className="bg-[#F97316] text-white text-[10px] font-extrabold tracking-widest px-2 py-0.5 rounded-full">surplus food ↓</div>
                <div className="w-[2px] h-6 bg-[#16A34A]" />
              </div>

              <div className="w-[86%] bg-[#16A34A] rounded-2xl p-4 flex items-center gap-3 text-white shadow-md relative">
                <div className="w-12 h-12 rounded-xl bg-white/20 grid place-items-center text-xl backdrop-blur">♻</div>
                <div className="flex-1">
                  <div className="font-black tracking-widest text-sm">FOODLOOP</div>
                  <div className="text-xs font-medium opacity-90">connects • matches • tracks</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-[#16A34A] grid place-items-center font-bold">✓</div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-[#16A34A] rounded-r-lg hidden sm:block" />
              </div>

              <div className="flex flex-col items-center py-1">
                <div className="w-[2px] h-6 bg-[#16A34A]" />
                <div className="bg-[#16A34A] text-white text-[10px] font-extrabold tracking-widest px-2 py-0.5 rounded-full">nearby match ↓</div>
                <div className="w-[2px] h-6 bg-sky-300" />
              </div>

              <div className="w-full bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-sky-200 grid place-items-center text-xl">🤝</div>
                <div className="flex-1">
                  <div className="font-extrabold text-stone-900 leading-none">BENEFICIARY</div>
                  <div className="text-xs text-sky-700 font-medium">finds food nearby</div>
                </div>
                <div className="text-xs font-bold bg-sky-500 text-white px-2.5 py-1 rounded-full">found nearby</div>
              </div>

              <div className="w-[2px] h-6 bg-sky-200" />
              <div className="w-full bg-stone-900 rounded-2xl p-3 flex items-center justify-center gap-2 text-white">
                <span className="text-sm">🏘️</span>
                <span className="font-extrabold tracking-widest text-xs">COMMUNITY • NO WASTE • IMPACT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-14">
        <div className="bg-white rounded-[24px] border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📱', title: 'Restaurant shares', desc: 'Post surplus in 30 seconds: food type, meals, pickup time.' },
              { n: '02', icon: '🗺️', title: 'Beneficiary discovers', desc: 'Nearby food appears instantly on the FoodLoop map.' },
              { n: '03', icon: '✓', title: 'Loop completed', desc: 'Claim → Pickup → Delivered. Both sides track impact.' },
            ].map(s => (
              <div key={s.n} className="relative bg-[#FFFBEB] rounded-2xl p-5 border border-amber-100">
                <div className="text-[11px] font-black tracking-widest text-amber-600">{s.n}</div>
                <div className="mt-2 w-10 h-10 rounded-xl bg-white border border-stone-200 grid place-items-center">{s.icon}</div>
                <div className="mt-3 font-bold text-stone-900">{s.title}</div>
                <div className="text-sm text-stone-600 mt-1 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-stone-900 rounded-2xl p-4 sm:p-5 text-white">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center">🎯</span>
              <div>
                <div className="font-bold leading-none">Surplus food deserves a second life</div>
                <div className="text-xs opacity-70">Create an account, share real surplus, and track every meal end-to-end.</div>
              </div>
            </div>
            <Link to="/join" className="bg-white text-stone-900 font-extrabold px-6 py-2.5 rounded-full text-sm hover:bg-stone-100 transition">Join the loop →</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/60 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between text-xs text-stone-500">
          <span>© 2026 FoodLoop • Restaurants have food. Beneficiaries need food. FoodLoop connects them.</span>
          <span className="hidden sm:inline">Made for community • Kathmandu</span>
        </div>
      </footer>
    </div>
  )
}
