import { Search, X, ChevronDown } from 'lucide-react'

interface FilterBarProps {
  search: string
  setSearch: (s: string) => void
  selectedArea: string
  setSelectedArea: (s: string) => void
  selectedCuisine: string
  setSelectedCuisine: (s: string) => void
  areas: string[]
  cuisines: string[]
}

export function FilterBar({ search, setSearch, selectedArea, setSelectedArea, selectedCuisine, setSelectedCuisine, areas, cuisines }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={18} />
        <input type="text" placeholder="Search restaurants, cuisines..." value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button className="clear-btn" onClick={() => setSearch('')}><X size={16} /></button>}
      </div>
      <div className="filter-group">
        <div className="select-wrapper">
          <select value={selectedArea} onChange={e => setSelectedArea(e.target.value)}>
            <option value="">All Areas</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <ChevronDown size={16} />
        </div>
        <div className="select-wrapper">
          <select value={selectedCuisine} onChange={e => setSelectedCuisine(e.target.value)}>
            <option value="">All Cuisines</option>
            {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  )
}
