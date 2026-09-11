# FoodLoop

An interactive map connecting restaurants with surplus food to NGOs and community kitchens across Kathmandu valley. Built for hackathons — modular, clean, easy to extend.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Tech Stack

- **React** + **TypeScript** (Vite)
- **Leaflet** + **react-leaflet** (interactive map)
- **CartoDB** tiles (free, no API key)
- **Lucide React** (icons)

## Features

- **Interactive map** of Kathmandu valley with restaurant + NGO markers
- **30 restaurants** across Kathmandu, Lalitpur, and Bhaktapur
- **5 NGOs / community kitchens** for surplus claiming
- **Claim flow** — select surplus items, choose NGO, schedule pickup
- **Claim tracking** — view all active claims with status updates
- **Search & filter** by name, cuisine, area
- **Photo gallery** — 3 curated photos per restaurant with auto-carousel
- **Dark/light mode** (persisted in localStorage)
- **Map style toggle** (Voyager / Light minimal)
- **Fly-to animation** when selecting a restaurant
- **Responsive** layout

## Project Structure

```
src/
├── types/index.ts                    # TypeScript interfaces
│
├── data/
│   ├── restaurants.ts                # 30 restaurants with coords, images, surplus
│   ├── ngos.ts                       # 5 NGOs / community kitchens
│   └── claims.ts                     # Demo claim data
│
├── hooks/
│   ├── useTheme.ts                   # Dark/light mode state
│   ├── useRestaurants.ts             # Restaurant filtering & selection
│   └── useClaims.ts                  # Claim CRUD operations
│
├── components/
│   └── ui/
│       ├── ThemeToggle.tsx           # Sun/Moon toggle button
│       ├── MapLayerToggle.tsx        # Map style toggle button
│       └── index.ts                  # Barrel export
│
├── features/
│   ├── map/
│   │   ├── FoodMap.tsx               # Main map container
│   │   ├── Markers.tsx               # Restaurant & NGO markers
│   │   ├── PhotoGallery.tsx          # Image carousel component
│   │   └── index.ts                  # Barrel export
│   │
│   ├── restaurants/
│   │   ├── FilterBar.tsx             # Search + area/cuisine filters
│   │   ├── RestaurantCard.tsx        # List card with surplus badge
│   │   ├── RestaurantDetail.tsx      # Detail panel with gallery + claim
│   │   └── index.ts                  # Barrel export
│   │
│   └── claims/
│       ├── ClaimForm.tsx             # Claim creation form (modal)
│       ├── ClaimList.tsx             # List of all claims
│       └── index.ts                  # Barrel export
│
├── App.tsx                           # Main app (layout, routing, state)
├── App.css                           # All styles (green theme)
├── index.css                         # Global reset
└── main.tsx                          # Entry point
```

## Architecture

### Modular Design

Each feature is self-contained with its own components, hooks, and barrel exports:

| Module | Purpose | Key Files |
|--------|---------|-----------|
| `features/map` | Map, markers, photo gallery | `FoodMap`, `Markers`, `PhotoGallery` |
| `features/restaurants` | Restaurant list, detail, filters | `FilterBar`, `RestaurantCard`, `RestaurantDetail` |
| `features/claims` | Claim creation and tracking | `ClaimForm`, `ClaimList` |
| `components/ui` | Reusable UI elements | `ThemeToggle`, `MapLayerToggle` |
| `hooks` | Shared state logic | `useTheme`, `useRestaurants`, `useClaims` |
| `data` | Mock data (swappable for API) | `restaurants`, `ngos`, `claims` |
| `types` | TypeScript interfaces | `Restaurant`, `NgoReceiver`, `Claim` |

### Adding a New Feature

1. Create `src/features/your-feature/`
2. Add components
3. Create `src/features/your-feature/index.ts` with barrel exports
4. Import in `App.tsx`

### Claim Flow Demo

The app includes a demo claim system:
- Restaurants with surplus show a green "Surplus" badge
- Click "Claim Surplus" to open the claim form
- Select items, NGO recipient, pickup time
- Claims appear in the "Claims" tab with status tracking

Status flow: `pending` → `accepted` → `pickup` → `delivered`

### Theme

Eco-green color scheme with CSS variables:

```css
:root {
  --accent: #22c55e;        /* Primary green */
  --bg: #0c1a12;            /* Dark forest */
  --bg-secondary: #121f16;  /* Card background */
}
```

### Map Tiles

Uses free CartoDB tiles (no API key):
- Base: `voyager_nolabels` (clean geography)
- Labels: `voyager_only_labels` (English place names only)

## Build

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## License

MIT
