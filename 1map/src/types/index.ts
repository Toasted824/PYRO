export interface Restaurant {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  area: string
  city: string
  cuisine: string[]
  rating: number
  priceRange: string
  phone: string
  website: string
  openHours: string
  description: string
  images: string[]
  tags: string[]
  surplusAvailable: boolean
  surplusItems: string[]
}

export interface NgoReceiver {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  area: string
  phone: string
  description: string
  capacity: number
  accepts: string[]
}

export interface Claim {
  id: string
  restaurantId: string
  ngoId: string
  items: string[]
  servings: number
  status: 'pending' | 'accepted' | 'pickup' | 'delivered'
  requestedAt: string
  pickupTime: string
  notes: string
}

export type Theme = 'light' | 'dark'
