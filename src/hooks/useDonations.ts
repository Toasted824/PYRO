import { useCallback, useEffect, useState } from 'react'
import { fetchDonations, subscribeToDonations } from '../lib/store'
import type { Donation } from '../lib/types'

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setDonations(await fetchDonations())
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not load donations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const unsubscribe = subscribeToDonations(load)
    const iv = setInterval(load, 15000)
    return () => {
      unsubscribe()
      clearInterval(iv)
    }
  }, [load])

  return { donations, loading, error, reload: load }
}