-- =============================================
-- Minute Master — Database Schema
-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- =============================================

-- 1. Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Processing' CHECK (status IN ('Completed', 'Processing', 'Error')),
  minutes_text TEXT DEFAULT '',
  location TEXT,
  board_members INT DEFAULT 0,
  residents INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Motions table
CREATE TABLE IF NOT EXISTS motions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  mover TEXT NOT NULL,
  seconder TEXT NOT NULL,
  result TEXT DEFAULT 'Carried' CHECK (result IN ('Carried', 'Defeated', 'Tabled'))
);

-- 5. Action Items table
CREATE TABLE IF NOT EXISTS action_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  task TEXT NOT NULL,
  assignee TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed'))
);

-- =============================================
-- Row Level Security (RLS) — Data Isolation
-- Each org can ONLY see their own data
-- =============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE motions ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Organizations: members can view their org
CREATE POLICY "Members can view their organization"
  ON organizations FOR SELECT
  USING (
    id IN (SELECT organization_id FROM profiles WHERE profiles.id = auth.uid())
  );

-- Meetings: org members can CRUD their org's meetings
CREATE POLICY "Org members can view meetings"
  ON meetings FOR SELECT
  USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Org members can insert meetings"
  ON meetings FOR INSERT
  WITH CHECK (
    organization_id IN (SELECT organization_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Org members can update meetings"
  ON meetings FOR UPDATE
  USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE profiles.id = auth.uid())
  );

-- Motions: accessible if the parent meeting belongs to user's org
CREATE POLICY "Org members can view motions"
  ON motions FOR SELECT
  USING (
    meeting_id IN (
      SELECT id FROM meetings WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Org members can insert motions"
  ON motions FOR INSERT
  WITH CHECK (
    meeting_id IN (
      SELECT id FROM meetings WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE profiles.id = auth.uid()
      )
    )
  );

-- Action Items: same pattern as motions
CREATE POLICY "Org members can view action items"
  ON action_items FOR SELECT
  USING (
    meeting_id IN (
      SELECT id FROM meetings WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Org members can insert action items"
  ON action_items FOR INSERT
  WITH CHECK (
    meeting_id IN (
      SELECT id FROM meetings WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE profiles.id = auth.uid()
      )
    )
  );

-- =============================================
-- Auto-create profile + org on signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Create organization from signup metadata
  INSERT INTO organizations (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'organization_name', 'My Organization'))
  RETURNING id INTO new_org_id;

  -- Create profile linked to org
  INSERT INTO profiles (id, organization_id, full_name, email)
  VALUES (
    NEW.id,
    new_org_id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fire after a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
