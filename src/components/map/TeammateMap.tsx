// TEAMMATE MAP BOUNDARY
// Keep props contract stable: donations[], onMarkerClick(id), selectedId.
// Current impl: Leaflet + Carto Light (muted, low visual noise) — less buggy, less clutter.

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Donation } from '../../lib/types'
import { useEffect, useMemo, useRef } from 'react'
import { CENTER } from '../../lib/distance'
import { cartoTileUrl, cartoErrorTileUrl } from '../../lib/carto'

// Fix default icon once (outside component to avoid flash)
 // @ts-expect-error leaflet internals
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const iconCache = new Map<string, L.DivIcon>()
function iconFor(status: Donation['status']) {
  const cached = iconCache.get(status)
  if (cached) return cached
  const color = status === 'AVAILABLE' ? '#16A34A' : status === 'CLAIMED' ? '#F97316' : '#16A34A'
  const glyph = status === 'AVAILABLE' ? '●' : '✓'
  const html = `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 4px 10px rgba(0,0,0,0.18);display:grid;place-items:center;color:white;font-size:13px">${glyph}</div>`
  const icon = L.divIcon({ html, className: '', iconSize: [28, 28], iconAnchor: [14, 14] })
  iconCache.set(status, icon)
  return icon
}

const selectedIcon = L.divIcon({
  html: `<div style="width:34px;height:34px;background:#16A34A;border:3px solid white;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,0.22);display:grid;place-items:center;color:white;font-size:16px;position:relative" class="leaf-pulse">●</div>`,
  className: '',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
})

function MapController({ selectedId, donations }: { selectedId?: string | null; donations: Donation[] }) {
  const map = useMap()
  const pendingRef = useRef<string | null>(null)

  useEffect(() => {
    // invalidate on mount/resize — fixes grey tiles in flex containers
    const iv = setTimeout(() => map.invalidateSize(), 120)
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => map.invalidateSize()) : null
    if (ro) ro.observe(map.getContainer())
    return () => {
      clearTimeout(iv)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [map])

  useEffect(() => {
    if (!selectedId) return
    const d = donations.find((x) => x.id === selectedId)
    if (!d) return
    if (pendingRef.current === selectedId) return
    pendingRef.current = selectedId
    map.flyTo([d.lat, d.lng], Math.max(map.getZoom(), 14), { duration: 0.6 })
    const t = setTimeout(() => { pendingRef.current = null }, 800)
    return () => clearTimeout(t)
  }, [selectedId, donations, map])

  return null
}

export function TeammateMap({
  donations,
  onMarkerClick,
  selectedId,
}: {
  donations: Donation[]
  onMarkerClick?: (id: string) => void
  selectedId?: string | null
}) {
  const center: [number, number] = useMemo(() => [CENTER.lat, CENTER.lng], [])
  const availableCount = useMemo(() => donations.filter((d) => d.status === 'AVAILABLE').length, [donations])

  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-[#F7F5EF] relative">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%', background: '#F7F5EF' }}
        scrollWheelZoom
        doubleClickZoom
        zoomControl
        maxBounds={[[26.3, 82.5], [30.5, 88]]}
        maxBoundsViscosity={0.8}
        wheelDebounceTime={40}
        wheelPxPerZoomLevel={80}
      >
        {/* Carto Light — muted, low noise (uses VITE_CARTO_API_KEY via ?key=) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={cartoTileUrl('light_all')}
          subdomains={['a','b','c','d']}
          maxZoom={18}
          errorTileUrl={cartoErrorTileUrl('light_all')}
        />
        <MapController selectedId={selectedId} donations={donations} />
        {donations.map((d) => (
          <Marker
            key={d.id}
            position={[d.lat, d.lng]}
            icon={selectedId === d.id ? selectedIcon : iconFor(d.status)}
            eventHandlers={{ click: () => onMarkerClick?.(d.id) }}
            keyboard
            title={`${d.restaurantName} — ${d.foodType}, ${d.meals} meals`}
          >
            <Popup autoPan maxWidth={260} closeButton>
              <div className="text-sm min-w-[180px]">
                <div className="font-bold text-stone-900">{d.restaurantName}</div>
                <div className="text-stone-600">{d.foodType} • {d.meals} meals</div>
                <div className="text-xs text-stone-500">{d.pickupLocation}</div>
                <button
                  onClick={() => onMarkerClick?.(d.id)}
                  className="mt-2 w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-full px-3.5 py-1.5 text-xs font-medium shadow-sm border border-stone-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-leaf relative leaf-pulse" aria-hidden="true" /> {availableCount} available nearby
      </div>
      <div className="absolute bottom-3 right-3 bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded-full opacity-80">Kathmandu Valley · Carto Light</div>
    </div>
  )
}
