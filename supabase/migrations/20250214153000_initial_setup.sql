/*
  # Initial Schema Setup for Nexus Platform

  ## Query Description:
  This migration sets up the core database structure for the application.
  1. Creates `profiles` table linked to `auth.users` for role management.
  2. Creates tables for `projects`, `tasks`, `documents`, `files`, `messages`, `events`, and `notifications`.
  3. Sets up Row Level Security (RLS) policies to secure data access.
  4. Creates a trigger to automatically create a profile when a new user signs up.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "High"
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - Tables: profiles, projects, tasks, documents, files, messages, events, notifications
  - Relationships: All tables reference public.profiles or each other via UUIDs.
  
  ## Security Implications:
  - RLS Enabled on all tables.
  - Public profiles are viewable by authenticated users.
  - Users can only edit their own data where appropriate.
*/

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text check (role in ('admin', 'member', 'client')) default 'member',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  client text,
  deadline date,
  progress integer default 0,
  status text default 'In Progress',
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.projects enable row level security;

-- Create tasks table
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  assignee_id uuid references public.profiles(id),
  project_id uuid references public.projects(id),
  due_date date,
  priority text,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tasks enable row level security;

-- Create documents table (Client portal)
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text,
  size text,
  url text,
  status text default 'Pending Review',
  uploaded_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.documents enable row level security;

-- Create files table (Member portal)
create table if not exists public.files (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text,
  size text,
  url text,
  owner_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.files enable row level security;

-- Create events table (Calendar)
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date timestamp with time zone,
  type text,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.events enable row level security;

-- Create notifications table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text,
  is_read boolean default false,
  user_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.notifications enable row level security;

-- Create messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  sender_id uuid references public.profiles(id),
  receiver_id uuid references public.profiles(id),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.messages enable row level security;

-- BASIC POLICIES (To be refined based on strict requirements)

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Projects
create policy "Authenticated users can view projects" on public.projects for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert projects" on public.projects for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update projects" on public.projects for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete projects" on public.projects for delete using (auth.role() = 'authenticated');

-- Tasks
create policy "Authenticated users can view tasks" on public.tasks for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert tasks" on public.tasks for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update tasks" on public.tasks for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete tasks" on public.tasks for delete using (auth.role() = 'authenticated');

-- Documents
create policy "Users can view all documents" on public.documents for select using (auth.role() = 'authenticated');
create policy "Users can upload documents" on public.documents for insert with check (auth.role() = 'authenticated');

-- Files
create policy "Users can view all files" on public.files for select using (auth.role() = 'authenticated');
create policy "Users can upload files" on public.files for insert with check (auth.role() = 'authenticated');

-- Events
create policy "Users can view all events" on public.events for select using (auth.role() = 'authenticated');
create policy "Users can create events" on public.events for insert with check (auth.role() = 'authenticated');

-- Notifications
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);

-- Messages
create policy "Users can view their messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users can send messages" on public.messages for insert with check (auth.uid() = sender_id);


-- Trigger for new user profile creation
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce(new.raw_user_meta_data->>'role', 'member')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid conflicts during re-runs
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
