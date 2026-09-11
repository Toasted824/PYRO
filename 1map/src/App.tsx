import { useState } from 'react'
import { MapIcon, ClipboardList, Utensils } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import { useRestaurants } from './hooks/useRestaurants'
import { useClaims } from './hooks/useClaims'
import { ThemeToggle, MapLayerToggle } from './components/ui'
import { FoodMap } from './features/map'
import { FilterBar, RestaurantCard, RestaurantDetail } from './features/restaurants'
import { ClaimForm, ClaimList } from './features/claims'
import { ngos } from './data/ngos'
import type { Restaurant } from './types'
import './App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const {
    search, setSearch,
    selectedArea, setSelectedArea,
    selectedCuisine, setSelectedCuisine,
    selectedRestaurant, selectRestaurant, clearSelection,
    flyTo, areas, cuisines, filtered
  } = useRestaurants()
  const { claims, addClaim } = useClaims()
  const [mapLayer, setMapLayer] = useState<'standard' | 'minimal'>('standard')
  const [view, setView] = useState<'map' | 'claims'>('map')
  const [claimRestaurant, setClaimRestaurant] = useState<Restaurant | null>(null)

  const selectedId = selectedRestaurant?.id ?? null

  const handleClaimSubmit = (data: { restaurantId: string; ngoId: string; items: string[]; servings: number; pickupTime: string; notes: string }) => {
    addClaim(data)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <Utensils size={20} />
            <span>FoodLoop</span>
          </div>
          <div className="header-tabs">
            <button className={`tab ${view === 'map' ? 'active' : ''}`} onClick={() => setView('map')}>
              <MapIcon size={16} /> Map
            </button>
            <button className={`tab ${view === 'claims' ? 'active' : ''}`} onClick={() => setView('claims')}>
              <ClipboardList size={16} /> Claims
              {claims.filter(c => c.status !== 'delivered').length > 0 && (
                <span className="tab-badge">{claims.filter(c => c.status !== 'delivered').length}</span>
              )}
            </button>
          </div>
        </div>
        <div className="header-right">
          <MapLayerToggle layer={mapLayer} onToggle={() => setMapLayer(m => m === 'standard' ? 'minimal' : 'standard')} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <div className="main-layout">
        {view === 'map' ? (
          <>
            <aside className={`sidebar ${selectedRestaurant ? 'show-detail' : ''}`}>
              {selectedRestaurant ? (
                <RestaurantDetail
                  restaurant={selectedRestaurant}
                  onClose={clearSelection}
                  onClaim={(r) => setClaimRestaurant(r)}
                />
              ) : (
                <>
                  <FilterBar
                    search={search} setSearch={setSearch}
                    selectedArea={selectedArea} setSelectedArea={setSelectedArea}
                    selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine}
                    areas={areas} cuisines={cuisines}
                  />
                  <div className="results-count">
                    {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found
                    <span className="surplus-count">{filtered.filter(r => r.surplusAvailable).length} with surplus</span>
                  </div>
                  <div className="restaurant-list">
                    {filtered.map(r => (
                      <RestaurantCard
                        key={r.id}
                        restaurant={r}
                        onClick={() => selectRestaurant(r)}
                        isActive={selectedId === r.id}
                      />
                    ))}
                    {filtered.length === 0 && <div className="no-results">No restaurants match your filters</div>}
                  </div>
                </>
              )}
            </aside>
            <FoodMap
              restaurants={filtered}
              ngos={ngos}
              flyTo={flyTo}
              onRestaurantClick={selectRestaurant}
              onNgoClick={() => {}}
              mapLayer={mapLayer}
            />
          </>
        ) : (
          <div className="claims-view">
            <div className="claims-sidebar">
              <h3>Active Claims</h3>
              <ClaimList claims={claims} />
            </div>
            <FoodMap
              restaurants={[]}
              ngos={ngos}
              flyTo={null}
              onRestaurantClick={() => {}}
              onNgoClick={() => {}}
              mapLayer={mapLayer}
            />
          </div>
        )}
      </div>

      {claimRestaurant && (
        <ClaimForm
          restaurant={claimRestaurant}
          onClose={() => setClaimRestaurant(null)}
          onSubmit={handleClaimSubmit}
        />
      )}
    </div>
  )
}
