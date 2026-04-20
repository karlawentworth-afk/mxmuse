-- MX Muse: Initial Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================================

-- ============================================================================
-- TABLE: assessments
-- One row per completed assessment. The id (UUID) doubles as the access token
-- for the results page — knowing the UUID = permission to view.
-- ============================================================================

create table public.assessments (
  id              uuid primary key default gen_random_uuid(),

  -- User info (collected at end of assessment, before submission)
  first_name      text not null,
  email           text not null,
  job_title       text not null,
  seniority       text not null check (seniority in (
    'Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead',
    'Manager', 'Director', 'Head of', 'VP', 'C-Suite'
  )),

  -- Natural talent percentages (questions 1-24). Four values, sum to 100.
  talent_storyteller  smallint not null check (talent_storyteller between 0 and 100),
  talent_strategist   smallint not null check (talent_strategist  between 0 and 100),
  talent_scientist    smallint not null check (talent_scientist   between 0 and 100),
  talent_builder      smallint not null check (talent_builder     between 0 and 100),
  check (talent_storyteller + talent_strategist + talent_scientist + talent_builder = 100),

  -- Role demand percentages (questions 25-30). Four values, sum to 100.
  role_storyteller    smallint not null check (role_storyteller between 0 and 100),
  role_strategist     smallint not null check (role_strategist  between 0 and 100),
  role_scientist      smallint not null check (role_scientist   between 0 and 100),
  role_builder        smallint not null check (role_builder     between 0 and 100),
  check (role_storyteller + role_strategist + role_scientist + role_builder = 100),

  -- Derived scores
  profile_type        text not null,      -- e.g. "Storyteller-Strategist Hybrid"
  mx_gap_score        smallint not null check (mx_gap_score between 0 and 10),

  -- Raw answers: full question-by-question response data.
  -- Expected JSON structure:
  -- {
  --   "1":  { "storyteller": 4, "strategist": 3, "scientist": 1, "builder": 2 },
  --       ^ ranking type: each archetype gets a rank 1-4, each rank used once
  --
  --   "7":  { "storyteller": 40, "strategist": 25, "scientist": 15, "builder": 20 },
  --       ^ points type: four values summing to 100
  --
  --   "13": { "storyteller": 35, "strategist": 30, "scientist": 20, "builder": 15 },
  --       ^ percentage type: four values summing to 100
  --
  --   "19": "storyteller",
  --       ^ select type: a single archetype string
  -- }
  -- Keys are question numbers as strings ("1" through "30").
  -- Value shape depends on the question type defined in the question bank.
  raw_answers         jsonb not null,

  -- AI-generated personalised results
  -- When complete, contains six sections:
  -- { "who_you_are": "...", "natural_talents": "...", "blind_spots": "...",
  --   "mx_gap": "...", "path_forward": "...", "whats_coming": "..." }
  ai_sections         jsonb,
  ai_status           text not null default 'pending'
                        check (ai_status in ('pending', 'complete', 'error')),
  ai_error            text,               -- Error message when ai_status = 'error'

  -- Referral tracking
  ref_source          text check (ref_source in ('colleague-invite', 'cmo-invite')),
  referred_by         uuid references public.assessments(id),  -- Who shared the link

  -- Email delivery tracking
  results_email_sent_at  timestamptz,     -- Set when Resend confirms delivery

  -- Timestamps
  created_at          timestamptz not null default now(),
  updated_at          timestamptz
);

-- Auto-update updated_at on any row change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger assessments_updated_at
  before update on public.assessments
  for each row
  execute function public.handle_updated_at();

-- Index on email for when Karla queries by user in the dashboard
create index idx_assessments_email on public.assessments(email);

-- Index on ref_source for filtering referral reports
create index idx_assessments_ref_source on public.assessments(ref_source)
  where ref_source is not null;


-- ============================================================================
-- TABLE: book_subscribers
-- Email opt-in for "tell me when the book's out" — on landing page and results.
-- Upsert is handled server-side via a Netlify Function using service_role
-- (which bypasses RLS). This avoids granting anon update access to the table.
-- During development, the frontend can insert directly — duplicates will fail
-- gracefully on the unique constraint until the function is in place (Stage 6).
-- ============================================================================

create table public.book_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  first_name  text,                       -- May not be available from landing page
  source      text not null check (source in ('landing', 'results')),
  created_at  timestamptz not null default now()
);


-- ============================================================================
-- TABLE: cmo_inquiries
-- Submissions from the /cmo inquiry form. Both company and message are
-- optional — don't add friction to CMOs reaching out.
-- ============================================================================

create table public.cmo_inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  message     text,
  created_at  timestamptz not null default now()
);


-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
alter table public.assessments enable row level security;
alter table public.book_subscribers enable row level security;
alter table public.cmo_inquiries enable row level security;

-- ASSESSMENTS: anon can insert their own assessment
create policy "Anyone can submit an assessment"
  on public.assessments
  for insert
  to anon
  with check (true);

-- ASSESSMENTS: anon can read a single assessment by id (UUID = access token)
create policy "Anyone can read an assessment by id"
  on public.assessments
  for select
  to anon
  using (true);

-- ASSESSMENTS: service_role can update (for AI results, email status, etc.)
-- Note: service_role bypasses RLS by default, so no explicit policy needed.
-- This comment is here for documentation.

-- BOOK SUBSCRIBERS: anon can insert only. No update — upsert is handled
-- server-side via Netlify Function using service_role (Stage 6).
create policy "Anyone can subscribe to book updates"
  on public.book_subscribers
  for insert
  to anon
  with check (true);

-- CMO INQUIRIES: anon can insert
create policy "Anyone can submit a CMO inquiry"
  on public.cmo_inquiries
  for insert
  to anon
  with check (true);
