import { MapPin, Star } from 'lucide-react'
import type { Restaurant } from '../../types'

export function RestaurantCard({ restaurant, onClick, isActive }: { restaurant: Restaurant; onClick: () => void; isActive: boolean }) {
  return (
    <div className={`restaurant-card ${isActive ? 'active' : ''} ${restaurant.surplusAvailable ? 'has-surplus' : ''}`} onClick={onClick}>
      <div className="card-image">
        <img src={restaurant.images[0]} alt={restaurant.name} loading="lazy" />
        <span className="price-badge">{restaurant.priceRange.split('-')[0].trim()}</span>
        {restaurant.surplusAvailable && <span className="surplus-badge">Surplus</span>}
      </div>
      <div className="card-info">
        <h3>{restaurant.name}</h3>
        <div className="card-meta">
          <span className="rating"><Star size={14} /> {restaurant.rating}</span>
          <span className="area"><MapPin size={14} /> {restaurant.area}</span>
        </div>
        <div className="card-cuisine">{restaurant.cuisine.join(' · ')}</div>
        {restaurant.surplusAvailable && (
          <div className="card-surplus">{restaurant.surplusItems.slice(0, 2).join(', ')}</div>
        )}
      </div>
    </div>
  )
}
