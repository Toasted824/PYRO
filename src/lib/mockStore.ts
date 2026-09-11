import type { Donation, User } from './types'

const USERS_KEY = 'foodloop_users'
const DONATIONS_KEY = 'foodloop_donations'
const SESSION_KEY = 'foodloop_session'

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36)
}

function seedDonations(): Donation[] {
  const now = Date.now()
  return [
    {
      id: 'd1',
      restaurantId: 'seed-r1',
      restaurantName: 'Kathmandu Kitchen',
      foodType: 'Cooked Meals',
      meals: 20,
      availableUntil: new Date(now + 1000 * 60 * 60 * 3).toISOString(),
      pickupLocation: 'Thamel, Kathmandu',
      description: 'Fresh dal bhat, curry and rice - prepared today, surplus from lunch service.',
      status: 'AVAILABLE',
      lat: 27.715,
      lng: 85.312,
      createdAt: new Date(now - 1000 * 60 * 20).toISOString(),
    },
    {
      id: 'd2',
      restaurantId: 'seed-r2',
      restaurantName: 'Patan Bakery House',
      foodType: 'Bakery & Bread',
      meals: 12,
      availableUntil: new Date(now + 1000 * 60 * 60 * 5).toISOString(),
      pickupLocation: 'Patan Dhoka, Lalitpur',
      description: 'Assorted breads, croissants and pastries. Still warm!',
      status: 'AVAILABLE',
      lat: 27.673,
      lng: 85.325,
      createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'd3',
      restaurantId: 'seed-r3',
      restaurantName: 'Boudha Mo:Mo Corner',
      foodType: 'Mixed Surplus',
      meals: 18,
      availableUntil: new Date(now + 1000 * 60 * 60 * 2).toISOString(),
      pickupLocation: 'Boudhanath Stupa Gate',
      description: 'Veg mo:mo, chowmein and soup - perfect for community meal.',
      status: 'AVAILABLE',
      lat: 27.721,
      lng: 85.362,
      createdAt: new Date(now - 1000 * 60 * 10).toISOString(),
    },
    {
      id: 'd4',
      restaurantId: 'seed-r1',
      restaurantName: 'Kathmandu Kitchen',
      foodType: 'Fresh Produce',
      meals: 8,
      availableUntil: new Date(now + 1000 * 60 * 60 * 6).toISOString(),
      pickupLocation: 'Thamel, Kathmandu',
      description: 'Fresh vegetables - tomatoes, spinach, carrots.',
      status: 'CLAIMED',
      claimedBy: 'seed-b1',
      claimedByName: 'Community Kitchen Patan',
      lat: 27.718,
      lng: 85.31,
      createdAt: new Date(now - 1000 * 60 * 120).toISOString(),
    },
  ]
}

function ensureSeed() {
  const existing = load<Donation[] | null>(DONATIONS_KEY, null)
  if (!existing || existing.length === 0) {
    const seeded = seedDonations()
    save(DONATIONS_KEY, seeded)
    return seeded
  }
  return existing
}

export const mockStore = {
  getUsers(): User[] {
    return load<User[]>(USERS_KEY, [])
  },
  getDonations(): Donation[] {
    return ensureSeed()
  },
  saveUsers(users: User[]) {
    save(USERS_KEY, users)
  },
  saveDonations(donations: Donation[]) {
    save(DONATIONS_KEY, donations)
    window.dispatchEvent(new Event('foodloop:donations'))
  },
  createUser(user: Omit<User, 'id'>): User {
    const users = this.getUsers()
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      throw new Error('Email already registered')
    }
    const newUser: User = { ...user, id: uid() }
    users.push(newUser)
    this.saveUsers(users)
    return newUser
  },
  findUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
  },
  createDonation(data: Omit<Donation, 'id' | 'createdAt' | 'status'>): Donation {
    const donations = this.getDonations()
    const d: Donation = {
      ...data,
      id: uid(),
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
    }
    donations.unshift(d)
    this.saveDonations(donations)
    return d
  },
  claimDonation(donationId: string, beneficiaryId: string, beneficiaryName: string) {
    const donations = this.getDonations()
    const d = donations.find(x => x.id === donationId)
    if (!d) throw new Error('Donation not found')
    if (d.status !== 'AVAILABLE') throw new Error('Already claimed')
    d.status = 'CLAIMED'
    d.claimedBy = beneficiaryId
    d.claimedByName = beneficiaryName
    this.saveDonations(donations)
    return d
  },
  updateStatus(donationId: string, status: Donation['status']) {
    const donations = this.getDonations()
    const d = donations.find(x => x.id === donationId)
    if (!d) throw new Error('Not found')
    d.status = status
    this.saveDonations(donations)
    return d
  },
  getSession(): User | null {
    return load<User | null>(SESSION_KEY, null)
  },
  setSession(user: User | null) {
    if (user) save(SESSION_KEY, user)
    else localStorage.removeItem(SESSION_KEY)
    window.dispatchEvent(new Event('foodloop:auth'))
  },
  clearAll() {
    localStorage.removeItem(USERS_KEY)
    localStorage.removeItem(DONATIONS_KEY)
    localStorage.removeItem(SESSION_KEY)
  },
}
