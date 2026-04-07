# 🏨 LuxeStay — Hotel Booking System

A full-stack hotel booking platform built with **Spring Boot** (backend) and **React + Vite** (frontend). Users can browse hotels, view available rooms, book stays, and pay online via **Razorpay** or choose to **pay at the hotel**.

---

## 📸 Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | JWT-based sign-up & login with role-based access (USER / ADMIN) |
| 🏢 **Hotel Browsing** | Browse hotels with search filters (city, rating, price range) |
| 🛏️ **Room Selection** | View room categories, capacity, pricing, and real-time availability |
| 💳 **Razorpay Checkout** | Secure online payment via UPI, cards, and netbanking |
| 🏠 **Pay at Hotel** | Reserve now and pay cash/card at the front desk during check-in |
| 📋 **Booking Dashboard** | View, track, and cancel your bookings |
| ⭐ **Reviews** | Rate and review hotels after your stay |
| 📧 **Email Notifications** | Booking confirmation emails (Spring Mail) |
| 📖 **API Documentation** | Interactive Swagger UI via SpringDoc OpenAPI |

---

## 🏗️ Tech Stack

### Backend
- **Java 21** + **Spring Boot 3.2.4**
- Spring Data JPA (Hibernate)
- Spring Security + JWT (`jjwt 0.11.5`)
- H2 Database (in-memory / file-based)
- Razorpay Java SDK (`1.4.6`)
- Resilience4j (rate limiting)
- SpringDoc OpenAPI (Swagger UI)
- Lombok

### Frontend
- **React 19** + **Vite**
- React Router v7
- Tailwind CSS
- Razorpay Checkout JS SDK
- Context API for auth state

---

## 📁 Project Structure

```
home/
├── backend/
│   └── HotelBookingSystem/
│       ├── src/main/java/com/example/HotelBookingSystem/
│       │   ├── config/          # Razorpay, Security, Web configs
│       │   ├── controller/      # REST controllers
│       │   │   ├── AuthController.java
│       │   │   ├── HotelController.java
│       │   │   ├── BookingController.java
│       │   │   ├── PaymentController.java
│       │   │   ├── ReviewController.java
│       │   │   └── UserController.java
│       │   ├── dto/             # Request/Response DTOs
│       │   ├── entity/          # JPA entities
│       │   │   ├── Hotel, Room, RoomCategory
│       │   │   ├── Booking, Payment
│       │   │   ├── User, Review, Notification
│       │   │   └── Address, Amenity
│       │   ├── exception/       # Global exception handling
│       │   ├── repository/      # Spring Data repositories
│       │   ├── security/        # JWT filter, UserDetails
│       │   └── service/         # Business logic layer
│       ├── src/main/resources/
│       │   ├── application.yml  # App configuration
│       │   └── data.sql         # Seed data
│       └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── RoomCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Route pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── HotelsPage.jsx
│   │   │   ├── HotelDetailsPage.jsx
│   │   │   ├── BookingPage.jsx  # Checkout + Razorpay
│   │   │   └── DashboardPage.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── services/
│   │   │   └── api.js           # API client + mock fallbacks
│   │   ├── App.jsx              # Router setup
│   │   └── index.css            # Tailwind + custom styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21+** (JDK)
- **Node.js 18+** & npm
- **Maven** (or use the included `mvnw` wrapper)

### 1. Clone the repository

```bash
git clone https://github.com/Jai-satya/HotelBookingSystem.git
cd HotelBookingSystem
```

### 2. Start the Backend

```bash
cd backend/HotelBookingSystem
./mvnw spring-boot:run
```

The backend starts at **http://localhost:8080**.

> **Swagger UI:** http://localhost:8080/swagger-ui.html
> **H2 Console:** http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:hotel_db`)

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at **http://localhost:5173**.

> The frontend includes **mock data fallbacks** — if the backend is not running, it uses built-in sample hotels, rooms, and booking data so the UI is fully functional for demo purposes.

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/register` | Register a new user |

### Hotels
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotels` | List all hotels |
| GET | `/api/hotels/{id}` | Get hotel details |
| GET | `/api/hotels/{id}/rooms` | Get rooms for a hotel |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/my-history` | Get current user's bookings |
| GET | `/api/bookings/{id}` | Get booking details |
| PUT | `/api/bookings/{id}/cancel` | Cancel a booking |

### Payments (Razorpay)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/process` | Process a payment |
| POST | `/api/payments/create-order` | Create Razorpay order |
| POST | `/api/payments/verify-signature` | Verify Razorpay signature |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Submit a review |
| GET | `/api/reviews/hotel/{hotelId}` | Get reviews for a hotel |

---

## 💳 Payment Integration

### Razorpay (Online Payment)
The app integrates **Razorpay** for secure online payments. On the checkout page:

1. User selects dates and clicks **"Pay ₹X"**
2. Razorpay Checkout SDK loads and opens the payment modal
3. User pays via UPI / Card / Netbanking
4. On success, the booking is confirmed and saved

**Test Credentials:**
- **Key ID:** `rzp_test_SaXL0fheGFoGLq`
- **Test Card:** `4111 1111 1111 1111` (any future expiry, any CVV)

### Pay at Hotel
Users can also choose **"Pay at Hotel"** to reserve without paying online:
- Booking is saved with status `CONFIRMED`
- Payment is collected at the front desk during check-in

---

## ⚙️ Configuration

### Backend (`application.yml`)

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:hotel_db      # In-memory DB (use jdbc:h2:file:./data/hotel_db for persistent)
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: create             # Use 'update' for persistent DB
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password

# JWT
jwt:
  secret: your-jwt-secret-key
  expiration: 86400000             # 24 hours

# Razorpay
razorpay:
  key:
    id: rzp_test_YOUR_KEY_ID
    secret: rzp_test_YOUR_SECRET
```

### Frontend
The Razorpay test key is configured in `BookingPage.jsx`. For production, use environment variables:

```bash
# .env
VITE_RAZORPAY_KEY=rzp_live_YOUR_KEY
```

---

## 🧪 Mock Data

When the backend is unavailable, the frontend falls back to mock data:

- **6 Hotels** — Luxury Plaza, Seaside Resort, Downtown Suites, Royal Orchard, Skyline Budget, Mountain View
- **10 Rooms** — Various categories (Deluxe King, Presidential Suite, Ocean View, etc.)
- **Prices** — ₹900 to ₹22,000 per night
- **Bookings** — Stored in `localStorage` so they persist across page reloads

---

## 👥 Team

- **Jai Satya** — Backend (Spring Boot, JPA, Security)
- **Frontend** — React UI, Razorpay Integration, Liquid Glass Design

---

## 📄 License

This project is for educational purposes.
