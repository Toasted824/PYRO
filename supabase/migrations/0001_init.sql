-- FoodLoop database schema
-- Run this in the Supabase SQL editor (Dashboard > SQL > New query), or via
-- `supabase db push` if you use the Supabase CLI.

-- Donations table
create table public.donations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references auth.users (id) on delete cascade,
  restaurant_name text not null,
  food_type text not null,
  meals integer not null check (meals > 0),
  available_until timestamptz not null,
  pickup_location text not null,
  description text,
  status text not null default 'AVAILABLE'
    check (status in ('AVAILABLE', 'CLAIMED', 'PICKUP', 'DELIVERED')),
  claimed_by uuid references auth.users (id) on delete set null,
  claimed_by_name text,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now()
);

-- Index for fast lookup of a restaurant's donations
create index donations_restaurant_id_idx on public.donations (restaurant_id);
create index donations_status_idx on public.donations (status);

-- The app reads live donation data over Realtime, so expose the table.
alter publication supabase_realtime add table public.donations;

-- Row level security
alter table public.donations enable row level security;

-- Anyone (including logged-out visitors on /explore) can read donations.
create policy "donations_read_public" on public.donations
  for select using (true);

-- Restaurant owners create their own donations.
create policy "donations_insert_own" on public.donations
  for insert to authenticated
  with check (auth.uid() = restaurant_id);

-- Authenticated users advance status / claim donations.
create policy "donations_update_authenticated" on public.donations
  for update to authenticated
  using (true)
  with check (true);