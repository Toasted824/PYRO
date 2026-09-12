import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="Page Not Found — FoodLoop Kathmandu"
        description="The page you requested does not exist on FoodLoop. Find surplus food listings or learn how the Kathmandu sharing loop works."
        canonicalPath="/404"
        noIndex
      />
      <Header />
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-16 pb-16 text-center">
        <div className="inline-flex bg-white border border-stone-200 rounded-md px-3 py-1 text-xs font-semibold tracking-widest text-stone-500">404</div>
        <h1 className="mt-4 text-[34px] font-bold tracking-tight text-stone-900">This page is not on the loop</h1>
        <p className="mt-3 text-stone-600 leading-relaxed">The link may be incorrect, or the page has moved. You can browse current food listings or learn how FoodLoop works in Kathmandu Valley.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-leaf hover:bg-leaf-dark text-white font-medium px-6 py-2.5 rounded-lg">
            Go to home
          </Link>
          <Link to="/explore" className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-6 py-2.5 rounded-lg">
            Browse available food
          </Link>
          <Link to="/how-it-works" className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-6 py-2.5 rounded-lg">
            How it works
          </Link>
        </div>
        <div className="mt-8 text-sm text-stone-500">
          Need help? See <Link to="/terms" className="underline underline-offset-4 font-medium text-stone-700">Terms and Conditions</Link> or <Link to="/about" className="underline underline-offset-4 font-medium text-stone-700">About</Link>.
        </div>
      </div>
    </div>
  )
}
