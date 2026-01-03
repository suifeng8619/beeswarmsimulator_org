-- BSS Nexus Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stickers table
CREATE TABLE IF NOT EXISTS stickers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cub_skin', 'hive_skin', 'star_sign', 'field_stamp', 'tool', 'beesmas', 'other')),
  image_url TEXT,
  value INTEGER NOT NULL DEFAULT 0,
  trend TEXT DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  is_obtainable BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Beequips table
CREATE TABLE IF NOT EXISTS beequips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('regular', 'beesmas')),
  image_url TEXT,
  base_value INTEGER NOT NULL DEFAULT 0,
  max_potential INTEGER DEFAULT 5,
  trend TEXT DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bees table (for Hive Builder)
CREATE TABLE IF NOT EXISTS bees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary', 'mythic', 'event')),
  color TEXT NOT NULL CHECK (color IN ('red', 'blue', 'colorless')),
  image_url TEXT,
  description TEXT,
  abilities JSONB
);

-- Codes table
CREATE TABLE IF NOT EXISTS codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  reward_description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hive configurations
CREATE TABLE IF NOT EXISTS hive_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  share_token TEXT UNIQUE NOT NULL,
  config JSONB NOT NULL,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stickers_category ON stickers(category);
CREATE INDEX IF NOT EXISTS idx_stickers_value ON stickers(value DESC);
CREATE INDEX IF NOT EXISTS idx_beequips_category ON beequips(category);
CREATE INDEX IF NOT EXISTS idx_bees_rarity ON bees(rarity);
CREATE INDEX IF NOT EXISTS idx_bees_color ON bees(color);
CREATE INDEX IF NOT EXISTS idx_codes_active ON codes(is_active);
CREATE INDEX IF NOT EXISTS idx_hive_configs_user ON hive_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_hive_configs_token ON hive_configs(share_token);

-- Enable Row Level Security
ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE beequips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bees ENABLE ROW LEVEL SECURITY;
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read for game data
CREATE POLICY "Allow public read for stickers" ON stickers FOR SELECT USING (true);
CREATE POLICY "Allow public read for beequips" ON beequips FOR SELECT USING (true);
CREATE POLICY "Allow public read for bees" ON bees FOR SELECT USING (true);
CREATE POLICY "Allow public read for codes" ON codes FOR SELECT USING (true);

-- RLS Policies: Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: Hive configs
CREATE POLICY "Anyone can view shared hive configs" ON hive_configs FOR SELECT USING (true);
CREATE POLICY "Anyone can create hive configs" ON hive_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own hive configs" ON hive_configs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own hive configs" ON hive_configs FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_stickers_updated_at
  BEFORE UPDATE ON stickers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beequips_updated_at
  BEFORE UPDATE ON beequips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
