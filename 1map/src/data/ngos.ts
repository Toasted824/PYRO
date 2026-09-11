import type { NgoReceiver } from '../types'

export const ngos: NgoReceiver[] = [
  {
    id: 'n001', name: 'Kathmandu Food Rescue', lat: 27.7080, lng: 85.3150,
    address: 'Thamel, Kathmandu', area: 'Thamel', phone: '+977-9801234567',
    description: 'Community kitchen serving 200+ meals daily to street children.',
    capacity: 200, accepts: ['prepared-meals', 'bakery', 'packaged']
  },
  {
    id: 'n002', name: 'Boudha Community Kitchen', lat: 27.7210, lng: 85.3610,
    address: 'Boudhanath, Kathmandu', area: 'Boudha', phone: '+977-9802345678',
    description: 'Feeds monks and local families near the stupa.',
    capacity: 150, accepts: ['prepared-meals', 'fresh-produce', 'dairy']
  },
  {
    id: 'n003', name: 'Patan Welfare Trust', lat: 27.6730, lng: 85.3250,
    address: 'Patan, Lalitpur', area: 'Patan', phone: '+977-9803456789',
    description: 'Supports elderly and disabled residents with daily meals.',
    capacity: 100, accepts: ['prepared-meals', 'bakery', 'beverages']
  },
  {
    id: 'n004', name: 'Lalitpur Youth Foundation', lat: 27.6850, lng: 85.3200,
    address: 'Jawalakhel, Lalitpur', area: 'Jawalakhel', phone: '+977-9804567890',
    description: 'After-school meal program for underprivileged children.',
    capacity: 120, accepts: ['prepared-meals', 'fresh-produce', 'packaged']
  },
  {
    id: 'n005', name: 'Kathmandu Homeless Shelter', lat: 27.7040, lng: 85.3080,
    address: 'Asan, Kathmandu', area: 'Asan', phone: '+977-9805678901',
    description: 'Shelter and meals for 80+ homeless individuals nightly.',
    capacity: 80, accepts: ['prepared-meals', 'bakery', 'dairy', 'beverages']
  }
]
