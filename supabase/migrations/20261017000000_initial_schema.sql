-- ==============================================================================
-- NovaFlow: Кроки — Базова міграція бази даних Supabase (PostgreSQL + RLS)
-- ==============================================================================

-- 1. Таблиця колод (Decks)
create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text default '',
  color text default '#8b5cf6',
  icon text default 'sparkles',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS для колод
alter table public.decks enable row level security;

create policy "Users can view their own decks"
  on public.decks for select
  using (auth.uid() = user_id);

create policy "Users can create their own decks"
  on public.decks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own decks"
  on public.decks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own decks"
  on public.decks for delete
  using (auth.uid() = user_id);

-- 2. Таблиця карток (Cards)
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  front text not null,
  back text not null,
  example text default '',
  interval_days integer default 0 not null,
  repetition_number integer default 0 not null,
  easiness_factor numeric(4,2) default 2.50 not null,
  next_review_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS для карток
alter table public.cards enable row level security;

create policy "Users can view their own cards"
  on public.cards for select
  using (auth.uid() = user_id);

create policy "Users can create their own cards"
  on public.cards for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cards"
  on public.cards for update
  using (auth.uid() = user_id);

create policy "Users can delete their own cards"
  on public.cards for delete
  using (auth.uid() = user_id);

-- 3. Таблиця історії повторень (Card Reviews)
create table if not exists public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating smallint not null check (rating between 1 and 4),
  review_duration_ms integer default 0,
  reviewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS для історії повторень
alter table public.card_reviews enable row level security;

create policy "Users can view their own reviews"
  on public.card_reviews for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reviews"
  on public.card_reviews for insert
  with check (auth.uid() = user_id);

-- 4. Таблиця фокус-сесій Pomodoro (Focus Sessions)
create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  duration_minutes integer not null default 25,
  completed boolean not null default true,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  finished_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS для фокус-сесій
alter table public.focus_sessions enable row level security;

create policy "Users can view their own focus sessions"
  on public.focus_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own focus sessions"
  on public.focus_sessions for insert
  with check (auth.uid() = user_id);
