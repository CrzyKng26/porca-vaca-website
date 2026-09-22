CREATE TABLE IF NOT EXISTS signature_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE signature_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active signature images" ON signature_images FOR SELECT USING (is_active = true);

-- Seed with 6 Unsplash meat/restaurant images
INSERT INTO signature_images (url, alt_text, display_order, is_active) VALUES
  ('https://images.unsplash.com/photo-1544025162-811114b03cc1?q=80&w=1200&auto=format&fit=crop', 'Signature smoked brisket', 1, true),
  ('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', 'Wood fire grill', 2, true),
  ('https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200&auto=format&fit=crop', 'Premium wagyu cuts', 3, true),
  ('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200&auto=format&fit=crop', 'Artisan burger', 4, true),
  ('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop', 'Fine dining interior', 5, true),
  ('https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop', 'Neapolitan pizza', 6, true);
