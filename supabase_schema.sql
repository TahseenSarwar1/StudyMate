-- Create a public profiles table linked to Supabase Auth users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  class integer,
  board text,
  level integer default 1,
  xp integer default 0,
  xp_to_next_level integer default 1000,
  total_xp_earned integer default 0,
  streak integer default 0,
  longest_streak integer default 0,
  coins integer default 0,
  joined_date date default current_date,
  quizzes_completed integer default 0,
  chapters_completed integer default 0,
  accuracy integer default 100,
  total_study_minutes integer default 0,
  rank integer default 99,
  badges jsonb default '[]'::jsonb
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policy: Profiles are visible to everyone (needed for the leaderboard)
create policy "Allow public read access to all profiles"
  on public.profiles for select
  using (true);

-- Policy: Users can only update their own profile details
create policy "Allow users to update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger function: Automatically run when a new user registers to create a profile entry
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    name,
    class,
    board,
    level,
    xp,
    xp_to_next_level,
    total_xp_earned,
    streak,
    longest_streak,
    coins,
    quizzes_completed,
    chapters_completed,
    accuracy,
    total_study_minutes,
    rank,
    badges
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'grade')::integer, (new.raw_user_meta_data->>'class')::integer, 10),
    coalesce(new.raw_user_meta_data->>'board', 'CBSE'),
    coalesce((new.raw_user_meta_data->>'level')::integer, 1),
    coalesce((new.raw_user_meta_data->>'xp')::integer, 0),
    coalesce((new.raw_user_meta_data->>'xpToNextLevel')::integer, 1000),
    coalesce((new.raw_user_meta_data->>'totalXpEarned')::integer, 0),
    coalesce((new.raw_user_meta_data->>'streak')::integer, 0),
    coalesce((new.raw_user_meta_data->>'longestStreak')::integer, 0),
    coalesce((new.raw_user_meta_data->>'coins')::integer, 0),
    coalesce((new.raw_user_meta_data->>'quizzesCompleted')::integer, 0),
    coalesce((new.raw_user_meta_data->>'chaptersCompleted')::integer, 0),
    coalesce((new.raw_user_meta_data->>'accuracy')::integer, 100),
    coalesce((new.raw_user_meta_data->>'totalStudyMinutes')::integer, 0),
    coalesce((new.raw_user_meta_data->>'rank')::integer, 99),
    coalesce(new.raw_user_meta_data->'badges', '[]'::jsonb)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Bind the trigger function to the auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
