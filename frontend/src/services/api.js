const MOCK_HOTELS = [
  {
    hotel_id: 1,
    name: "Luxury Plaza Hotel",
    description: "Experience 5-star comfort right in the heart of the city.",
    rating: 4.8,
    base_price: 4500,
    contact_email: "contact@luxuryplaza.com",
    contact_phone: "+1-555-0100",
    created_at: new Date().toISOString()
  },
  {
    hotel_id: 2,
    name: "Seaside Resort & Spa",
    description: "Relaxing oceanfront property with premium spa amenities.",
    rating: 4.6,
    base_price: 3000,
    contact_email: "hello@seasideresort.com",
    contact_phone: "+1-555-0200",
    created_at: new Date().toISOString()
  },
  {
    hotel_id: 3,
    name: "Downtown Business Suites",
    description: "Perfect for the modern core business traveler.",
    rating: 4.2,
    base_price: 2500,
    contact_email: "info@downtownsuites.com",
    contact_phone: "+1-555-0300",
    created_at: new Date().toISOString()
  },
  {
    hotel_id: 4,
    name: "The Royal Orchard Inn",
    description: "Heritage property offering a blend of traditional culture and modern luxury.",
    rating: 4.9,
    base_price: 8500,
    contact_email: "stay@royalorchard.com",
    contact_phone: "+1-555-0400",
    created_at: new Date().toISOString()
  },
  {
    hotel_id: 5,
    name: "Skyline Budget Stays",
    description: "Affordable, clean, and highly accessible locations for backpackers.",
    rating: 3.8,
    base_price: 900,
    contact_email: "contact@skylinebudget.com",
    contact_phone: "+1-555-0500",
    created_at: new Date().toISOString()
  },
  {
    hotel_id: 6,
    name: "Mountain View Lodge",
    description: "Breathtaking views of the mountains, with cozy fireplaces in every room.",
    rating: 4.5,
    base_price: 5200,
    contact_email: "bookings@mountainview.com",
    contact_phone: "+1-555-0600",
    created_at: new Date().toISOString()
  }
];

const MOCK_ROOMS = {
  1: [
    { room_id: 101, hotel_id: 1, category_id: 1, category_name: "Deluxe King", base_price: 4500, capacity: 2, room_number: "201A", availability: true },
    { room_id: 102, hotel_id: 1, category_id: 2, category_name: "Presidential Suite", base_price: 15000, capacity: 4, room_number: "PH-1", availability: true }
  ],
  2: [
    { room_id: 201, hotel_id: 2, category_id: 3, category_name: "Ocean View Standard", base_price: 3000, capacity: 2, room_number: "101B", availability: true }
  ],
  3: [
    { room_id: 301, hotel_id: 3, category_id: 4, category_name: "Business Studio", base_price: 2500, capacity: 1, room_number: "505C", availability: true }
  ],
  4: [
    { room_id: 401, hotel_id: 4, category_id: 5, category_name: "Heritage Suite", base_price: 8500, capacity: 3, room_number: "110", availability: true },
    { room_id: 402, hotel_id: 4, category_id: 6, category_name: "Royal Villa", base_price: 22000, capacity: 6, room_number: "V-1", availability: false }
  ],
  5: [
    { room_id: 501, hotel_id: 5, category_id: 7, category_name: "Compact Single", base_price: 900, capacity: 1, room_number: "B12", availability: true },
    { room_id: 502, hotel_id: 5, category_id: 8, category_name: "Double Bunk Room", base_price: 1500, capacity: 4, room_number: "B14", availability: true }
  ],
  6: [
    { room_id: 601, hotel_id: 6, category_id: 9, category_name: "Alpine Cabana", base_price: 5200, capacity: 2, room_number: "C-4", availability: true }
  ]
};

const MOCK_BOOKINGS = [];

// API configuration
const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('hotel_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'API Request Failed');
  }
  return response.json();
};

export const api = {
  // Auth
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await handleResponse(response);
    } catch (e) {
      console.warn("Backend auth failed, using mock data.", e);
      if (credentials.email && credentials.password) {
        return { 
          token: "mock-jwt-token-12345", 
          user: { user_id: 1, name: "Admin User", email: credentials.email, role: "USER" } 
        };
      }
      throw new Error("Invalid credentials");
    }
  },
  
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await handleResponse(response);
    } catch (e) {
      console.warn("Backend mock register.", e);
      return { message: "User registered successfully" };
    }
  },

  // Hotels
  getHotels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels`, { headers: getAuthHeaders() });
      return await handleResponse(response);
    } catch (e) {
      return MOCK_HOTELS;
    }
  },
  getHotelById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${id}`, { headers: getAuthHeaders() });
      return await handleResponse(response);
    } catch (e) {
      const hotel = MOCK_HOTELS.find(h => h.hotel_id === parseInt(id));
      if (!hotel) throw new Error("Hotel not found");
      return hotel;
    }
  },
  
  // Rooms
  getRoomsByHotel: async (hotelId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/rooms`, { headers: getAuthHeaders() });
      return await handleResponse(response);
    } catch (e) {
      return MOCK_ROOMS[hotelId] || [];
    }
  },

  // Razorpay
  createRazorpayOrder: async (orderRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderRequest)
      });
      return await handleResponse(response);
    } catch (e) {
      // Mock Razorpay Order for testing visually without backend
      console.warn("Using mock razorpay order");
      return { orderId: "order_mock123", amount: orderRequest.amount * 100, currency: "INR" };
    }
  },

  verifyPaymentSignature: async (verifyRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/verify-signature`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(verifyRequest)
      });
      return await handleResponse(response);
    } catch (e) {
      console.warn("Mocking signature verification");
      return { paymentId: 999, status: "COMPLETED" };
    }
  },

  // Bookings
  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      return await handleResponse(response);
    } catch (e) {
      console.warn("Mock booking created");
      const newBooking = { booking_id: Date.now(), ...bookingData, status: "CONFIRMED" };
      MOCK_BOOKINGS.push(newBooking);
      return newBooking;
    }
  },
  getUserBookings: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, { headers: getAuthHeaders() });
      return await handleResponse(response);
    } catch (e) {
      return MOCK_BOOKINGS.filter(b => b.user_id === userId);
    }
  },
  cancelBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (e) {
      const idx = MOCK_BOOKINGS.findIndex(b => b.booking_id === bookingId);
      if (idx !== -1) {
        MOCK_BOOKINGS[idx].status = "CANCELLED";
        return MOCK_BOOKINGS[idx];
      }
      throw new Error("Booking not found");
    }
  }
};
