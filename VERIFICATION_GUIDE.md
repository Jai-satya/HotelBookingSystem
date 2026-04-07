# Quick Verification Guide

## Step 1: Verify H2 Console is Accessible

Once backend is running:

1. Open browser and go to: http://localhost:8080/h2-console

2. Enter these settings:
   - **JDBC URL:** `jdbc:h2:mem:hotel_db`
   - **User Name:** `sa`
   - **Password:** (leave empty)

3. Click "Connect"

Expected: H2 console opens showing database structure

### Verify Tables Exist:
```sql
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC';
```

You should see:
```
TABLE_NAME
-----------
ADDRESSES
AMENITIES
BOOKING
HOTEL_AMENITIES
HOTELS
PAYMENT
REVIEW
ROOM_CATEGORIES
ROOMS
USERS
```

### Check Sample Data:
```sql
SELECT COUNT(*) as hotel_count FROM HOTELS;
SELECT COUNT(*) as room_count FROM ROOMS;
SELECT COUNT(*) as user_count FROM USERS;
```

Expected counts:
- hotels: 6
- rooms: 20+
- users: 4

---

## Step 2: Verify Backend is Running

### Build Backend:
```bash
cd backend/HotelBookingSystem
mvnw.cmd clean install
```

Expected: `BUILD SUCCESS` message

### Start Backend:
```bash
mvnw.cmd spring-boot:run
```

Expected output should include:
```
Started HotelBookingSystemApplication in X.XXX seconds
```

### Test Backend API:
Open browser and go to: http://localhost:8080/api/hotels

Expected response (JSON):
```json
[
  {
    "hotelId": 1,
    "name": "Luxury Plaza Hotel",
    "description": "Experience 5-star comfort...",
    "rating": 4.8,
    "contactEmail": "contact@luxuryplaza.com",
    "contactPhone": "+1-555-0100",
    "createdAt": "2024-04-07T10:00:00",
    "amenities": [...]
  },
  ...
]
```

### View API Documentation:
Go to: http://localhost:8080/swagger-ui.html

You should see all endpoints:
- GET /api/hotels
- GET /api/hotels/{id}
- GET /api/hotels/{id}/rooms
- POST /api/auth/login
- POST /api/auth/register
- POST /api/bookings
- etc.

---

## Step 3: Verify Frontend is Running

### Install Dependencies:
```bash
cd frontend
npm install
```

Expected: No errors, `added X packages`

### Start Frontend:
```bash
npm run dev
```

Expected output:
```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open browser: http://localhost:5173

You should see:
- Header with navigation menu
- Hotel listing page loading
- 6 hotels displayed in cards
- Each hotel showing rating and description

---

## Step 4: Verify Database Connectivity

### Check H2 Database:
1. Open http://localhost:8080/h2-console
2. Login with:
   - JDBC URL: `jdbc:h2:mem:hotel_db`
   - User Name: `sa`
   - Password: (empty)

3. Run a test query:
```sql
SELECT * FROM HOTELS LIMIT 1;
```

You should see hotel data returned.

### Test Login:
1. Click "Login" in navbar
2. Enter credentials:
   - Email: `admin@luxestay.com`
   - Password: `password123`
3. Click Login

Expected:
- ✅ Login succeeds
- ✅ Redirected to dashboard/home page
- ✅ Welcome message with user name

### Check Browser Console:
Press F12 and go to Network tab

You should see successful API calls:
- ✅ `GET /api/hotels` - Status 200
- ✅ `POST /api/auth/login` - Status 200

No CORS errors should appear.

---

## Step 5: Verify Data Flow

### View Hotel Details:
1. Click on any hotel card
2. Check details load correctly:
   - Hotel name, description, rating
   - Contact email and phone
   - Listed amenities
   - Available rooms with categories

### View Available Rooms:
1. Select check-in and check-out dates
2. Click "Search" or "Check Availability"

Expected:
- ✅ Rooms from database displayed
- ✅ Room categories with pricing
- ✅ Room numbers and availability status
- ✅ Capacity information

### Check Database During Operation:
```sql
-- Query from H2 Console
-- While logged in, check if user session is stored
SELECT * FROM USERS WHERE EMAIL = 'admin@luxestay.com';

-- View all hotels with room count
SELECT h.NAME, COUNT(r.ROOM_ID) as rooms 
FROM HOTELS h 
LEFT JOIN ROOMS r ON h.HOTEL_ID = r.HOTEL_ID 
GROUP BY h.HOTEL_ID, h.NAME;
```

---

## Troubleshooting Verification

### Backend not visible:
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Check if H2 database initialized (in backend logs)
# Should see: Starting H2 embedded database instance...
```

### Frontend not connecting to backend:
```bash
# Check Network tab in browser F12
# Filter by /api calls
# Should see status 200, not 0 or CORS errors

# If CORS error appears:
# Verify backend has @CrossOrigin annotation
# Check vite.config.js has proxy configured
```

### Missing data in database:
```
# Open H2 Console: http://localhost:8080/h2-console
# Run: SELECT * FROM HOTELS;

# If empty, check:
# 1. data.sql file exists in src/main/resources/
# 2. application.yml has sql.init.mode = always
# 3. Backend logs show data loading
```

### Login not working:
```bash
# Open H2 Console: http://localhost:8080/h2-console
# Run: SELECT * FROM USERS WHERE EMAIL = 'admin@luxestay.com';

# Verify user exists and check:
# 1. Backend logs for auth errors
# 2. JWT secret is configured in application.yml
# 3. Password in database is bcrypt encrypted
```

---

## Performance Check

### Database Performance:
```sql
-- Should return instantly
SELECT COUNT(*) FROM hotels;
SELECT COUNT(*) FROM rooms;
SELECT COUNT(*) FROM users;

-- Check indexes are created
\d hotels
```

### API Response Time:
Open DevTools (F12) → Network tab
- `GET /api/hotels` should complete in <500ms
- `GET /api/hotels/{id}/rooms` should complete in <800ms

### Frontend Load Time:
- Page should load in <3 seconds
- Hotels should display in <2 seconds after page load

---

## Final Verification Checklist

- [ ] H2 Console accessible: http://localhost:8080/h2-console
- [ ] H2 database connected with test credentials (sa/empty)
- [ ] 10 tables created in H2 database
- [ ] 6 hotels with data visible in H2
- [ ] 20+ rooms with data visible in H2
- [ ] 4 test users created in H2
- [ ] Backend startup message: "Started HotelBookingSystemApplication"
- [ ] Backend API responds: http://localhost:8080/api/hotels
- [ ] Frontend page loads: http://localhost:5173
- [ ] Dashboard shows 6 hotel cards
- [ ] Login works with credentials
- [ ] No CORS errors in console
- [ ] Network calls show 200 status
- [ ] Hotel details load correctly
- [ ] Room list displays with categories

---

## Success = All Checks Pass! ✅

Once all above items are verified, your Hotel Booking System is fully integrated and ready for:
- Development and testing
- Feature implementation
- Bug fixes and improvements
- Production deployment (after switching to persistent database)

**H2 Database → Backend → Frontend = Complete Integration!** 🎉
