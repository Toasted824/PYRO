export type NominatimResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address: Record<string, string>
  type?: string
  class?: string
}

export async function searchNominatim(q: string, signal: AbortSignal): Promise<NominatimResult[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`
  const res = await fetch(url, {
    signal,
    headers: { 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error('Search failed')
  const data = (await res.json()) as NominatimResult[]
  return data
}

export async function reverseNominatim(lat: number, lng: number, signal: AbortSignal): Promise<NominatimResult> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&lon=${lng}&zoom=18`
  const res = await fetch(url, {
    signal,
    headers: { 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error('Reverse geocode failed')
  const data = (await res.json()) as NominatimResult
  return data
}
