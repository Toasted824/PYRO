import { useState, useMemo } from 'react'
import type { Restaurant } from '../types'
import { restaurants } from '../data/restaurants'

export function useRestaurants() {
  const [search, setSearch] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null)

  const areas = useMemo(() => [...new Set(restaurants.map(r => r.area))].sort(), [])
  const cuisines = useMemo(() => [...new Set(restaurants.flatMap(r => r.cuisine))].sort(), [])

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.cuisine.some(c => c.toLowerCase().includes(q)) || r.area.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      const matchArea = !selectedArea || r.area === selectedArea
      const matchCuisine = !selectedCuisine || r.cuisine.includes(selectedCuisine)
      return matchSearch && matchArea && matchCuisine
    })
  }, [search, selectedArea, selectedCuisine])

  const selectRestaurant = (r: Restaurant) => {
    setSelectedRestaurant(r)
    setFlyTo([r.lat, r.lng])
  }

  const clearSelection = () => setSelectedRestaurant(null)

  return {
    search, setSearch,
    selectedArea, setSelectedArea,
    selectedCuisine, setSelectedCuisine,
    selectedRestaurant, selectRestaurant, clearSelection,
    flyTo,
    areas, cuisines, filtered,
    allRestaurants: restaurants
  }
}
