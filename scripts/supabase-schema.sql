-- BSS Nexus Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- BEES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary', 'mythic', 'event')),
  color TEXT NOT NULL CHECK (color IN ('red', 'blue', 'colorless')),
  energy INTEGER DEFAULT 20,
  speed NUMERIC(5,2) DEFAULT 14,
  attack INTEGER DEFAULT 1,
  gather_amount INTEGER DEFAULT 10,
  image_url TEXT,
  description TEXT,
  abilities TEXT[] DEFAULT '{}',
  gifted_ability TEXT,
  obtain_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STICKERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS stickers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('cub_skin', 'hive_skin', 'star_sign', 'field_stamp', 'tool', 'beesmas', 'other')),
  image_url TEXT,
  value INTEGER NOT NULL DEFAULT 0,
  trend TEXT DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  is_obtainable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BEEQUIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS beequips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('regular', 'beesmas')),
  image_url TEXT,
  base_value INTEGER NOT NULL DEFAULT 0,
  max_potential INTEGER DEFAULT 5 CHECK (max_potential >= 1 AND max_potential <= 5),
  trend TEXT DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  reward_description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HIVE CONFIGS TABLE (for sharing hive builds)
-- ============================================
CREATE TABLE IF NOT EXISTS hive_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  share_token TEXT NOT NULL UNIQUE,
  name TEXT,
  config JSONB NOT NULL,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VALUE HISTORY TABLE (for tracking price changes)
-- ============================================
CREATE TABLE IF NOT EXISTS value_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_type TEXT NOT NULL CHECK (item_type IN ('sticker', 'beequip')),
  item_id UUID NOT NULL,
  old_value INTEGER NOT NULL,
  new_value INTEGER NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bees_rarity ON bees(rarity);
CREATE INDEX IF NOT EXISTS idx_bees_color ON bees(color);
CREATE INDEX IF NOT EXISTS idx_bees_slug ON bees(slug);
CREATE INDEX IF NOT EXISTS idx_stickers_category ON stickers(category);
CREATE INDEX IF NOT EXISTS idx_stickers_slug ON stickers(slug);
CREATE INDEX IF NOT EXISTS idx_stickers_value ON stickers(value DESC);
CREATE INDEX IF NOT EXISTS idx_beequips_category ON beequips(category);
CREATE INDEX IF NOT EXISTS idx_beequips_slug ON beequips(slug);
CREATE INDEX IF NOT EXISTS idx_codes_active ON codes(is_active);
CREATE INDEX IF NOT EXISTS idx_hive_configs_token ON hive_configs(share_token);
CREATE INDEX IF NOT EXISTS idx_value_history_item ON value_history(item_type, item_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE bees ENABLE ROW LEVEL SECURITY;
ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE beequips ENABLE ROW LEVEL SECURITY;
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE value_history ENABLE ROW LEVEL SECURITY;

-- Public read access for game data
CREATE POLICY "Public read access for bees" ON bees FOR SELECT USING (true);
CREATE POLICY "Public read access for stickers" ON stickers FOR SELECT USING (true);
CREATE POLICY "Public read access for beequips" ON beequips FOR SELECT USING (true);
CREATE POLICY "Public read access for codes" ON codes FOR SELECT USING (true);
CREATE POLICY "Public read access for hive_configs" ON hive_configs FOR SELECT USING (true);
CREATE POLICY "Public read access for value_history" ON value_history FOR SELECT USING (true);

-- Anyone can create hive configs (for sharing)
CREATE POLICY "Anyone can create hive configs" ON hive_configs FOR INSERT WITH CHECK (true);

-- ============================================
-- AUTO-UPDATE TIMESTAMP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_bees_updated_at
  BEFORE UPDATE ON bees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_stickers_updated_at
  BEFORE UPDATE ON stickers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_beequips_updated_at
  BEFORE UPDATE ON beequips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- VALUE CHANGE TRACKING TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION track_value_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'stickers' AND OLD.value != NEW.value THEN
    INSERT INTO value_history (item_type, item_id, old_value, new_value)
    VALUES ('sticker', NEW.id, OLD.value, NEW.value);
  ELSIF TG_TABLE_NAME = 'beequips' AND OLD.base_value != NEW.base_value THEN
    INSERT INTO value_history (item_type, item_id, old_value, new_value)
    VALUES ('beequip', NEW.id, OLD.base_value, NEW.base_value);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_sticker_value_change
  AFTER UPDATE ON stickers
  FOR EACH ROW EXECUTE FUNCTION track_value_change();

CREATE TRIGGER track_beequip_value_change
  AFTER UPDATE ON beequips
  FOR EACH ROW EXECUTE FUNCTION track_value_change();

-- Done! Your database is ready.
