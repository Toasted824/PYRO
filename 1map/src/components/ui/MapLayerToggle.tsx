import { Layers } from 'lucide-react'

export function MapLayerToggle({ onToggle }: { layer: 'standard' | 'minimal'; onToggle: () => void }) {
  return (
    <button className="icon-btn" onClick={onToggle} title="Toggle map style">
      <Layers size={18} />
    </button>
  )
}
