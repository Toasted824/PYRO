export type Role = 'restaurant' | 'beneficiary'
export type DonationStatus = 'AVAILABLE' | 'CLAIMED' | 'PICKUP' | 'DELIVERED'

export interface User {
  id: string
  role: Role
  name: string
  location: string
  contact: string
  email: string
  password: string
}

export interface Donation {
  id: string
  restaurantId: string
  restaurantName: string
  foodType: string
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
