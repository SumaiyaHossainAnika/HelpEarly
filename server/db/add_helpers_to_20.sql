-- Add 14 more helpers so the dataset contains 20 total helper accounts.
-- Safe to run on an existing database that already has the original 6 helpers.

-- New helper users (password: test123)
INSERT INTO users (name, email, password_hash, phone, role, location, latitude, longitude) VALUES
('Ayesha Sultana', 'ayesha@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01012345678', 'helper', 'Badda, Dhaka', 23.7806, 90.4256),
('Monirul Islam', 'monirul@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01722334455', 'helper', 'Rampura, Dhaka', 23.7639, 90.4250),
('Farzana Karim', 'farzana@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01822334455', 'helper', 'Banasree, Dhaka', 23.7667, 90.4378),
('Jahid Hasan', 'jahid@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01922334455', 'helper', 'Mirpur DOHS, Dhaka', 23.8336, 90.3666),
('Salma Khatun', 'salma@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01622334455', 'helper', 'Lalmatia, Dhaka', 23.7581, 90.3654),
('Rezaul Haque', 'rezaul@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01522334455', 'helper', 'Savar, Dhaka', 23.8583, 90.2667),
('Shila Akter', 'shila@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01422334455', 'helper', 'Wari, Dhaka', 23.7104, 90.4074),
('Omar Faruk', 'omar@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01322334455', 'helper', 'Tejgaon, Dhaka', 23.7637, 90.3910),
('Laila Noor', 'laila@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01222334455', 'helper', 'Shyamoli, Dhaka', 23.7745, 90.3651),
('Naeem Siddique', 'naeem@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01122334455', 'helper', 'Motijheel, Dhaka', 23.7337, 90.4170),
('Mita Paul', 'mita@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01799887766', 'helper', 'Khilgaon, Dhaka', 23.7513, 90.4252),
('Arif Chowdhury', 'arif@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01899887766', 'helper', 'Farmgate, Dhaka', 23.7589, 90.3891),
('Sahana Yeasmin', 'sahana@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01999887766', 'helper', 'Keraniganj, Dhaka', 23.6900, 90.3500),
('Imran Kabir', 'imran@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01699887766', 'helper', 'Jatrabari, Dhaka', 23.7118, 90.4335)
ON CONFLICT (email) DO NOTHING;

INSERT INTO helpers (user_id, bio, hourly_rate, is_verified, avg_rating, total_reviews, is_available, experience_years)
SELECT u.id, d.bio, d.rate, d.verified, d.rating, d.reviews, true, d.exp
FROM (VALUES
    ('ayesha@example.com', 'Reliable cleaner focused on kitchens, bathrooms, and move-out cleaning with consistent quality and punctual service.', 520, true, 4.7, 21, 5),
    ('monirul@example.com', 'Experienced plumber for leak fixing, water line repairs, and bathroom maintenance across residential apartments.', 780, true, 4.6, 17, 6),
    ('farzana@example.com', 'Warm and patient childcare helper who also supports homework routines and early learning activities.', 620, true, 4.8, 19, 5),
    ('jahid@example.com', 'Dependable handyman for home repairs, shelf installation, appliance setup, and moving-day heavy lifting.', 720, false, 4.4, 11, 4),
    ('salma@example.com', 'Home chef offering daily meal prep, weekly menus, and healthy family cooking tailored to your preferences.', 580, true, 4.6, 14, 7),
    ('rezaul@example.com', 'Gardening specialist for lawn care, pruning, seasonal planting, and outdoor area maintenance.', 650, true, 4.5, 16, 8),
    ('shila@example.com', 'Detail-oriented painter for bedrooms, living spaces, and touch-up jobs with clean finishing.', 760, true, 4.7, 13, 5),
    ('omar@example.com', 'Electrician with strong troubleshooting skills for switches, sockets, lighting, and safety inspections.', 880, true, 4.8, 27, 9),
    ('laila@example.com', 'Flexible household helper available for cleaning, childcare support, and regular upkeep for busy families.', 540, true, 4.5, 10, 4),
    ('naeem@example.com', 'Tutor focused on school subjects, study planning, and practical skill coaching for children and teens.', 690, true, 4.9, 22, 6),
    ('mita@example.com', 'Friendly cook and cleaner available for family meal prep, event support, and apartment upkeep.', 560, false, 4.4, 8, 4),
    ('arif@example.com', 'Strong and efficient moving assistant who also handles furniture assembly and small repair tasks.', 710, true, 4.6, 12, 5),
    ('sahana@example.com', 'Outdoor maintenance helper experienced in rooftop gardens, trimming, and regular plant care visits.', 640, true, 4.7, 15, 7),
    ('imran@example.com', 'Practical home repair expert combining plumbing fixes, fixture replacement, and handyman support.', 790, true, 4.6, 18, 6)
) AS d(email, bio, rate, verified, rating, reviews, exp)
JOIN users u ON u.email = d.email
ON CONFLICT DO NOTHING;

INSERT INTO helper_services (helper_id, category_id, service_name, description, price)
SELECT h.id, c.id, d.service_name, d.sdesc, d.price
FROM (VALUES
    ('ayesha@example.com', 'Cleaning', 'Move-Out Cleaning', 'Deep cleaning before moving out of an apartment or house', 1800),
    ('ayesha@example.com', 'Cleaning', 'Kitchen Deep Clean', 'Detailed kitchen cleaning including cabinets, counters, and stovetops', 950),
    ('monirul@example.com', 'Plumbing', 'Drain Unclogging', 'Clear blocked kitchen, bathroom, and floor drains', 900),
    ('monirul@example.com', 'Plumbing', 'Water Line Repair', 'Repair leaking or damaged home water lines', 1600),
    ('farzana@example.com', 'Babysitting', 'After-School Care', 'Supervise children after school and assist with routines', 1100),
    ('farzana@example.com', 'Tutoring', 'Primary School Tutoring', 'Homework help and tutoring for primary school students', 1300),
    ('jahid@example.com', 'Handyman', 'Wall Mount Installation', 'Install shelves, mirrors, and wall-mounted fixtures securely', 1200),
    ('jahid@example.com', 'Moving', 'Home Moving Assistance', 'Packing and lifting help for apartment relocation', 2500),
    ('salma@example.com', 'Cooking', 'Weekly Meal Prep', 'Prepare several family meals for the week in one visit', 1800),
    ('salma@example.com', 'Cooking', 'Dinner Party Cooking', 'Cook and plate a full dinner service for small home gatherings', 3500),
    ('rezaul@example.com', 'Gardening', 'Garden Cleanup', 'Clean up leaves, weeds, and overgrown areas in home gardens', 1400),
    ('rezaul@example.com', 'Gardening', 'Lawn and Plant Care', 'Routine mowing, watering, and plant maintenance service', 1700),
    ('shila@example.com', 'Painting', 'Accent Wall Painting', 'Paint a single feature wall with clean edges and finishing', 1800),
    ('shila@example.com', 'Painting', 'Apartment Repainting', 'Repaint a small apartment interior with two-coat coverage', 5200),
    ('omar@example.com', 'Electrical', 'Socket and Switch Repair', 'Repair or replace damaged switches, sockets, and plates', 1000),
    ('omar@example.com', 'Electrical', 'Ceiling Fan Installation', 'Install or replace ceiling fans with secure mounting', 1400),
    ('laila@example.com', 'Cleaning', 'Regular Apartment Cleaning', 'Recurring cleaning support for flats and family homes', 850),
    ('laila@example.com', 'Babysitting', 'Weekend Childcare', 'Half-day childcare support during weekends', 1200),
    ('naeem@example.com', 'Tutoring', 'Math Coaching', 'One-on-one math tutoring for school students', 1500),
    ('naeem@example.com', 'Tutoring', 'English Speaking Practice', 'Conversation and grammar support for learners', 1400),
    ('mita@example.com', 'Cooking', 'Lunch Preparation', 'Cook fresh lunch and basic sides for the family', 1000),
    ('mita@example.com', 'Cleaning', 'Quick Home Refresh', 'Light cleaning before guests arrive or after events', 700),
    ('arif@example.com', 'Moving', 'Furniture Moving Support', 'Move furniture safely within or between homes', 2200),
    ('arif@example.com', 'Handyman', 'Bed and Wardrobe Assembly', 'Assemble beds, wardrobes, and large household furniture', 1800),
    ('sahana@example.com', 'Gardening', 'Rooftop Garden Care', 'Maintain rooftop plants, containers, and seasonal growth', 1600),
    ('sahana@example.com', 'Gardening', 'Hedge Trimming', 'Trim hedges and shape shrubs for tidy outdoor spaces', 1500),
    ('imran@example.com', 'Plumbing', 'Bathroom Fixture Repair', 'Repair taps, showers, and bathroom plumbing fittings', 1300),
    ('imran@example.com', 'Handyman', 'Minor Home Repairs', 'Handle small household repairs and fixture replacements', 1100)
) AS d(email, category_name, service_name, sdesc, price)
JOIN users u ON u.email = d.email
JOIN helpers h ON h.user_id = u.id
JOIN categories c ON c.name = d.category_name
WHERE NOT EXISTS (
  SELECT 1
  FROM helper_services existing
  WHERE existing.helper_id = h.id
    AND existing.service_name = d.service_name
);
