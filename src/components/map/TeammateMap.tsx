// TEAMMATE MAP BOUNDARY
// Keep props contract stable: donations[], onMarkerClick(id), selectedId.
// Current impl: Leaflet + Carto Light (muted, low visual noise) — less buggy, less clutter.

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Supercluster from 'supercluster'
import type { Donation } from '../../lib/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CENTER } from '../../lib/distance'
import { cartoTileUrl, cartoErrorTileUrl } from '../../lib/carto'

// Custom DivIcons only — no default marker fetch (avoids extra unpkg DNS/TLS)

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

const clusterIconCache = new Map<number, L.DivIcon>()
function clusterIcon(count: number) {
  const cached = clusterIconCache.get(count)
  if (cached) return cached
  const size = count < 10 ? 36 : count < 25 ? 42 : 48
  const html = `<div style="width:${size}px;height:${size}px;background:#16A34A;border:3px solid white;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,0.22);display:grid;place-items:center;color:white;font-weight:800;font-size:${count < 10 ? 14 : 13}px">${count}</div>`
  const icon = L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
  clusterIconCache.set(count, icon)
  return icon
}

type ClusterFeature = {
  type: 'Feature'
  geometry: { type: 'Point'; coordinates: [number, number] }
  properties: { cluster?: boolean; cluster_id?: number; point_count?: number; donationId?: string }
}

function ClusterLayer({ donations, onMarkerClick, selectedId }: { donations: Donation[]; onMarkerClick?: (id: string) => void; selectedId?: string | null }) {
  const map = useMap()
  const [zoom, setZoom] = useState(() => map.getZoom())
  const [bounds, setBounds] = useState<[number, number, number, number]>(() => {
    const b = map.getBounds()
    return [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]
  })

  const index = useMemo(() => {
    const sc = new Supercluster({ radius: 56, maxZoom: 16, minPoints: 2 })
    const points: ClusterFeature[] = donations.map(d => ({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: [d.lng, d.lat] as [number, number] },
      properties: { donationId: d.id },
    }))
    sc.load(points as never)
    return sc
  }, [donations])

  const update = useCallback(() => {
    setZoom(map.getZoom())
    const b = map.getBounds()
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()])
  }, [map])

  useMapEvents({
    moveend: update,
    zoomend: update,
  })

  useEffect(() => { update() }, [update, donations])

  const clusters = useMemo(() => {
    try {
      return index.getClusters(bounds, Math.round(zoom)) as ClusterFeature[]
    } catch {
      return []
    }
  }, [index, bounds, zoom])

  const donationById = useMemo(() => {
    const m = new Map<string, Donation>()
    donations.forEach(d => m.set(d.id, d))
    return m
  }, [donations])

  return (
    <>
      {clusters.map(feat => {
        const [lng, lat] = feat.geometry.coordinates
        const isCluster = !!feat.properties.cluster
        if (isCluster) {
          const count = feat.properties.point_count!
          const id = feat.properties.cluster_id!
          return (
            <Marker
              key={`c-${id}`}
              position={[lat, lng]}
              icon={clusterIcon(count)}
              eventHandlers={{
                click: () => {
                  try {
                    const expansionZoom = Math.min(index.getClusterExpansionZoom(id), 16)
                    map.flyTo([lat, lng], expansionZoom, { duration: 0.5 })
                  } catch {
                    map.flyTo([lat, lng], Math.min(zoom + 2, 16), { duration: 0.5 })
                  }
                },
              }}
            />
          )
        }
        const donationId = feat.properties.donationId!
        const d = donationById.get(donationId)
        if (!d) return null
        return (
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
        )
      })}
    </>
  )
}

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
        <ClusterLayer donations={donations} onMarkerClick={onMarkerClick} selectedId={selectedId} />
      </MapContainer>
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-full px-3.5 py-1.5 text-xs font-medium shadow-sm border border-stone-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-leaf relative leaf-pulse" aria-hidden="true" /> {availableCount} available nearby
      </div>
      <div className="absolute bottom-3 right-3 bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded-full opacity-80">Kathmandu Valley · Carto Light</div>
    </div>
  )
}
