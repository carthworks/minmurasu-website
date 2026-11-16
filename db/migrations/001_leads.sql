-- MIN MURASU lead store. Run once in Supabase SQL editor / Neon console / psql.
create table if not exists leads (
  id                    uuid primary key,
  created_at            timestamptz not null default now(),
  source                text not null,
  name                  text not null,
  email                 text not null,
  phone                 text not null,
  company               text,
  website               text,
  service               text not null,
  budget                text,
  preferred_contact     text not null,
  message               text not null,
  attribution           jsonb not null default '{}'::jsonb,
  meta                  jsonb not null default '{}'::jsonb,

  -- Pipeline / CRM state (Phase 1 fills status, score and owner)
  status                text not null default 'new',
  score                 integer,
  owner                 text,
  first_contacted_at    timestamptz,

  -- Delivery tracking: a retry job can resend rows where these are null
  email_sent_at         timestamptz,
  email_error           text,
  webhook_delivered_at  timestamptz,
  webhook_error         text,
  webhook_attempts      integer not null default 0
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (lower(email));
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_undelivered_webhook_idx
  on leads (created_at) where webhook_delivered_at is null;

-- Supabase: lock the table down. The site connects with the server-side
-- DATABASE_URL (postgres role), never with the anon key.
alter table leads enable row level security;
