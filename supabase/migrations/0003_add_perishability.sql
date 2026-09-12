-- Add perishability to donations
-- Perishable food must be picked up within 12h; non-perishable has no limit (enforced in app validation)
alter table public.donations add column if not exists perishability text not null default 'perishable'
  check (perishability in ('perishable','non_perishable'));

create index if not exists donations_perishability_idx on public.donations (perishability);
