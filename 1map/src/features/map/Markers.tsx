import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import type { Restaurant } from '../../types'

export function RestaurantIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:40px"><svg width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.3 21.7 0 14 0z" fill="#22c55e"/><circle cx="14" cy="13" r="7" fill="white"/><text x="14" y="17" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">R</text></svg></div>`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  })
}

export function NgoIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:40px"><svg width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.3 21.7 0 14 0z" fill="#3b82f6"/><circle cx="14" cy="13" r="7" fill="white"/><text x="14" y="17" text-anchor="middle" font-size="11" fill="#3b82f6" font-weight="bold">N</text></svg></div>`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  })
}

export function RestaurantMarker({ restaurant, onClick }: { restaurant: Restaurant; onClick: () => void }) {
  return (
    <Marker
      position={[restaurant.lat, restaurant.lng]}
      icon={RestaurantIcon()}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="popup-content">
          <strong>{restaurant.name}</strong>
          <span>{restaurant.area}</span>
          <span>{restaurant.cuisine.join(' · ')}</span>
          {restaurant.surplusAvailable && <span className="popup-surplus">Surplus available</span>}
        </div>
      </Popup>
    </Marker>
  )
}

export function NgoMarker({ ngo, onClick }: { ngo: { id: string; name: string; lat: number; lng: number; area: string }; onClick: () => void }) {
  return (
    <Marker
      position={[ngo.lat, ngo.lng]}
      icon={NgoIcon()}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="popup-content">
          <strong>{ngo.name}</strong>
          <span>{ngo.area}</span>
        </div>
      </Popup>
    </Marker>
  )
}
