import { MapPin, Star, Phone, Globe, Clock, X, Navigation, Utensils } from 'lucide-react'
import { PhotoGallery } from '../map/PhotoGallery'
import type { Restaurant } from '../../types'

export function RestaurantDetail({ restaurant, onClose, onClaim }: { restaurant: Restaurant; onClose: () => void; onClaim: (r: Restaurant) => void }) {
  return (
    <div className="detail-panel">
      <button className="close-btn" onClick={onClose}><X size={20} /></button>
      <PhotoGallery images={restaurant.images} name={restaurant.name} />
      <div className="detail-content">
        <div className="detail-header">
          <h2>{restaurant.name}</h2>
          {restaurant.surplusAvailable && (
            <span className="surplus-tag">Surplus Available</span>
          )}
        </div>
        <div className="detail-rating">
          <Star size={18} /> <span>{restaurant.rating}</span>
          <span className="detail-price">{restaurant.priceRange}</span>
        </div>
        <div className="detail-tags">
          {restaurant.cuisine.map(c => <span key={c} className="tag">{c}</span>)}
        </div>
        <p className="detail-desc">{restaurant.description}</p>

        {restaurant.surplusAvailable && (
          <div className="surplus-section">
            <h4><Utensils size={16} /> Available Surplus</h4>
            <div className="surplus-items">
              {restaurant.surplusItems.map(item => (
                <span key={item} className="surplus-item">{item}</span>
              ))}
            </div>
            <button className="claim-btn" onClick={() => onClaim(restaurant)}>
              Claim Surplus
            </button>
          </div>
        )}

        <div className="detail-info">
          <div className="info-row"><MapPin size={16} /><span>{restaurant.address}</span></div>
          <div className="info-row"><Clock size={16} /><span>{restaurant.openHours}</span></div>
          {restaurant.phone && <div className="info-row"><Phone size={16} /><a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a></div>}
          {restaurant.website && <div className="info-row"><Globe size={16} /><a href={`https://${restaurant.website}`} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></div>}
          <div className="info-row"><Navigation size={16} /><span>{restaurant.lat.toFixed(4)}, {restaurant.lng.toFixed(4)}</span></div>
        </div>
      </div>
    </div>
  )
}
