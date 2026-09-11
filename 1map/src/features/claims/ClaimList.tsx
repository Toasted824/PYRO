import { Clock, Check, Truck, Package, AlertCircle } from 'lucide-react'
import type { Claim } from '../../types'
import { restaurants } from '../../data/restaurants'
import { ngos } from '../../data/ngos'

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', color: '#f59e0b' },
  accepted: { icon: Check, label: 'Accepted', color: '#3b82f6' },
  pickup: { icon: Truck, label: 'Ready for Pickup', color: '#8b5cf6' },
  delivered: { icon: Package, label: 'Delivered', color: '#22c55e' }
}

export function ClaimCard({ claim }: { claim: Claim }) {
  const restaurant = restaurants.find(r => r.id === claim.restaurantId)
  const ngo = ngos.find(n => n.id === claim.ngoId)
  const config = statusConfig[claim.status]
  const Icon = config.icon

  return (
    <div className="claim-card">
      <div className="claim-card-header">
        <span className="claim-status" style={{ color: config.color }}>
          <Icon size={14} /> {config.label}
        </span>
        <span className="claim-id">#{claim.id.slice(-4)}</span>
      </div>
      <div className="claim-card-body">
        <div className="claim-route">
          <span className="claim-from">{restaurant?.name || 'Unknown'}</span>
          <span className="claim-arrow">→</span>
          <span className="claim-to">{ngo?.name || 'Unknown'}</span>
        </div>
        <div className="claim-items">
          {claim.items.map(item => (
            <span key={item} className="claim-item">{item}</span>
          ))}
        </div>
        <div className="claim-meta">
          <span>{claim.servings} servings</span>
          <span>•</span>
          <span>{new Date(claim.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        {claim.notes && <p className="claim-notes">{claim.notes}</p>}
      </div>
    </div>
  )
}

export function ClaimList({ claims }: { claims: Claim[] }) {
  if (claims.length === 0) {
    return (
      <div className="empty-claims">
        <AlertCircle size={40} />
        <p>No active claims yet</p>
        <span>Select a restaurant with surplus to make a claim</span>
      </div>
    )
  }

  return (
    <div className="claim-list">
      {claims.map(claim => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  )
}
