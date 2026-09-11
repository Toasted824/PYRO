import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

export function Header({ transparent }: { transparent?: boolean }) {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${transparent ? 'bg-white/70 border-stone-200' : 'bg-white/90 border-stone-200'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#16A34A] grid place-items-center text-white text-[18px]">♻</span>
          <span className="font-black tracking-tight text-[22px] text-stone-900">FoodLoop</span>
          <span className="hidden sm:inline text-[12px] font-semibold tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full -ml-0">CONNECTING FOOD • COMMUNITY</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {!user ? (
            <>
              <Link to="/explore" className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">Explore food</Link>
              <Link to="/login" className="text-sm font-semibold text-stone-700 hover:text-stone-900 px-3 py-2">Log in</Link>
              <Link to="/join" className="inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition">Join FoodLoop</Link>
            </>
          ) : (
            <>
              <span className="hidden md:inline-flex items-center gap-2 text-sm bg-stone-900 text-white px-3 py-1.5 rounded-full">
                <span>{user.role === 'restaurant' ? '🍽️' : '🤝'}</span> {user.name}
                <span className="opacity-60 text-xs capitalize">• {user.role}</span>
              </span>
              <Link
                to={user.role === 'restaurant' ? '/restaurant/dashboard' : '/beneficiary/dashboard'}
                className="text-sm font-semibold bg-white border border-stone-200 px-4 py-2 rounded-full hover:bg-stone-50"
              >
                Dashboard
              </Link>
              <button onClick={() => { logout(); nav('/') }} className="text-sm font-medium text-stone-500 hover:text-stone-900 px-3 py-2">Log out</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
