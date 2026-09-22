-- Add missing columns for the frontend
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_signature BOOLEAN DEFAULT false;
ALTER TABLE menu_categories ADD COLUMN IF NOT EXISTS short_desc TEXT;

-- Update category descriptions to match frontend
UPDATE menu_categories SET short_desc = 'Complete offering' WHERE slug = 'all';
UPDATE menu_categories SET short_desc = 'Quick & bold' WHERE slug = 'veloute';
UPDATE menu_categories SET short_desc = 'International flavours' WHERE slug = 'passport';
UPDATE menu_categories SET short_desc = 'Familiar warmth' WHERE slug = 'comfort';
UPDATE menu_categories SET short_desc = 'Wood-fired' WHERE slug = 'pizzas';
UPDATE menu_categories SET short_desc = 'Stacked high' WHERE slug = 'burgers';

-- Seed Menu Items
DO $$
DECLARE
  veloute_id UUID;
  passport_id UUID;
  comfort_id UUID;
  pizzas_id UUID;
  burgers_id UUID;
BEGIN
  SELECT id INTO veloute_id FROM menu_categories WHERE slug = 'veloute';
  SELECT id INTO passport_id FROM menu_categories WHERE slug = 'passport';
  SELECT id INTO comfort_id FROM menu_categories WHERE slug = 'comfort';
  SELECT id INTO pizzas_id FROM menu_categories WHERE slug = 'pizzas';
  SELECT id INTO burgers_id FROM menu_categories WHERE slug = 'burgers';

  -- Veloute
  INSERT INTO menu_items (category_id, name, slug, description, price, is_signature, display_order)
  VALUES 
    (veloute_id, 'Bone Broth Velouté', 'bone-broth-veloute', 'A 48-hour simmered beef bone broth, clarified and enriched with cream. Served with a marrow toast.', 450, true, 1),
    (veloute_id, 'Smoked Tomato Bisque', 'smoked-tomato-bisque', 'Wood-smoked San Marzano tomatoes, pureed smooth with a hint of chili and basil oil. (Veg)', 350, false, 2);

  -- Passport Plates
  INSERT INTO menu_items (category_id, name, slug, description, price, is_signature, display_order)
  VALUES 
    (passport_id, 'Porchetta Romana', 'porchetta-romana', 'Rolled pork belly stuffed with wild fennel, garlic, and rosemary. Slow-roasted until the skin shatters.', 1200, true, 1),
    (passport_id, 'Argentinian Chimichurri Steak', 'chimichurri-steak', 'Wood-fired flank steak, sliced thin against the grain, drenched in a sharp garlic-herb chimichurri.', 1400, false, 2);

  -- Global Comfort
  INSERT INTO menu_items (category_id, name, slug, description, price, is_signature, display_order)
  VALUES 
    (comfort_id, 'Wagyu Brisket Mac & Cheese', 'brisket-mac-cheese', 'Three-cheese mornay sauce folded with smoked Wagyu brisket ends, baked with a crumb crust.', 850, true, 1),
    (comfort_id, 'Truffle Mushroom Risotto', 'truffle-risotto', 'Arborio rice slowly cooked with wild mushrooms, finished with truffle butter and aged parmesan. (Veg)', 750, false, 2);

  -- Pizzas
  INSERT INTO menu_items (category_id, name, slug, description, price, is_signature, display_order)
  VALUES 
    (pizzas_id, 'Pizza Diavola', 'pizza-diavola', 'A Neapolitan-style pizza that brings the heat. Topped with Sicilian Peperoni, fresh mozzarella, and chili.', 900, false, 1),
    (pizzas_id, 'Truffle Burrata Mushroom', 'truffle-burrata-pizza', 'Hand-stretched crust brushed with truffle oil, sautéd mushrooms, and crowned with creamy burrata. (Veg)', 1100, true, 2),
    (pizzas_id, 'Kerala Beef Neapolitan', 'kerala-beef-pizza', 'Coconut oil and parmesan base. Topped with tender Kerala-style beef fry alongside fresh mozzarella.', 950, false, 3);

  -- Burgers
  INSERT INTO menu_items (category_id, name, slug, description, price, is_signature, display_order)
  VALUES 
    (burgers_id, 'Smash Cheeseburger', 'smash-cheeseburger', 'Ground beef smashed onto a sizzling hot griddle, creating a crisp crust. Topped with melting cheese.', 650, false, 1),
    (burgers_id, 'Honey BBQ Pulled Pork', 'bbq-pulled-pork-burger', 'Slow-roasted pork shoulder, pulled to perfection and glazed in a rich honey BBQ sauce.', 700, false, 2),
    (burgers_id, 'Smoked Beef Brisket', 'brisket-burger', '16-hours oak-smoked brisket, crusted in black pepper, served with red wine caramelised onions.', 950, true, 3);

END $$;
