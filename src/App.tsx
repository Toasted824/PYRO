import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { AuthProvider } from './lib/auth'
import { ToastHost } from './components/ui/Toast'

const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })))
const HowItWorks = lazy(() => import('./pages/HowItWorks').then(m => ({ default: m.HowItWorks })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Impact = lazy(() => import('./pages/Impact').then(m => ({ default: m.Impact })))
const Join = lazy(() => import('./pages/Join').then(m => ({ default: m.Join })))
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })))
const Login = lazy(() => import('./pages/Auth/Login').then(m => ({ default: m.Login })))
const RegisterRestaurant = lazy(() => import('./pages/Auth/RegisterRestaurant').then(m => ({ default: m.RegisterRestaurant })))
const RegisterBeneficiary = lazy(() => import('./pages/Auth/RegisterBeneficiary').then(m => ({ default: m.RegisterBeneficiary })))
const CreateDonation = lazy(() => import('./pages/Restaurant/CreateDonation').then(m => ({ default: m.CreateDonation })))
const RestaurantDashboard = lazy(() => import('./pages/Restaurant/Dashboard').then(m => ({ default: m.RestaurantDashboard })))
const BeneficiaryDashboard = lazy(() => import('./pages/Beneficiary/Dashboard').then(m => ({ default: m.BeneficiaryDashboard })))
const BeneficiaryProfile = lazy(() => import('./pages/Beneficiary/Profile').then(m => ({ default: m.BeneficiaryProfile })))
const RestaurantProfile = lazy(() => import('./pages/Restaurant/Profile').then(m => ({ default: m.RestaurantProfile })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

function Fallback() {
  return <div className="min-h-screen bg-[#FFFBEB] grid place-items-center text-sm text-stone-500">Loading…</div>
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/join" element={<Join />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/restaurant" element={<RegisterRestaurant />} />
          <Route path="/register/beneficiary" element={<RegisterBeneficiary />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/new" element={<CreateDonation />} />
          <Route path="/restaurant/profile" element={<RestaurantProfile />} />
          <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
          <Route path="/beneficiary/profile" element={<BeneficiaryProfile />} />
          <Route path="/explore" element={<BeneficiaryDashboard publicMode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <main id="main-content">
          <AnimatedRoutes />
        </main>
      </Suspense>
        <ToastHost />
      </BrowserRouter>
    </AuthProvider>
  )
}
