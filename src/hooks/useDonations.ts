import { useCallback, useEffect, useState } from 'react'
import { fetchDonations, fetchRestaurantDonations, subscribeToDonations } from '../lib/store'
import type { Donation } from '../lib/types'

export function useDonations(restaurantId?: string) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setDonations(restaurantId ? await fetchRestaurantDonations(restaurantId) : await fetchDonations())
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not load donations')
    } finally {
      setLoading(false)
    }
  }, [restaurantId])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setLoading(true)
        const data = restaurantId ? await fetchRestaurantDonations(restaurantId) : await fetchDonations()
        if (!cancelled) {
          setDonations(data)
          setError('')
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load donations')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    const unsubscribe = subscribeToDonations(run)
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [load])

  return { donations, loading, error, reload: load }
}