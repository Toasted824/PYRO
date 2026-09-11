import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { Landing } from './pages/Landing'
import { Join } from './pages/Join'
import { Login } from './pages/Auth/Login'
import { RegisterRestaurant } from './pages/Auth/RegisterRestaurant'
import { RegisterBeneficiary } from './pages/Auth/RegisterBeneficiary'
import { CreateDonation } from './pages/Restaurant/CreateDonation'
import { RestaurantDashboard } from './pages/Restaurant/Dashboard'
import { BeneficiaryDashboard } from './pages/Beneficiary/Dashboard'
import { ToastHost } from './components/ui/Toast'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/restaurant" element={<RegisterRestaurant />} />
          <Route path="/register/beneficiary" element={<RegisterBeneficiary />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/new" element={<CreateDonation />} />
          <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
          <Route path="/explore" element={<BeneficiaryDashboard publicMode />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastHost />
      </BrowserRouter>
    </AuthProvider>
  )
}
