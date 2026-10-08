create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.issues (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  status text not null default 'todo',
  priority text not null default 'medium',
  assignee_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint issues_status_check
    check (status in ('todo', 'in_progress', 'done')),

  constraint issues_priority_check
    check (priority in ('low', 'medium', 'high', 'critical'))
);

create table public.labels (
  id bigint generated always as identity primary key,
  name text not null unique,
  color text not null,
  created_at timestamptz not null default now()
);

create table public.issue_labels (
  issue_id bigint not null references public.issues(id) on delete cascade,
  label_id bigint not null references public.labels(id) on delete cascade,
  primary key (issue_id, label_id)
);

create index issues_status_idx
  on public.issues(status);

create index issues_priority_idx
  on public.issues(priority);

create index issues_assignee_id_idx
  on public.issues(assignee_id);

create index issues_created_at_idx
  on public.issues(created_at desc);

create index issue_labels_label_id_idx
  on public.issue_labels(label_id);

 create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_issues_updated_at
before update on public.issues
for each row
execute function public.set_updated_at();


alter table public.profiles enable row level security;
alter table public.issues enable row level security;
alter table public.labels enable row level security;
alter table public.issue_labels enable row level security;

create policy "profiles are publicly readable"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "issues are publicly readable"
on public.issues
for select
to anon, authenticated
using (true);

create policy "issues can be created"
on public.issues
for insert
to anon, authenticated
with check (true);

create policy "issues can be updated"
on public.issues
for update
to anon, authenticated
using (true)
with check (true);

create policy "issues can be deleted"
on public.issues
for delete
to anon, authenticated
using (true);

create policy "labels are publicly readable"
on public.labels
for select
to anon, authenticated
using (true);

create policy "issue labels are publicly readable"
on public.issue_labels
for select
to anon, authenticated
using (true);

create policy "issue labels can be created"
on public.issue_labels
for insert
to anon, authenticated
with check (true);

create policy "issue labels can be deleted"
on public.issue_labels
for delete
to anon, authenticated
using (true);