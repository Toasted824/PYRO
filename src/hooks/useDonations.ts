import { useCallback, useEffect, useState } from 'react'
import { fetchDonations, fetchRestaurantDonations, subscribeToDonations } from '../lib/store'
import type { Donation } from '../lib/types'

export function useDonations(restaurantId?: string) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setDonations(restaurantId ? await fetchRestaurantDonations(restaurantId) : await fetchDonations())
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not load donations')
    } finally {
      setLoading(false)
    }
  }, [restaurantId])

  useEffect(() => {
    load()
    const unsubscribe = subscribeToDonations(load)
    return () => {
      unsubscribe()
    }
  }, [load])

  return { donations, loading, error, reload: load }
}