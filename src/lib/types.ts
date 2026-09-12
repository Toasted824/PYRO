export type Role = 'restaurant' | 'beneficiary'
export type DonationStatus = 'AVAILABLE' | 'CLAIMED' | 'PICKED_UP'
// Legacy statuses kept for backward compatibility with DB rows not yet migrated
export type LegacyDonationStatus = DonationStatus | 'PICKUP' | 'DELIVERED'

export interface User {
  id: string
  role: Role
  name: string
  location: string
  contact: string
  email: string
}

export type Perishability = 'perishable' | 'non_perishable'

export interface Donation {
  id: string
  restaurantId: string
  restaurantName: string
  foodType: string
  perishability: Perishability
  meals: number
  availableUntil: string
  pickupLocation: string
  description?: string
  status: DonationStatus
  claimedBy?: string
  claimedByName?: string
  lat: number
  lng: number
  createdAt: string
}

export const FOOD_TYPES = [
  'Cooked Meals',
  'Bakery & Bread',
  'Fresh Produce',
  'Dairy',
  'Packaged Food',
  'Mixed Surplus',
] as const

export const FOOD_TYPE_DEFAULT_PERISHABILITY: Record<string, Perishability> = {
  'Cooked Meals': 'perishable',
  'Bakery & Bread': 'perishable',
  'Fresh Produce': 'perishable',
  'Dairy': 'perishable',
  'Packaged Food': 'non_perishable',
  'Mixed Surplus': 'perishable',
}
