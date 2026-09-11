import { useState, useCallback } from 'react'
import type { Claim } from '../types'
import { mockClaims } from '../data/claims'

export function useClaims() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)

  const addClaim = useCallback((claim: Omit<Claim, 'id' | 'status' | 'requestedAt'>) => {
    const newClaim: Claim = {
      ...claim,
      id: `c${Date.now()}`,
      status: 'pending',
      requestedAt: new Date().toISOString()
    }
    setClaims(prev => [newClaim, ...prev])
    return newClaim
  }, [])

  const updateClaimStatus = useCallback((id: string, status: Claim['status']) => {
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }, [])

  const getClaimsForRestaurant = useCallback((restaurantId: string) => {
    return claims.filter(c => c.restaurantId === restaurantId)
  }, [claims])

  const getClaimsForNgo = useCallback((ngoId: string) => {
    return claims.filter(c => c.ngoId === ngoId)
  }, [claims])

  return { claims, addClaim, updateClaimStatus, getClaimsForRestaurant, getClaimsForNgo }
}
