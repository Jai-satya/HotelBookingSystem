@echo off
REM Hotel Booking System - Quick Start Script for Windows

echo ==============================================================================
echo Hotel Booking System - Setup & Run
echo ==============================================================================
echo.

REM Note: H2 database is embedded, no external installation needed
echo [1] H2 Database is embedded (no installation needed) ✓

echo.
echo [2] Starting Backend Application...
echo.
cd backend\HotelBookingSystem
start cmd /k "mvnw.cmd spring-boot:run"
echo Backend starting on http://localhost:8080...
timeout /t 8

echo.
cd ..\..\

echo [3] Starting Frontend Application...
echo.
cd frontend
start cmd /k "npm run dev"
echo Frontend starting on http://localhost:5173...

echo.
echo ==============================================================================
echo Setup Complete!
echo ==============================================================================
echo.
echo ✓ Backend:  http://localhost:8080
echo ✓ Frontend: http://localhost:5173
echo ✓ H2 Console: http://localhost:8080/h2-console
echo ✓ API Docs: http://localhost:8080/swagger-ui.html
echo.
echo Test Login Credentials:
echo   Email: admin@luxestay.com
echo   Password: password123
echo.
echo H2 Console Access:
echo   JDBC URL: jdbc:h2:mem:hotel_db
echo   Username: sa
echo   Password: (leave empty)
echo.
echo Opening frontend in browser...
timeout /t 8
start http://localhost:5173

echo ==============================================================================
echo All services are running!
echo ==============================================================================
pause
