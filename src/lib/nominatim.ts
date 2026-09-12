export type NominatimResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address: Record<string, string>
  type?: string
  class?: string
}

const SEARCH_CACHE = new Map<string, { ts: number; data: NominatimResult[] }>()
const REVERSE_CACHE = new Map<string, { ts: number; data: NominatimResult }>()
const CACHE_TTL = 5 * 60 * 1000

export async function searchNominatim(q: string, signal: AbortSignal): Promise<NominatimResult[]> {
  const key = q.trim().toLowerCase()
  const cached = SEARCH_CACHE.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`
  const res = await fetch(url, {
    signal,
    headers: { 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error('Search failed')
  const data = (await res.json()) as NominatimResult[]
  SEARCH_CACHE.set(key, { ts: Date.now(), data })
  // cap cache size
  if (SEARCH_CACHE.size > 50) {
    const first = SEARCH_CACHE.keys().next().value as string
    SEARCH_CACHE.delete(first)
  }
  return data
}

export async function reverseNominatim(lat: number, lng: number, signal: AbortSignal): Promise<NominatimResult> {
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}`
  const cached = REVERSE_CACHE.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&lon=${lng}&zoom=18`
  const res = await fetch(url, {
    signal,
    headers: { 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error('Reverse geocode failed')
  const data = (await res.json()) as NominatimResult
  REVERSE_CACHE.set(key, { ts: Date.now(), data })
  if (REVERSE_CACHE.size > 50) {
    const first = REVERSE_CACHE.keys().next().value as string
    REVERSE_CACHE.delete(first)
  }
  return data
}
