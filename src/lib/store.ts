import { supabase } from './supabase'
import type { Donation, DonationStatus, User } from './types'

interface DonationRow {
  id: string
  restaurant_id: string
  restaurant_name: string
  food_type: string
  meals: number
  available_until: string
  pickup_location: string
  description: string | null
  status: string
  claimed_by: string | null
  claimed_by_name: string | null
  lat: number
  lng: number
  created_at: string
}

function normalizeStatus(s: string): DonationStatus {
  if (s === 'PICKUP' || s === 'DELIVERED') return 'PICKED_UP'
  if (s === 'PICKED_UP' || s === 'CLAIMED' || s === 'AVAILABLE') return s as DonationStatus
  return 'AVAILABLE'
}

function toDonation(row: DonationRow): Donation {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    restaurantName: row.restaurant_name,
    foodType: row.food_type,
    meals: row.meals,
    availableUntil: row.available_until,
    pickupLocation: row.pickup_location,
    description: row.description ?? undefined,
    status: normalizeStatus(row.status),
    claimedBy: row.claimed_by ?? undefined,
    claimedByName: row.claimed_by_name ?? undefined,
    lat: row.lat,
    lng: row.lng,
    createdAt: row.created_at,
  }
}

const DONATION_SELECT = 'id,restaurant_id,restaurant_name,food_type,meals,available_until,pickup_location,description,status,claimed_by,claimed_by_name,lat,lng,created_at'

export async function fetchDonations(): Promise<Donation[]> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  const { data, error } = await supabase
    .from('donations')
    .select(DONATION_SELECT)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) throw error
  return (data ?? []).map(toDonation)
}

export async function fetchRestaurantDonations(restaurantId: string): Promise<Donation[]> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  const { data, error } = await supabase
    .from('donations')
    .select(DONATION_SELECT)
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) throw error
  return (data ?? []).map(toDonation)
}

export interface NewDonation {
  restaurantId: string
  restaurantName: string
  foodType: string
  meals: number
  availableUntil: string
  pickupLocation: string
  description?: string
  lat: number
  lng: number
}

export async function createDonation(input: NewDonation): Promise<Donation> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  const { data, error } = await supabase
    .from('donations')
    .insert({
      restaurant_id: input.restaurantId,
      restaurant_name: input.restaurantName,
      food_type: input.foodType,
      meals: input.meals,
      available_until: input.availableUntil,
      pickup_location: input.pickupLocation,
      description: input.description || null,
      lat: input.lat,
      lng: input.lng,
    })
    .select()
    .single()
  if (error) throw error
  return toDonation(data as DonationRow)
}

export async function claimDonation(donationId: string, user: User): Promise<Donation> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  const { data, error } = await supabase
    .from('donations')
    .update({
      status: 'CLAIMED',
      claimed_by: user.id,
      claimed_by_name: user.name,
    })
    .eq('id', donationId)
    .eq('status', 'AVAILABLE')
    .select()
    .single()
  if (error) {
    const msg = error.message?.toLowerCase() ?? ''
    if (msg.includes('row') || msg.includes('0 rows') || msg.includes('not found')) {
      throw new Error('Sorry, someone else just claimed this donation')
    }
    throw error
  }
  if (!data) throw new Error('Sorry, someone else just claimed this donation')
  return toDonation(data as DonationRow)
}

export async function deleteDonation(donationId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  const { data, error } = await supabase
    .from('donations')
    .delete()
    .eq('id', donationId)
    .eq('status', 'AVAILABLE')
    .select()
  if (error) throw error
  if (!data || data.length === 0) throw new Error('Donation not found or already claimed — cannot delete')
}

export async function updateDonationStatus(donationId: string, status: DonationStatus): Promise<Donation> {
  if (!supabase) throw new Error('Supabase is not configured yet. Add your credentials in .env.')
  // Try with new status first
  let { data, error } = await supabase
    .from('donations')
    .update({ status })
    .eq('id', donationId)
    .select()
    .single()
  if (error) {
    const msg = error.message?.toLowerCase() ?? ''
    const isConstraint = msg.includes('check') || msg.includes('violates') || msg.includes('invalid input')
    // Fallback for DBs not yet migrated (still expects PICKUP/DELIVERED)
    if (isConstraint && status === 'PICKED_UP') {
      const fallback = 'DELIVERED' as unknown as string
      const retry = await supabase
        .from('donations')
        .update({ status: fallback })
        .eq('id', donationId)
        .select()
        .single()
      if (retry.error) {
        // surface helpful instruction
        throw new Error(retry.error.message + ' — Please run supabase/migrations/0002_merge_pickup_delivered.sql in Supabase SQL Editor.')
      }
      return toDonation(retry.data as DonationRow)
    }
    if (isConstraint) {
      throw new Error(error.message + ' — Please run supabase/migrations/0002_merge_pickup_delivered.sql in Supabase SQL Editor.')
    }
    throw error
  }
  return toDonation(data as DonationRow)
}

/** Subscribe to any change in the donations table. Returns an unsubscribe function. */
export function subscribeToDonations(onChange: () => void): () => void {
  const sb = supabase
  if (!sb) return () => {}
  const channel = sb
    .channel('donations-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => onChange())
    .subscribe()
  return () => {
    sb.removeChannel(channel)
  }
}