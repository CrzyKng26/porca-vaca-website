INSERT INTO testimonials (id, customer_name, role, location, quote, image_url, is_published, display_order)
VALUES
  (gen_random_uuid(), 'Vikram R.', 'Food Critic', 'Bangalore', 'The 60-day dry-aged ribeye was unlike anything I''ve had in Chennai. Period.', NULL, TRUE, 1),
  (gen_random_uuid(), 'Ananya S.', 'Regular', 'Mumbai', 'Brisket so good I almost missed my flight back to Bombay. Almost.', NULL, TRUE, 2),
  (gen_random_uuid(), 'Rajan K.', 'Member #019', 'Chennai', 'The Meat Mafia membership is the best free thing I''ve ever signed up for.', NULL, TRUE, 3),
  (gen_random_uuid(), 'Priya M.', 'Convert', 'Chennai', 'They refused to serve my steak well-done. I argued. I was wrong. I respect that.', NULL, TRUE, 4),
  (gen_random_uuid(), 'Arjun D.', 'First Visit', 'Hyderabad', 'The Pit Calculator on the website made me plan my visit three days in advance. Worth every minute.', NULL, TRUE, 5);

INSERT INTO team_members (id, name, role, bio, image_url, is_published, display_order)
VALUES
  (gen_random_uuid(), 'Founder Name', 'FOUNDER', 'The visionary behind Porca & Vaca.', '/team/founder.jpg', TRUE, 1),
  (gen_random_uuid(), 'Chef Name', 'CHEF', 'Master of the grill.', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=85&w=1200&auto=format&fit=crop', TRUE, 2),
  (gen_random_uuid(), 'Head Name', 'BUSINESS HEAD', 'Running the show.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=1200&auto=format&fit=crop', TRUE, 3),
  (gen_random_uuid(), 'Manager Name', 'MANAGER', 'Ensuring the best experience.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=85&w=1200&auto=format&fit=crop', TRUE, 4);
