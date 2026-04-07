import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state;
  
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!state?.room || !state?.hotelId) {
      navigate('/hotels');
      return;
    }

    const fetchHotel = async () => {
      try {
        const data = await api.getHotelById(state.hotelId);
        setHotel(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [state, navigate]);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return state?.room?.base_price || 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? (state.room.base_price * diffDays) : state.room.base_price;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert("Select check-in and check-out dates");
    setProcessing(true);
    
    try {
      await api.createBooking({
        user_id: user.user_id,
        hotel_id: hotel.hotel_id,
        room_id: state.room.room_id,
        check_in: checkIn,
        check_out: checkOut,
        total_amount: calculateTotal()
      });
      navigate('/dashboard', { state: { message: "Booking confirmed successfully!" } });
    } catch (err) {
      alert("Failed to confirm booking.");
      setProcessing(false);
    }
  };

  if (loading || !hotel) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-navy mb-8">Confirm Your Booking</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Booking Form */}
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Reservation Details</h2>
            <form onSubmit={handleConfirm} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Date</label>
                  <input 
                    type="date" 
                    required 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Date</label>
                  <input 
                    type="date" 
                    required 
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none" 
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Payment Method</h3>
                <div className="flex items-center p-4 border border-brand-blue bg-blue-50/50 rounded-xl">
                  <input type="radio" checked readOnly className="text-brand-blue focus:ring-brand-blue" />
                  <span className="ml-3 font-medium text-brand-navy">Pay at Hotel</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={processing}
                className="w-full py-4 bg-brand-blue hover:bg-brand-accent text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-blue/20 disabled:opacity-70 mt-4"
              >
                {processing ? 'Processing...' : `Confirm Booking - ₹${calculateTotal()}`}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden">
                <img src={`https://picsum.photos/seed/${hotel.hotel_id * 10}/600/400`} alt="Hotel" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-brand-navy">{hotel.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{state.room.category_name}</p>
              
              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Price (per night)</span>
                  <span className="font-medium">₹{state.room.base_price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxes & Fees</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-brand-blue">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
