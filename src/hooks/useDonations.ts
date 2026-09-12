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
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const fetchOnce = async () => {
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
    fetchOnce()
    const onChange = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => { fetchOnce() }, 350)
    }
    const unsubscribe = subscribeToDonations(onChange)
    return () => {
      cancelled = true
      if (debounceTimer) clearTimeout(debounceTimer)
      unsubscribe()
    }
  }, [restaurantId, load])

  return { donations, loading, error, reload: load }
}