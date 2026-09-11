import type { Claim } from '../types'

export const mockClaims: Claim[] = [
  {
    id: 'c001', restaurantId: 'r001', ngoId: 'n001',
    items: ['Margherita Pizza x4', 'Garlic Bread x2'],
    servings: 8, status: 'delivered',
    requestedAt: '2026-09-10T08:30:00', pickupTime: '2026-09-10T10:00:00',
    notes: 'Extra cheese, still warm'
  },
  {
    id: 'c002', restaurantId: 'r003', ngoId: 'n002',
    items: ['Falafel Platter x6', 'Hummus x3'],
    servings: 12, status: 'pickup',
    requestedAt: '2026-09-10T09:15:00', pickupTime: '2026-09-10T11:30:00',
    notes: 'Vegetarian only'
  },
  {
    id: 'c003', restaurantId: 'r016', ngoId: 'n003',
    items: ['Chicken Momos x10', 'Thukpa x5'],
    servings: 15, status: 'accepted',
    requestedAt: '2026-09-10T10:00:00', pickupTime: '2026-09-10T13:00:00',
    notes: 'For evening distribution'
  },
  {
    id: 'c004', restaurantId: 'r010', ngoId: 'n001',
    items: ['Pepperoni Pizza x3', 'Caesar Salad x2'],
    servings: 6, status: 'pending',
    requestedAt: '2026-09-10T11:45:00', pickupTime: '2026-09-10T14:00:00',
    notes: 'Lunch service needs'
  },
  {
    id: 'c005', restaurantId: 'r019', ngoId: 'n004',
    items: ['Croissants x12', 'Muffins x8'],
    servings: 20, status: 'delivered',
    requestedAt: '2026-09-09T07:00:00', pickupTime: '2026-09-09T08:30:00',
    notes: 'Morning snack for kids'
  }
]
