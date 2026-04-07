# Hotel Booking System - Setup Instructions

## Prerequisites
- Java 21 or higher
- Node.js 18+ and npm
- Maven 3.8+

**Note:** H2 Database is embedded and requires no installation!

---

## Step 1: Backend Setup

### 1. Navigate to backend directory:
```bash
cd backend/HotelBookingSystem
```

### 2. Build the project with Maven:
```bash
# On Windows
mvnw.cmd clean install

# On Linux/Mac
./mvnw clean install
```

### 3. Run the backend application:
```bash
# Using Maven
mvn spring-boot:run

# OR using Java directly (after build)
java -jar target/HotelBookingSystem-0.0.1-SNAPSHOT.jar
```

The backend will start at: **http://localhost:8080**

### 4. Verify Backend is Running:
- API Docs: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:hotel_db`
  - Username: `sa`
  - Password: (leave empty)

---

## Step 2: Verify Database Setup

The H2 in-memory database will be automatically created when the backend starts with dummy data:

### Tables Created:
- ✅ users
- ✅ addresses
- ✅ hotels
- ✅ amenities
- ✅ room_categories
- ✅ rooms
- ✅ hotel_amenities

### Sample Data Included:
- **6 Hotels** with full details
- **10 Amenities** (WiFi, Pool, Gym, etc.)
- **20+ Rooms** with various categories
- **4 Test Users** for testing login

### Access H2 Database Console:
1. Go to: http://localhost:8080/h2-console
2. Enter these settings:
   - JDBC URL: `jdbc:h2:mem:hotel_db`
   - User Name: `sa`
   - Password: (leave empty)
3. Click "Connect"

### Default Test Credentials:
```
Email: admin@luxestay.com
Password: password123

Email: john.doe@example.com
Password: password123

Email: jane.smith@example.com
Password: password123

Email: robert.j@example.com
Password: password123
```

**Note:** Passwords are bcrypt encrypted. Use the emails above to login.

---

## Step 3: Frontend Setup

### 1. Navigate to frontend directory:
```bash
cd frontend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start development server:
```bash
npm run dev
```

The frontend will start at: **http://localhost:5173**

---

## Step 4: Verify Full Connection

### Testing the Integration:

1. **Open Frontend:** http://localhost:5173
2. **Navigate to Login Page**
3. **Use test credentials:**
   - Email: `admin@luxestay.com`
   - Password: `password123`
4. **Verify:**
   - ✅ Hotels load from H2 database
   - ✅ Room details display correctly
   - ✅ Booking functionality works
   - ✅ Payment integration ready

---

## API Endpoints Available

### Hotels
- `GET /api/hotels` - List all hotels
- `GET /api/hotels/{id}` - Get hotel details
- `GET /api/hotels/{id}/rooms?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` - Get available rooms

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-signature` - Verify payment

---

## Troubleshooting

### Backend won't start:
```bash
# Check if port 8080 is already in use
# Verify JAVA_HOME is set correctly
# Check backend logs for errors
```

### Frontend can't connect to backend:
- Ensure backend is running on http://localhost:8080
- Check browser console for CORS errors
- Verify API base URL in `frontend/src/services/api.js`

### CORS Issues:
- Backend already has CORS enabled: `@CrossOrigin(origins = "*", maxAge = 3600)`
- If still having issues, check backend logs

### View Database Data:
- Go to: http://localhost:8080/h2-console
- Query: `SELECT * FROM hotels;`
- Login with: Username `sa`, Password (empty)

---

## Database Schema Quick Reference

### View Hotels
```sql
SELECT h.id, h.name, h.rating, COUNT(r.room_id) as total_rooms 
FROM hotels h
LEFT JOIN rooms r ON h.hotel_id = r.hotel_id
GROUP BY h.hotel_id, h.name, h.rating;
```

### View Available Rooms
```sql
SELECT h.name, rc.name as category, r.room_number, r.availability
FROM rooms r
JOIN hotels h ON r.hotel_id = h.hotel_id
JOIN room_categories rc ON r.category_id = rc.category_id
WHERE r.availability = true;
```

---

## Next Steps

1. ✅ Backend running on port 8080
2. ✅ Frontend running on port 5173
3. ✅ PostgreSQL connected with dummy data
4. ✅ Ready for development and testing!

**Happy Coding!** 🚀
