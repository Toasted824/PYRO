# FoodLoop

> **Surplus food, shared with the community.**

FoodLoop is a web platform that helps restaurants in **Kathmandu Valley** share surplus food with verified community kitchens and shelters. Restaurants can post available food, beneficiaries can discover nearby listings on an interactive map, and both sides can coordinate pickups through a simple claim-and-status workflow.

**Live demo:** https://foodlooppyro.vercel.app/

---

## Overview

FoodLoop is designed around a simple loop:

1. A **restaurant** lists surplus food and provides a pickup location.
2. The listing appears on the public **Explore** map and beneficiary dashboard.
3. A **beneficiary** finds suitable food nearby and claims it.
4. The restaurant tracks the donation through the pickup workflow.
5. The surplus food is redirected to the community instead of being wasted.

FoodLoop does **not** buy, sell, store, or deliver food. Pickup and coordination happen directly between the restaurant and beneficiary.

---

## Features

### For restaurants

- Create a restaurant account
- Post surplus food listings
- Select food type and perishability
- Specify number of meals available
- Set an availability/pickup deadline
- Search for a pickup location or use the browser's current location
- Select and drag a location pin on the map
- View restaurant-specific donations
- Track donation status
- Remove available listings
- View profile statistics such as meals listed and shared

### For beneficiaries

- Create a beneficiary account
- Browse available surplus food
- Explore donations on an interactive map
- See nearby listings and pickup locations
- View food type, meal count, restaurant, and availability
- Claim available donations
- Track claimed/picked-up donations
- View beneficiary profile information and activity

### Platform features

- Email/password authentication through Supabase
- Role-based restaurant and beneficiary experiences
- Real-time donation updates using Supabase Realtime
- Interactive Leaflet maps
- Donation marker clustering with Supercluster
- Location search using Nominatim/OpenStreetMap
- Browser geolocation support
- Responsive interface
- Animated page transitions and UI interactions
- SEO metadata and sitemap/robots configuration
- Vercel deployment support
- Perishable-food validation with a 12-hour maximum availability window

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Frontend UI |
| **TypeScript** | Type-safe application code |
| **Vite** | Development server and production build |
| **React Router** | Client-side routing |
| **Supabase** | Authentication, PostgreSQL database, and Realtime |
| **Tailwind CSS 4** | Styling |
| **Leaflet** | Interactive maps |
| **React Leaflet** | React integration for Leaflet |
| **Supercluster** | Map marker clustering |
| **Motion** | Page and component animations |
| **Nominatim** | Location search and reverse geocoding |
| **CARTO** | Map tiles |
| **Vercel** | Production deployment |
| **Oxlint** | Linting |

---

## Project Structure

```text
PYRO/
├── public/
│   ├── favicon-*.png
│   ├── apple-touch-icon.png
│   ├── logo.png
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── CNAME
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── Header.tsx
│   │   ├── map/
│   │   │   ├── LocationPicker.tsx
│   │   │   └── TeammateMap.tsx
│   │   ├── ui/
│   │   │   ├── StatusStepper.tsx
│   │   │   └── Toast.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── SEO.tsx
│   │
│   ├── hooks/
│   │   └── useDonations.ts
│   │
│   ├── lib/
│   │   ├── auth.tsx
│   │   ├── carto.ts
│   │   ├── distance.ts
│   │   ├── nominatim.ts
│   │   ├── store.ts
│   │   ├── supabase.ts
│   │   └── types.ts
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── RegisterBeneficiary.tsx
│   │   │   └── RegisterRestaurant.tsx
│   │   ├── Beneficiary/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── Restaurant/
│   │   │   ├── CreateDonation.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── About.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Impact.tsx
│   │   ├── Join.tsx
│   │   ├── Landing.tsx
│   │   ├── NotFound.tsx
│   │   └── Terms.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── supabase/
│   └── migrations/
│       ├── 0001_init.sql
│       ├── 0002_donation_delete.sql
│       ├── 0002_merge_pickup_delivered.sql
│       └── 0003_add_perishability.sql
│
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

Make sure you have:

- **Node.js** installed
- **npm** installed
- A **Supabase** project
- A **CARTO** API key for map tiles

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Toasted824/PYRO.git
cd PYRO
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_CARTO_API_KEY=your-carto-api-key
```

You can start from the included example:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### Variables

| Variable | Required | Description |
|---|---:|---|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase public/anon API key |
| `VITE_CARTO_API_KEY` | Recommended | CARTO basemap API key |

> **Important:** Never commit your `.env` file or private credentials. The project already ignores `.env` through `.gitignore`.

If the CARTO key is not configured, the map implementation can fall back to a public CARTO tile endpoint.

---

## Supabase Setup

FoodLoop uses Supabase for:

- Email/password authentication
- PostgreSQL database
- Row Level Security
- Realtime donation updates

### 1. Create a Supabase project

Create a project from the Supabase dashboard.

### 2. Configure authentication

FoodLoop uses Supabase email/password authentication.

The application supports Supabase's email-confirmation flow. If email confirmation is enabled, a newly registered user must confirm their email before logging in.

### 3. Run the database migrations

Open the **SQL Editor** in your Supabase project and run the migration files in order:

```text
supabase/migrations/0001_init.sql
supabase/migrations/0002_donation_delete.sql
supabase/migrations/0002_merge_pickup_delivered.sql
supabase/migrations/0003_add_perishability.sql
```

These migrations create and update the `donations` table, indexes, Row Level Security policies, Realtime configuration, donation status workflow, deletion permissions, and perishability support.

### Donation statuses

The current application uses three donation states:

```text
AVAILABLE → CLAIMED → PICKED_UP
```

Older database rows using `PICKUP` or `DELIVERED` are normalized to `PICKED_UP` by the application/migration.

---

## Running Locally

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, normally:

```text
http://localhost:5173
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production build

```bash
npm run build
```

Runs the TypeScript project build and creates a production Vite build.

### Lint

```bash
npm run lint
```

Runs Oxlint against the project.

### Preview

```bash
npm run preview
```

Serves the production build locally for testing.

---

## Application Routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/how-it-works` | Explains the FoodLoop process | Public |
| `/about` | About FoodLoop | Public |
| `/impact` | Impact information | Public |
| `/join` | Join/participation information | Public |
| `/terms` | Terms and conditions | Public |
| `/explore` | Browse available food | Public |
| `/login` | Login | Public |
| `/register/restaurant` | Restaurant registration | Public |
| `/register/beneficiary` | Beneficiary registration | Public |
| `/restaurant/dashboard` | Restaurant dashboard | Restaurant |
| `/restaurant/new` | Create a donation | Restaurant |
| `/restaurant/profile` | Restaurant profile | Restaurant |
| `/beneficiary/dashboard` | Beneficiary dashboard | Beneficiary |
| `/beneficiary/profile` | Beneficiary profile | Beneficiary |

---

## Donation Workflow

### Restaurant workflow

```text
Restaurant registers
        ↓
Creates food listing
        ↓
Adds quantity + food type
        ↓
Adds pickup location
        ↓
Listing becomes AVAILABLE
        ↓
Beneficiary claims listing
        ↓
Status becomes CLAIMED
        ↓
Pickup happens
        ↓
Status becomes PICKED_UP
```

### Claiming a donation

Claims are performed against donations that are still `AVAILABLE`.

The database update checks the donation status so that two users cannot successfully claim the same available listing through the normal application flow.

---

## Food Perishability

FoodLoop supports two perishability categories:

```text
perishable
non_perishable
```

The application provides default classifications for common food types:

| Food type | Default |
|---|---|
| Cooked Meals | Perishable |
| Bakery & Bread | Perishable |
| Fresh Produce | Perishable |
| Dairy | Perishable |
| Packaged Food | Non-perishable |
| Mixed Surplus | Perishable |

For **perishable food**, the application limits the availability window to **12 hours**.

Non-perishable food does not have the same 12-hour application limit.

---

## Maps & Location

FoodLoop uses several mapping/location services together:

### Leaflet

Leaflet provides the interactive map interface.

### CARTO

CARTO provides the primary map tile layer using a muted/light basemap.

### Nominatim

Nominatim is used for:

- Location search
- Reverse geocoding
- Turning map coordinates into readable location names

### Browser Geolocation

Users can choose **Use current location** when their browser supports geolocation and they grant permission.

### Marker clustering

Donation markers are clustered using **Supercluster** to keep the map usable when many donations are close together.

---

## Real-Time Updates

Donation data is loaded through Supabase and subscribed to using PostgreSQL Realtime.

The `useDonations` hook:

1. Fetches the current donation list.
2. Subscribes to changes on the `donations` table.
3. Refreshes the list when a database change occurs.
4. Debounces rapid changes to avoid unnecessary requests.
5. Cleans up the Realtime subscription when the component unmounts.

This allows different users to see donation changes without manually refreshing the page.

---

## Authentication & Roles

FoodLoop has two account roles:

```text
restaurant
beneficiary
```

Role information is stored in Supabase Auth user metadata.

The application uses an `AuthProvider` to:

- Restore existing sessions
- Listen for authentication changes
- Log users in
- Register new users
- Log users out
- Convert Supabase users into application-level `User` objects
- Redirect users away from role-inappropriate pages

---

## Database

The primary database table is:

```text
public.donations
```

Important fields include:

```text
id
restaurant_id
restaurant_name
food_type
perishability
meals
available_until
pickup_location
description
status
claimed_by
claimed_by_name
lat
lng
created_at
```

Indexes are provided for commonly queried fields such as:

```text
restaurant_id
status
perishability
```

Row Level Security is enabled on the donations table.

---

## Deployment

FoodLoop is deployed on **Vercel**.

### Production deployment

**Live site:**

https://foodlooppyro.vercel.app/

The project includes a `vercel.json` rewrite:

```json
{
  "rewrites": [
    {
      "source": "/((?!assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows React Router routes such as:

```text
/explore
/login
/restaurant/dashboard
/beneficiary/dashboard
```

to work correctly when directly opened or refreshed.

### Deploying your own instance

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the project framework to Vite if Vercel does not detect it automatically.
4. Add the environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_CARTO_API_KEY
```

5. Deploy.

Vercel should run the equivalent of:

```bash
npm run build
```

for the production build.

---

## Development Notes

### Supabase configuration

If Supabase variables are missing, the application intentionally detects that Supabase is not configured and displays configuration-related errors rather than crashing during initialization.

### Map boundaries

The main donation map is bounded around Nepal to prevent users from accidentally navigating the map far outside the intended region.

### Lazy loading

Major pages are lazy-loaded with React's `lazy()` and rendered through `Suspense`. This keeps the initial application bundle smaller and loads page code as needed.

### Production chunking

The Vite configuration creates separate chunks for major libraries, including:

- React
- Leaflet
- Motion
- Supabase

This helps keep large dependencies separated from the main application bundle.

---

## Project Design

FoodLoop uses a warm, community-focused visual style with:

- Green as the primary action/impact color
- Warm off-white backgrounds
- Rounded cards and controls
- Map-first discovery
- Lightweight animations
- Responsive layouts
- Clear status indicators

The interface is designed to make the donation process understandable for users who may not be technically experienced.

---

## Security Considerations

FoodLoop uses Supabase's Row Level Security and does not require a private Supabase service-role key in the frontend.

However, **database policies should be reviewed carefully before treating the project as a production-scale system**.

In particular, the current update policy allows authenticated users to update donation rows broadly:

```sql
create policy "donations_update_authenticated"
on public.donations
for update to authenticated
using (true)
with check (true);
```

For a production deployment, this should ideally be tightened so that users can only perform the specific updates permitted by their role and relationship to the donation.

---

## External Services

FoodLoop currently relies on:

- **Supabase** — authentication, database, and realtime
- **CARTO** — map tiles
- **OpenStreetMap/Nominatim** — geocoding and location search
- **Vercel** — deployment and hosting

Usage of these services should follow their respective terms, attribution requirements, rate limits, and API policies.

---

## Contributing

Contributions are welcome.

A typical workflow is:

```bash
# Create a branch
git checkout -b feature/my-feature

# Make changes

# Check the project
npm run lint
npm run build

# Commit
git add .
git commit -m "Add my feature"

# Push
git push origin feature/my-feature
```

Then open a pull request on GitHub.

---

## Troubleshooting

### `Supabase is not configured yet`

Check that your `.env` contains:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Then restart the Vite development server.

### Donations are not appearing

Check:

1. Supabase credentials are correct.
2. The `donations` table exists.
3. The migration files have been executed.
4. Row Level Security policies exist.
5. Realtime is enabled for `public.donations`.

### Status update errors

Make sure the migration:

```text
supabase/migrations/0002_merge_pickup_delivered.sql
```

has been executed.

The current application expects:

```text
AVAILABLE
CLAIMED
PICKED_UP
```

### Map tiles are not loading

Check:

```env
VITE_CARTO_API_KEY=...
```

and verify that the CARTO key is valid.

Also check the browser console for tile/network errors.

### Location search is not working

Nominatim requests require network access. If search fails, users can still use the map to select a location or use browser geolocation.

---

## Current Scope

FoodLoop is currently focused on connecting surplus food providers with community beneficiaries in **Kathmandu Valley**.

The application is a coordination/listing platform rather than a logistics service:

- FoodLoop does not transport food.
- FoodLoop does not store food.
- FoodLoop does not sell food.
- Restaurants and beneficiaries coordinate pickup directly.
- Users remain responsible for appropriate food-safety decisions.

See the application's Terms and Conditions for the detailed platform rules.

---

## License

No explicit open-source license is currently included in the repository.

If this project is intended to be publicly reusable, add an appropriate `LICENSE` file before publishing it as open source.

---

## Live Demo

**FoodLoop:**  
https://foodlooppyro.vercel.app/

**Repository:**  
https://github.com/Toasted824/PYRO
