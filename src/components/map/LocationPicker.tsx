import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { motion, AnimatePresence } from 'motion/react'
import { searchNominatim, reverseNominatim, type NominatimResult } from '../../lib/nominatim'
import { CENTER } from '../../lib/distance'
import { cartoTileUrl, cartoErrorTileUrl } from '../../lib/carto'

export type LocationValue = {
  lat: number | null
  lng: number | null
  label: string
}

const pickedIcon = L.divIcon({
  html: `<div style="width:28px;height:28px;background:#16A34A;border:3px solid white;border-radius:50%;box-shadow:0 4px 10px rgba(0,0,0,0.18);display:grid;place-items:center;color:white;font-size:13px">●</div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function MapClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function Recenter({ lat, lng }: { lat: number | null; lng: number | null }) {
  const map = useMap()
  useEffect(() => {
    if (lat != null && lng != null) {
      map.flyTo([lat, lng], Math.max(map.getZoom(), 14), { duration: 0.5 })
      setTimeout(() => map.invalidateSize(), 100)
    }
  }, [lat, lng, map])
  return null
}

export function LocationPicker({
  value,
  onChange,
}: {
  value: LocationValue
  onChange: (v: LocationValue) => void
}) {
  const [query, setQuery] = useState(value.label)
  const [results, setResults] = useState<NominatimResult[]>([])
  const [searching, setSearching] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value.label)
  }, [value.label])

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2 || q === value.label) {
      setResults([])
      setOpen(false)
      return
    }
    setSearching(true)
    setError('')
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    const t = setTimeout(async () => {
      try {
        const data = await searchNominatim(q, ac.signal)
        if (!ac.signal.aborted) {
          setResults(data)
          setOpen(data.length > 0)
        }
      } catch (e: unknown) {
        if ((e as Error).name !== 'AbortError') setError('Search failed — try again')
      } finally {
        if (!ac.signal.aborted) setSearching(false)
      }
    }, 320)
    return () => {
      clearTimeout(t)
      ac.abort()
    }
  }, [query, value.label])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const pickResult = (r: NominatimResult) => {
    const lat = parseFloat(r.lat)
    const lng = parseFloat(r.lon)
    onChange({ lat, lng, label: r.display_name })
    setQuery(r.display_name)
    setOpen(false)
    setResults([])
    setError('')
  }

  const handleMapPick = async (lat: number, lng: number) => {
    const ac = new AbortController()
    try {
      const r = await reverseNominatim(lat, lng, ac.signal)
      onChange({ lat, lng, label: r.display_name })
      setQuery(r.display_name)
    } catch {
      onChange({ lat, lng, label: `${lat.toFixed(5)}, ${lng.toFixed(5)}` })
      setQuery(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
    }
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported in this browser')
      return
    }
    setGeoLoading(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const ac = new AbortController()
        try {
          const r = await reverseNominatim(lat, lng, ac.signal)
          onChange({ lat, lng, label: r.display_name })
          setQuery(r.display_name)
        } catch {
          onChange({ lat, lng, label: `${lat.toFixed(5)}, ${lng.toFixed(5)}` })
          setQuery(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        } finally {
          setGeoLoading(false)
        }
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === 1) setError('Location permission denied — search a landmark instead')
        else if (err.code === 2) setError('Location unavailable — try searching')
        else setError(err.message || 'Could not get location')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  const hasPin = value.lat != null && value.lng != null

  return (
    <div ref={containerRef} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm" aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value !== value.label && value.lat != null) {
                // keep pin until new selection, but allow typing
              }
            }}
            onFocus={() => {
              if (results.length) setOpen(true)
            }}
            placeholder="Search landmark, e.g. Thamel, Patan Dhoka, Boudha Stupa…"
            className="w-full rounded-xl border border-stone-200 bg-[#FFFBEB]/40 pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/20 focus:border-leaf"
            autoComplete="off"
          />
          {searching && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">…</span>}
          <AnimatePresence>
            {open && results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-20 max-h-[220px] overflow-auto"
              >
                {results.map((r) => (
                  <li key={r.place_id}>
                    <button
                      type="button"
                      onClick={() => pickResult(r)}
                      className="w-full text-left px-4 py-3 hover:bg-stone-50 text-sm leading-snug border-b border-stone-100 last:border-0"
                    >
                      <div className="font-medium text-stone-900 line-clamp-1">{r.display_name}</div>
                      <div className="text-xs text-stone-500 capitalize">{[r.type, r.address?.city || r.address?.town || r.address?.village].filter(Boolean).join(' · ')}</div>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={geoLoading}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white border border-stone-200 hover:bg-stone-50 disabled:bg-stone-100 text-stone-700 text-sm font-medium px-4 py-3 rounded-xl transition-colors"
        >
          <span className="text-base leading-none">◎</span> {geoLoading ? 'Locating…' : 'Use current location'}
        </button>
      </div>

      {error && <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{error}</div>}

      {hasPin ? (
        <div className="text-xs text-stone-600 bg-[#F0FDF4] border border-green-200 rounded-lg px-3 py-2">
          <span className="font-semibold text-leaf">Pin set:</span> {value.label} <span className="text-stone-400">· {value.lat!.toFixed(5)}, {value.lng!.toFixed(5)}</span>
        </div>
      ) : (
        <div className="text-xs text-stone-500">Scroll to zoom, click or drag pin to set location — you can also use your current location.</div>
      )}

      <div className="h-[220px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
        <MapContainer
          center={hasPin ? [value.lat!, value.lng!] : [CENTER.lat, CENTER.lng]}
          zoom={hasPin ? 15 : 12}
          style={{ height: '100%', width: '100%', background: '#F7F5EF' }}
          scrollWheelZoom
          wheelDebounceTime={40}
          wheelPxPerZoomLevel={80}
          doubleClickZoom
          zoomControl
        >
          <TileLayer
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url={cartoTileUrl('light_all')}
            subdomains={['a', 'b', 'c', 'd']}
            maxZoom={18}
            errorTileUrl={cartoErrorTileUrl('light_all')}
          />
          <MapClickHandler onPick={handleMapPick} />
          <Recenter lat={value.lat} lng={value.lng} />
          {hasPin && (
            <Marker
              position={[value.lat!, value.lng!]}
              icon={pickedIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const m = e.target as L.Marker
                  const { lat, lng } = m.getLatLng()
                  handleMapPick(lat, lng)
                },
              }}
            />
          )}
        </MapContainer>
      </div>
      <div className="text-[11px] text-stone-400">Powered by OpenStreetMap Nominatim — no manual coordinates needed.</div>
    </div>
  )
}
