import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

export function Header({ transparent }: { transparent?: boolean }) {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className={`sticky top-0 z-40 border-b ${transparent ? 'bg-white/80 backdrop-blur border-stone-200' : 'bg-white border-stone-200'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold">
        Skip to content
      </a>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="FoodLoop logo" className="w-9 h-9 object-contain" />
          <span className="font-bold tracking-tight text-[19px] text-stone-900">FoodLoop</span>
          <span className="hidden sm:inline text-[11px] font-semibold tracking-widest text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
            Kathmandu Valley
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {!user ? (
            <>
              <Link to="/how-it-works" className="hidden md:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">
                How it works
              </Link>
              <Link to="/about" className="hidden md:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">
                About
              </Link>
              <Link to="/explore" className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">
                Explore
              </Link>
              <Link to="/login" className="text-sm font-medium text-stone-700 hover:text-stone-900 px-3 py-2">
                Log in
              </Link>
              <Link to="/join" className="inline-flex items-center justify-center bg-leaf hover:bg-leaf-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Join FoodLoop
              </Link>
            </>
          ) : (
            <>
              <span className="hidden md:inline-flex items-center gap-2 text-sm bg-stone-900 text-white px-3 py-1.5 rounded-md">
                {user.name}
              </span>
              <Link to={user.role === 'restaurant' ? '/restaurant/dashboard' : '/beneficiary/dashboard'} className="inline-flex text-sm font-medium bg-white border border-stone-200 px-4 py-2 rounded-lg hover:bg-stone-50 transition-colors">
                Dashboard
              </Link>
              <Link to={user.role === 'restaurant' ? '/restaurant/profile' : '/beneficiary/profile'} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-white border border-stone-200 px-4 py-2 rounded-lg hover:bg-stone-50 transition-colors">
                Profile
              </Link>
              <button onClick={() => { logout(); nav('/') }} className="text-sm font-medium text-stone-500 hover:text-stone-900 px-3 py-2">
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
