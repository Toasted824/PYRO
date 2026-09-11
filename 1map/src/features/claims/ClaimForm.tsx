import { useState } from 'react'
import { X } from 'lucide-react'
import type { Restaurant } from '../../types'
import { ngos } from '../../data/ngos'

interface ClaimFormProps {
  restaurant: Restaurant
  onClose: () => void
  onSubmit: (data: { restaurantId: string; ngoId: string; items: string[]; servings: number; pickupTime: string; notes: string }) => void
}

export function ClaimForm({ restaurant, onClose, onSubmit }: ClaimFormProps) {
  const [selectedNgo, setSelectedNgo] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [servings, setServings] = useState(1)
  const [pickupTime, setPickupTime] = useState('')
  const [notes, setNotes] = useState('')

  const toggleItem = (item: string) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const handleSubmit = () => {
    if (!selectedNgo || selectedItems.length === 0 || !pickupTime) return
    onSubmit({
      restaurantId: restaurant.id,
      ngoId: selectedNgo,
      items: selectedItems,
      servings,
      pickupTime,
      notes
    })
    onClose()
  }

  return (
    <div className="claim-form-overlay">
      <div className="claim-form">
        <div className="claim-form-header">
          <h3>Claim Surplus from {restaurant.name}</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="claim-form-body">
          <div className="form-section">
            <label>Select Items</label>
            <div className="item-grid">
              {restaurant.surplusItems.map(item => (
                <button
                  key={item}
                  className={`item-chip ${selectedItems.includes(item) ? 'selected' : ''}`}
                  onClick={() => toggleItem(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Servings</label>
            <div className="servings-control">
              <button onClick={() => setServings(s => Math.max(1, s - 1))}>-</button>
              <span>{servings}</span>
              <button onClick={() => setServings(s => s + 1)}>+</button>
            </div>
          </div>

          <div className="form-section">
            <label>Select NGO / Community Kitchen</label>
            <select value={selectedNgo} onChange={e => setSelectedNgo(e.target.value)}>
              <option value="">Choose recipient...</option>
              {ngos.map(n => (
                <option key={n.id} value={n.id}>{n.name} — {n.area}</option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>Pickup Time</label>
            <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
          </div>

          <div className="form-section">
            <label>Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special instructions..." rows={2} />
          </div>
        </div>

        <div className="claim-form-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!selectedNgo || selectedItems.length === 0 || !pickupTime}
          >
            Submit Claim
          </button>
        </div>
      </div>
    </div>
  )
}
