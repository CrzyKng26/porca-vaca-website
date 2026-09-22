-- ==========================================
-- PORCA & VACA V4.5 - DEMO SEED DATA
-- ==========================================

-- 1. RESTAURANT SETTINGS
INSERT INTO restaurant_settings (restaurant_name, phone, whatsapp_number, email, address, google_maps_url, instagram_url, website_url, lunch_start, lunch_end, dinner_start, dinner_end, reservation_enabled, is_demo)
VALUES (
  'Porca & Vaca',
  '+91 81900 05040',
  '918190005040',
  'hello@porcaandvaca.in',
  '42, Sriram Colony, Bheemanna Garden Street, Alwarpet, Chennai',
  'https://maps.google.com/?q=Porca+And+Vaca+Chennai',
  'https://instagram.com/porcaandvaca',
  'https://porcaandvaca.in',
  '12:00:00',
  '15:30:00',
  '19:00:00',
  '23:00:00',
  true,
  true
);

-- 2. MEAT MAFIA STORY EVENTS (The New Instagram-Style Feature)
INSERT INTO mafia_story_events (title, image_url, description, display_order, is_active, is_demo)
VALUES 
  ('The Wagyu Arrival', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=60&w=800&auto=format&fit=crop', 'First batch of A5 just touched down.', 1, true, true),
  ('Midnight Smoker', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=60&w=800&auto=format&fit=crop', 'Firing up the oak for tomorrow''s brisket.', 2, true, true),
  ('Secret Tasting', 'https://images.unsplash.com/photo-1544025162-811114b03cc1?q=60&w=800&auto=format&fit=crop', 'Testing the new 60-day dry-aged cuts.', 3, true, true),
  ('Pitmaster Class', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=60&w=800&auto=format&fit=crop', 'Learning the art of the perfect bark.', 4, true, true);

-- 3. MENU CATEGORIES
INSERT INTO menu_categories (name, slug, display_order, is_active) VALUES
  ('ALL CUTS', 'all', 1, true),
  ('VELOUTÉ', 'veloute', 2, true),
  ('PASSPORT PLATES', 'passport', 3, true),
  ('GLOBAL COMFORT', 'comfort', 4, true),
  ('NEAPOLITAN PIZZAS', 'pizzas', 5, true),
  ('BURGERS', 'burgers', 6, true);

-- 4. TEAM MEMBERS
INSERT INTO team_members (name, role, image_url, display_order, is_demo)
VALUES
  ('John Doe', 'FOUNDER', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=60&w=800&auto=format&fit=crop', 1, true),
  ('Chef Smith', 'CHEF', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=60&w=800&auto=format&fit=crop', 2, true),
  ('Jane Doe', 'BUSINESS HEAD', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=60&w=800&auto=format&fit=crop', 3, true);

-- 5. TESTIMONIALS
INSERT INTO testimonials (customer_name, role, location, quote, display_order, is_demo)
VALUES
  ('Vikram R.', 'FOOD CRITIC', 'BANGALORE', 'The 60-day dry-aged ribeye was unlike anything I''ve had in Chennai. Period.', 1, true),
  ('Sarah M.', 'LOCAL GUIDE', 'CHENNAI', 'The brisket melts in your mouth. Worth every penny.', 2, true);
