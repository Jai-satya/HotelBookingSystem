import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotels/:id" element={<HotelDetailsPage />} />
              
              {/* Protected Routes */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
