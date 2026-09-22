-- ==========================================
-- PORCA & VACA V4.5 - INITIAL SCHEMA
-- ==========================================

-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. MENU CATEGORIES & ITEMS
-- ==========================================
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  dietary_type TEXT CHECK (dietary_type IN ('veg', 'non_veg', 'egg', 'seafood')),
  display_order INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. MEAT MAFIA STORY EVENTS (Updated per requirement)
-- ==========================================
CREATE TABLE IF NOT EXISTS mafia_story_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true, -- Admin can turn this off to hide it
  display_order INTEGER DEFAULT 0,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. TESTIMONIALS
-- ==========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  role TEXT,
  location TEXT,
  quote TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 4. TEAM MEMBERS
-- ==========================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 5. RESTAURANT SETTINGS
-- ==========================================
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  email TEXT,
  address TEXT,
  google_maps_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  lunch_start TIME,
  lunch_end TIME,
  dinner_start TIME,
  dinner_end TIME,
  reservation_enabled BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 6. RESERVATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guest_count INTEGER NOT NULL,
  occasion TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mafia_story_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (Anyone can read active/published items)
CREATE POLICY "Public can view active categories" ON menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view available menu items" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Public can view active mafia story events" ON mafia_story_events FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published team members" ON team_members FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view restaurant settings" ON restaurant_settings FOR SELECT USING (true);

-- 2. PUBLIC INSERT POLICIES
-- Public can ONLY insert reservations, nothing else.
CREATE POLICY "Public can insert reservations" ON reservations FOR INSERT WITH CHECK (true);
-- Public CANNOT read reservations (prevents scraping customer data)

-- 3. ADMIN FULL ACCESS POLICIES (Requires Supabase Auth)
-- We will use the 'authenticated' role for admins
CREATE POLICY "Admins have full access to menu_categories" ON menu_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to menu_items" ON menu_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to mafia_story_events" ON mafia_story_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to team_members" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to restaurant_settings" ON restaurant_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to reservations" ON reservations FOR ALL TO authenticated USING (true) WITH CHECK (true);
