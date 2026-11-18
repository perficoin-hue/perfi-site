create extension if not exists pgcrypto;

create table if not exists public.website_projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) <= 100),
  status text not null default 'draft' check (status in ('draft', 'published')),
  draft jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists website_projects_owner_updated_idx
  on public.website_projects (owner_id, updated_at desc);

alter table public.website_projects enable row level security;

create policy "Owners can read their website projects"
  on public.website_projects for select to authenticated using (auth.uid() = owner_id);
create policy "Owners can create their website projects"
  on public.website_projects for insert to authenticated with check (auth.uid() = owner_id);
create policy "Owners can update their website projects"
  on public.website_projects for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Owners can delete their website projects"
  on public.website_projects for delete to authenticated using (auth.uid() = owner_id);
