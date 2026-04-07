-- Insert Amenities
INSERT INTO amenities (name) VALUES 
('WiFi'),
('Swimming Pool'),
('Gym'),
('Spa'),
('Restaurant'),
('Bar'),
('Air Conditioning'),
('Television'),
('Room Service'),
('Parking');

-- Insert Addresses
INSERT INTO addresses (street, city, state, country, zip_code) VALUES 
('123 Main Street', 'New York', 'NY', 'USA', '10001'),
('456 Ocean Avenue', 'Miami', 'FL', 'USA', '33101'),
('789 Business Blvd', 'Chicago', 'IL', 'USA', '60601'),
('321 Heritage Lane', 'Boston', 'MA', 'USA', '02101'),
('654 Budget Road', 'Los Angeles', 'CA', 'USA', '90001'),
('987 Mountain Pass', 'Denver', 'CO', 'USA', '80201');

-- Insert Hotels
INSERT INTO hotels (name, description, address_id, rating, contact_email, contact_phone, created_at) VALUES 
('Luxury Plaza Hotel', 'Experience 5-star comfort right in the heart of the city.', 1, 4.8, 'contact@luxuryplaza.com', '+1-555-0100', NOW()),
('Seaside Resort & Spa', 'Relaxing oceanfront property with premium spa amenities.', 2, 4.6, 'hello@seasideresort.com', '+1-555-0200', NOW()),
('Downtown Business Suites', 'Perfect for the modern corporate business traveler.', 3, 4.2, 'info@downtownsuites.com', '+1-555-0300', NOW()),
('The Royal Orchard Inn', 'Heritage property offering a blend of traditional culture and modern luxury.', 4, 4.9, 'stay@royalorchard.com', '+1-555-0400', NOW()),
('Skyline Budget Stays', 'Affordable, clean, and highly accessible locations for backpackers.', 5, 3.8, 'contact@skylinebudget.com', '+1-555-0500', NOW()),
('Mountain View Lodge', 'Breathtaking views of the mountains, with cozy fireplaces in every room.', 6, 4.5, 'bookings@mountainview.com', '+1-555-0600', NOW());

-- Insert Room Categories
INSERT INTO room_categories (name, base_price, capacity) VALUES 
('Deluxe King', 4500, 2),
('Presidential Suite', 15000, 4),
('Ocean View Standard', 3000, 2),
('Business Studio', 2500, 1),
('Heritage Suite', 8500, 3),
('Royal Villa', 22000, 6),
('Compact Single', 900, 1),
('Double Bunk Room', 1500, 4),
('Alpine Cabana', 5200, 2);

-- Insert Rooms (Hotel 1 - Luxury Plaza)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(1, 1, '201A', true),
(1, 2, 'PH-1', true),
(1, 1, '202B', true),
(1, 1, '203C', false);

-- Insert Rooms (Hotel 2 - Seaside Resort)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(2, 3, '101B', true),
(2, 3, '102B', true),
(2, 3, '103B', true),
(2, 1, '104B', true);

-- Insert Rooms (Hotel 3 - Downtown Business)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(3, 4, '505C', true),
(3, 4, '506C', true),
(3, 4, '507C', true),
(3, 1, '508C', true);

-- Insert Rooms (Hotel 4 - Royal Orchard Inn)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(4, 5, '110', true),
(4, 6, 'V-1', false),
(4, 5, '111', true),
(4, 1, '112', true);

-- Insert Rooms (Hotel 5 - Skyline Budget)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(5, 7, 'B12', true),
(5, 8, 'B14', true),
(5, 7, 'B15', true),
(5, 8, 'B16', true);

-- Insert Rooms (Hotel 6 - Mountain View Lodge)
INSERT INTO rooms (hotel_id, category_id, room_number, availability) VALUES 
(6, 9, 'C-4', true),
(6, 9, 'C-5', true),
(6, 9, 'C-6', true),
(6, 1, 'C-7', true);

-- Associate Hotels with Amenities
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 8), (1, 9), (1, 10),
(2, 1), (2, 2), (2, 4), (2, 5), (2, 6), (2, 8), (2, 9),
(3, 1), (3, 3), (3, 5), (3, 8), (3, 9), (3, 10),
(4, 1), (4, 3), (4, 4), (4, 5), (4, 6), (4, 8), (4, 9), (4, 10),
(5, 1), (5, 8), (5, 9),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 8), (6, 9), (6, 10);

-- Insert Sample Users
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@luxestay.com', '$2a$10$Ib2bVahWTNlrDvkLvvpE.Oxr0Gu7XxC7FxyQvKGFi5ZY0dBwPYM/m', 'ADMIN'),
('John Doe', 'john.doe@example.com', '$2a$10$Ib2bVahWTNlrDvkLvvpE.Oxr0Gu7XxC7FxyQvKGFi5ZY0dBwPYM/m', 'USER'),
('Jane Smith', 'jane.smith@example.com', '$2a$10$Ib2bVahWTNlrDvkLvvpE.Oxr0Gu7XxC7FxyQvKGFi5ZY0dBwPYM/m', 'USER'),
('Robert Johnson', 'robert.j@example.com', '$2a$10$Ib2bVahWTNlrDvkLvvpE.Oxr0Gu7XxC7FxyQvKGFi5ZY0dBwPYM/m', 'USER');
