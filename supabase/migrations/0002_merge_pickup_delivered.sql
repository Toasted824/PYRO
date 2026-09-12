-- Merge PICKUP and DELIVERED into single final status PICKED_UP
-- Existing rows with status PICKUP or DELIVERED become PICKED_UP
update public.donations set status='PICKED_UP' where status in ('PICKUP','DELIVERED');

-- Update check constraint to only allow 3 stages: AVAILABLE, CLAIMED, PICKED_UP
alter table public.donations drop constraint if exists donations_status_check;
alter table public.donations add constraint donations_status_check check (status in ('AVAILABLE','CLAIMED','PICKED_UP'));

-- Recreate index
drop index if exists donations_status_idx;
create index donations_status_idx on public.donations(status);
