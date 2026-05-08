-- At Your Service Seed Data
-- Run after schema.sql

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (name, icon, description) VALUES
('Cleaning', '🧹', 'Home cleaning, deep cleaning, and organizing services'),
('Plumbing', '🔧', 'Pipe repairs, installations, and water system maintenance'),
('Electrical', '⚡', 'Wiring, fixture installation, and electrical repairs'),
('Gardening', '🌱', 'Lawn care, landscaping, and garden maintenance'),
('Babysitting', '👶', 'Childcare, tutoring, and after-school supervision'),
('Painting', '🎨', 'Interior and exterior painting services'),
('Moving', '📦', 'Packing, loading, and relocation assistance'),
('Handyman', '🔨', 'General repairs and home improvement tasks'),
('Cooking', '🍳', 'Meal preparation, catering, and cooking services'),
('Tutoring', '📚', 'Academic tutoring and skill-based training')
ON CONFLICT DO NOTHING;

-- ============================================
-- ADMIN USER (password: admin123)
-- ============================================
INSERT INTO users (name, email, password_hash, role, location)
VALUES (
    'Admin',
    'admin@helpearly.com',
    '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK',
    'admin',
    'Dhaka, Bangladesh'
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SAMPLE HOUSEHOLD USERS (password: test123)
-- ============================================
INSERT INTO users (name, email, password_hash, phone, role, location, latitude, longitude) VALUES
('Fatima Rahman', 'fatima@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01712345678', 'household', 'Gulshan, Dhaka', 23.7934, 90.4143),
('Kamal Hossain', 'kamal@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01812345678', 'household', 'Dhanmondi, Dhaka', 23.7465, 90.3760),
('Nusrat Jahan', 'nusrat@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01912345678', 'household', 'Banani, Dhaka', 23.7937, 90.4066)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SAMPLE HELPER USERS (password: test123)
-- ============================================
INSERT INTO users (name, email, password_hash, phone, role, location, latitude, longitude) VALUES
('Rahim Mia', 'rahim@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01612345678', 'helper', 'Mirpur, Dhaka', 23.8223, 90.3654),
('Sumon Das', 'sumon@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01512345678', 'helper', 'Uttara, Dhaka', 23.8759, 90.3795),
('Bijoy Kumar', 'bijoy@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01412345678', 'helper', 'Mohammadpur, Dhaka', 23.7662, 90.3589),
('Nasima Begum', 'nasima@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01312345678', 'helper', 'Bashundhara, Dhaka', 23.8192, 90.4372),
('Tariq Ahmed', 'tariq@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01212345678', 'helper', 'Gulshan, Dhaka', 23.7934, 90.4143),
('Ruma Akter', 'ruma@example.com', '$2a$10$8K1p/I0VR3HX.5Q0JY4oOe4w3Cp8dbDN3v3rXbBqJ.5A3v2O5M5MK', '01112345678', 'helper', 'Dhanmondi, Dhaka', 23.7465, 90.3760),
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

-- ============================================
-- HELPER PROFILES
-- ============================================
INSERT INTO helpers (user_id, bio, hourly_rate, is_verified, avg_rating, total_reviews, is_available, experience_years)
SELECT u.id, d.bio, d.rate, d.verified, d.rating, d.reviews, true, d.exp
FROM (VALUES
    ('rahim@example.com', 'Experienced cleaner with 5+ years in residential and commercial cleaning. I use eco-friendly products and pay attention to every detail.', 500, true, 4.8, 24, 5),
    ('sumon@example.com', 'Licensed plumber specializing in pipe repairs, bathroom installations, and water heater maintenance. Available on short notice.', 800, true, 4.6, 18, 7),
    ('bijoy@example.com', 'Certified electrician with expertise in wiring, panel upgrades, and smart home installations. Safety is my top priority.', 900, true, 4.9, 32, 10),
    ('nasima@example.com', 'Professional babysitter and childcare provider. CPR certified with experience caring for children aged 1-12.', 600, true, 4.7, 15, 4),
    ('tariq@example.com', 'Versatile handyman skilled in painting, furniture assembly, minor repairs, and general home maintenance.', 700, false, 4.3, 9, 3),
    ('ruma@example.com', 'Expert home cook specializing in traditional Bangladeshi cuisine. Also available for event catering and meal prep.', 550, true, 4.5, 12, 6),
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

-- ============================================
-- HELPER SERVICES
-- ============================================
INSERT INTO helper_services (helper_id, category_id, service_name, description, price)
SELECT h.id, c.id, d.service_name, d.sdesc, d.price
FROM (VALUES
    ('rahim@example.com', 'Cleaning', 'Deep Home Cleaning', 'Full house deep cleaning including kitchen, bathroom, and bedrooms', 1500),
    ('rahim@example.com', 'Cleaning', 'Regular Cleaning', 'Standard cleaning for apartments and small homes', 800),
    ('sumon@example.com', 'Plumbing', 'Pipe Repair', 'Fix leaking or broken pipes', 1200),
    ('sumon@example.com', 'Plumbing', 'Bathroom Installation', 'Full bathroom fixture installation', 3000),
    ('bijoy@example.com', 'Electrical', 'Wiring Repair', 'Diagnose and repair electrical wiring issues', 1500),
    ('bijoy@example.com', 'Electrical', 'Light Installation', 'Install ceiling lights, chandeliers, and fixtures', 800),
    ('nasima@example.com', 'Babysitting', 'Full Day Care', 'Full day childcare from 8 AM to 6 PM', 2000),
    ('nasima@example.com', 'Babysitting', 'Evening Babysitting', 'Evening childcare from 6 PM to 11 PM', 1000),
    ('tariq@example.com', 'Handyman', 'Furniture Assembly', 'Assemble any type of furniture', 1000),
    ('tariq@example.com', 'Painting', 'Room Painting', 'Paint one standard room including walls and ceiling', 2500),
    ('ruma@example.com', 'Cooking', 'Daily Meal Prep', 'Prepare lunch and dinner for a family of 4', 1200),
    ('ruma@example.com', 'Cooking', 'Event Catering', 'Full catering service for events up to 50 people', 8000),
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
ON CONFLICT DO NOTHING;

-- ============================================
-- HELPER CATEGORIES (Multi-category assignment)
-- ============================================
INSERT INTO helper_categories (helper_id, category_id, experience_years, hourly_rate)
SELECT h.id, c.id, d.exp_years, d.rate
FROM (VALUES
    ('rahim@example.com', 'Cleaning', 5, 500),
    ('sumon@example.com', 'Plumbing', 7, 800),
    ('bijoy@example.com', 'Electrical', 10, 900),
    ('nasima@example.com', 'Babysitting', 4, 600),
    ('tariq@example.com', 'Handyman', 3, 700),
    ('tariq@example.com', 'Painting', 3, 700),
    ('ruma@example.com', 'Cooking', 6, 550),
    ('ayesha@example.com', 'Cleaning', 5, 520),
    ('monirul@example.com', 'Plumbing', 6, 780),
    ('farzana@example.com', 'Babysitting', 5, 620),
    ('farzana@example.com', 'Tutoring', 5, 620),
    ('jahid@example.com', 'Handyman', 4, 720),
    ('jahid@example.com', 'Moving', 4, 720),
    ('salma@example.com', 'Cooking', 7, 580),
    ('rezaul@example.com', 'Gardening', 8, 650),
    ('shila@example.com', 'Painting', 5, 760),
    ('omar@example.com', 'Electrical', 9, 880),
    ('laila@example.com', 'Cleaning', 4, 540),
    ('laila@example.com', 'Babysitting', 4, 540),
    ('naeem@example.com', 'Tutoring', 6, 690),
    ('mita@example.com', 'Cooking', 4, 560),
    ('mita@example.com', 'Cleaning', 4, 560),
    ('arif@example.com', 'Moving', 5, 710),
    ('arif@example.com', 'Handyman', 5, 710),
    ('sahana@example.com', 'Gardening', 7, 640),
    ('imran@example.com', 'Plumbing', 6, 790),
    ('imran@example.com', 'Handyman', 6, 790)
) AS d(email, category_name, exp_years, rate)
JOIN users u ON u.email = d.email
JOIN helpers h ON h.user_id = u.id
JOIN categories c ON c.name = d.category_name
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE BOOKINGS
-- ============================================
INSERT INTO bookings (user_id, helper_id, service_id, booking_date, status, notes, total_price, address)
SELECT u.id, h.id, hs.id, d.booking_date::timestamp, d.status, d.notes, d.total_price, d.address
FROM (VALUES
    ('fatima@example.com', 'rahim@example.com', 'Deep Home Cleaning', '2026-04-20 10:00:00', 'confirmed', 'Please bring your own cleaning supplies', 1500, 'House 12, Road 5, Gulshan, Dhaka'),
    ('kamal@example.com', 'sumon@example.com', 'Pipe Repair', '2026-04-18 14:00:00', 'pending', 'Kitchen sink is leaking', 1200, 'Flat 4B, Dhanmondi 15, Dhaka'),
    ('nusrat@example.com', 'nasima@example.com', 'Full Day Care', '2026-04-22 08:00:00', 'confirmed', 'Two children, ages 3 and 5', 2000, 'House 8, Road 11, Banani, Dhaka')
) AS d(user_email, helper_email, svc_name, booking_date, status, notes, total_price, address)
JOIN users u ON u.email = d.user_email
JOIN users hu ON hu.email = d.helper_email
JOIN helpers h ON h.user_id = hu.id
JOIN helper_services hs ON hs.helper_id = h.id AND hs.service_name = d.svc_name
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE REVIEWS
-- ============================================
INSERT INTO reviews (user_id, helper_id, rating, comment)
SELECT u.id, h.id, d.rating, d.comment
FROM (VALUES
    ('fatima@example.com', 'rahim@example.com', 5, 'Excellent cleaning service! My house has never looked better. Very thorough and professional.'),
    ('kamal@example.com', 'bijoy@example.com', 5, 'Fixed all electrical issues quickly and safely. Highly recommended!'),
    ('nusrat@example.com', 'nasima@example.com', 4, 'Great with kids! My children loved her. Will definitely book again.'),
    ('fatima@example.com', 'sumon@example.com', 4, 'Good plumbing work. Arrived on time and fixed the issue efficiently.'),
    ('kamal@example.com', 'ruma@example.com', 5, 'Amazing food! The biryani was absolutely delicious. Perfect for our family dinner.')
) AS d(user_email, helper_email, rating, comment)
JOIN users u ON u.email = d.user_email
JOIN users hu ON hu.email = d.helper_email
JOIN helpers h ON h.user_id = hu.id
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE JOBS
-- ============================================
INSERT INTO jobs (user_id, category_id, title, description, budget, location, status, preferred_date)
SELECT u.id, c.id, d.title, d.jdesc, d.budget, d.location, d.status, d.preferred_date::timestamp
FROM (VALUES
    ('fatima@example.com', 'Cleaning', 'Need Deep Cleaning for 3-Bedroom Apartment', 'Looking for someone to do a thorough deep cleaning of my 3-bedroom apartment in Gulshan. Must include kitchen and bathrooms.', 2000, 'Gulshan, Dhaka', 'open', '2026-04-25 10:00:00'),
    ('kamal@example.com', 'Gardening', 'Garden Maintenance Needed Bi-Weekly', 'Need a gardener to maintain our backyard garden twice a month. Includes mowing, plant care, and hedge trimming.', 3000, 'Dhanmondi, Dhaka', 'open', '2026-04-28 09:00:00'),
    ('nusrat@example.com', 'Painting', 'Paint Two Rooms - Light Colors', 'Need two rooms painted in light pastel colors. Rooms are approximately 12x14 ft each. Paint will be provided.', 5000, 'Banani, Dhaka', 'open', '2026-05-01 08:00:00')
) AS d(user_email, category_name, title, jdesc, budget, location, status, preferred_date)
JOIN users u ON u.email = d.user_email
JOIN categories c ON c.name = d.category_name
ON CONFLICT DO NOTHING;
