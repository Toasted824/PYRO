import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { RestaurantMarker, NgoMarker } from './Markers'
import type { Restaurant, NgoReceiver } from '../../types'

function FlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.2 })
    }
  }, [center, map])
  return null
}

function MapResizer() {
  const map = useMap()
  useEffect(() => {
    const t1 = setTimeout(() => map.invalidateSize(), 300)
    const t2 = setTimeout(() => map.invalidateSize(), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [map])
  return null
}

interface FoodMapProps {
  restaurants: Restaurant[]
  ngos: NgoReceiver[]
  flyTo: [number, number] | null
  onRestaurantClick: (r: Restaurant) => void
  onNgoClick: (n: NgoReceiver) => void
  mapLayer: 'standard' | 'minimal'
}

export function FoodMap({ restaurants, ngos, flyTo, onRestaurantClick, onNgoClick, mapLayer }: FoodMapProps) {
  const center: [number, number] = [27.6985, 85.3195]
  const tileUrl = mapLayer === 'standard'
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={tileUrl} subdomains="abcd" maxZoom={20} />
        <MapResizer />
        <FlyTo center={flyTo} />
        {restaurants.map(r => (
          <RestaurantMarker key={r.id} restaurant={r} onClick={() => onRestaurantClick(r)} />
        ))}
        {ngos.map(n => (
          <NgoMarker key={n.id} ngo={n} onClick={() => onNgoClick(n)} />
        ))}
      </MapContainer>
    </div>
  )
}
