-- Allow a restaurant to delete its own donations so it can
-- remove a listing that is no longer available.
-- Run this in the Supabase SQL editor (Dashboard > SQL > New query), or via
-- `supabase db push` if you use the Supabase CLI.

create policy "donations_delete_own" on public.donations
  for delete to authenticated
  using (auth.uid() = restaurant_id);