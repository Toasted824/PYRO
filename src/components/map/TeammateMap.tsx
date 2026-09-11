// TEAMMATE MAP BOUNDARY
// This file is the integration point for the teammate-built map.
// Keep the props contract stable: donations[], onMarkerClick(id), selectedId, center.
// Replace internals with Mapbox/Google Maps without touching callers.
// Current impl uses Leaflet + OpenStreetMap as polished placeholder.

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Donation } from '../../lib/types'
import { useEffect } from 'react'

const iconFor = (status: Donation['status']) => {
  const color = status === 'AVAILABLE' ? '#16A34A' : status === 'CLAIMED' ? '#F97316' : status === 'PICKUP' ? '#0EA5E9' : '#6B7280'
  const html = `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 4px 10px rgba(0,0,0,0.2);display:grid;place-items:center;color:white;font-size:13px">${status === 'AVAILABLE' ? '●' : '✓'}</div>`
  return L.divIcon({ html, className: '', iconSize: [28, 28], iconAnchor: [14, 14] })
}

const selectedIcon = L.divIcon({
  html: `<div style="width:34px;height:34px;background:#16A34A;border:3px solid white;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,0.25);display:grid;place-items:center;color:white;font-size:16px;animation:pulse 1.5s infinite">●</div><style>@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(22,163,74,0.4)} 70%{box-shadow:0 0 0 10px rgba(22,163,74,0)} 100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}</style>`,
  className: '',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
})

export function TeammateMap({
  donations,
  onMarkerClick,
  selectedId,
}: {
  donations: Donation[]
  onMarkerClick?: (id: string) => void
  selectedId?: string | null
}) {
  useEffect(() => {
    // fix leaflet default icon missing in vite
    // @ts-expect-error leaflet internals
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const center: [number, number] = donations.length
    ? [donations[0].lat, donations[0].lng]
    : [27.7172, 85.324]

  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 relative">
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {donations.map(d => (
          <Marker
            key={d.id}
            position={[d.lat, d.lng]}
            icon={selectedId === d.id ? selectedIcon : iconFor(d.status)}
            eventHandlers={{ click: () => onMarkerClick?.(d.id) }}
          >
            <Popup>
              <div className="text-sm min-w-[180px]">
                <div className="font-bold">{d.restaurantName}</div>
                <div className="text-stone-600">{d.foodType} • {d.meals} meals</div>
                <div className="text-xs text-stone-500">{d.pickupLocation}</div>
                <button
                  onClick={() => onMarkerClick?.(d.id)}
                  className="mt-2 w-full bg-[#16A34A] text-white text-xs font-bold py-1.5 rounded-full"
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 text-xs font-semibold shadow border border-stone-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" /> {donations.filter(d=>d.status==='AVAILABLE').length} available nearby
      </div>
      <div className="absolute bottom-3 right-3 bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded-full opacity-80">Existing map • teammate integration</div>
    </div>
  )
}
