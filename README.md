# FoodLoop

Surplus food, shared with the community. Restaurants post surplus meals; beneficiary organizations find and claim them nearby. Auth and data are backed by **Supabase**.

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), create a project.
2. Copy the **Project URL** and the **anon/public** key from *Project Settings → API*.

### 2. Configure the app

Copy `.env.example` to `.env` and fill in the values:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> Never commit `.env`. It is already git-ignored.

### 3. Create the database tables

Open the **SQL editor** in your Supabase dashboard, paste the contents of
[`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql), and run it.
This creates the `donations` table, enables Realtime, and sets up row-level security.

### 4. Authentication

FoodLoop uses Supabase Auth (email + password). No extra setup is needed beyond creating
the tables. By default Supabase asks users to confirm their email — accounts created in
the app will show a "check your inbox" message and log you in after confirmation. You can
disable email confirmation under *Authentication → Providers → Email* if you prefer instant logins.

### 5. Run

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck + production build
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build

## The loop

1. **Restaurant** signs up and posts surplus food (`/restaurant/new`).
2. The donation appears on the public map (`/explore`) and to beneficiary dashboards in real time.
3. **Beneficiary** signs up, finds the donation, and claims it.
4. **Restaurant** advances the status: Claimed → Pickup → Delivered.