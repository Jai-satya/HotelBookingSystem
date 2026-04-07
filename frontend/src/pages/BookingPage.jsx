import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'payAtHotel'

  // Get room and hotelId from navigation state (sent by RoomCard)
  const room = location.state?.room || null;
  const hotelId = location.state?.hotelId || null;

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    if (!room) {
      navigate('/hotels');
    }
  }, [user, room, navigate]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = new Date(checkOut) - new Date(checkIn);
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getPrice = () => {
    return room?.base_price || room?.roomCategory?.basePrice || 0;
  };

  const handlePayment = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }
    const nights = calculateNights();
    if (nights <= 0) {
      setError("Check-out date must be after check-in date");
      return;
    }

    setProcessing(true);
    setError('');

    const price = getPrice();
    const totalAmount = price * nights;

    // ── Pay at Hotel flow ──
    if (paymentMethod === 'payAtHotel') {
      try {
        await api.createBooking({
          user_id: user?.user_id || 1,
          hotel_id: parseInt(hotelId),
          room_id: room?.room_id || room?.roomId,
          room_name: room?.category_name || room?.roomCategory?.name || 'Room',
          hotel_name: room?.hotel_name || `Hotel #${hotelId}`,
          check_in: checkIn,
          check_out: checkOut,
          total_amount: totalAmount,
          payment_method: 'Pay at Hotel'
        });
        navigate('/dashboard', {
          state: {
            message: "Booking confirmed! Pay ₹" + totalAmount.toLocaleString() + " at the hotel during check-in."
          }
        });
      } catch (err) {
        setError(err.message || "Failed to save booking.");
        setProcessing(false);
      }
      return;
    }

    // ── Razorpay flow ──
    const amountInPaise = Math.round(totalAmount * 100);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      const options = {
        key: "rzp_test_SaXL0fheGFoGLq",
        amount: amountInPaise,
        currency: "INR",
        name: "LuxeStay",
        description: `${room?.category_name || room?.roomCategory?.name || 'Room'} — ${nights} night${nights > 1 ? 's' : ''}`,
        handler: function (response) {
          navigate('/dashboard', {
            state: {
              message: "Payment successful! Booking confirmed.",
              paymentId: response.razorpay_payment_id
            }
          });
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@luxestay.com",
          contact: ""
        },
        notes: {
          hotelId: hotelId,
          roomId: room?.room_id || room?.roomId,
          checkIn: checkIn,
          checkOut: checkOut,
          nights: nights
        },
        theme: {
          color: "#6366F1"
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError(`Payment failed: ${response.error.description}`);
        setProcessing(false);
      });
      rzp.open();

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <p className="text-slate-500">Redirecting...</p>
      </div>
    );
  }

  const nights = calculateNights();
  const price = getPrice();
  const total = price * (nights || 1);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-8">Complete Your Booking</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 shadow-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column — dates & payment method */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Select Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            {/* ── Payment Method Selection ── */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Payment Method</h2>
              <div className="space-y-3">

                {/* Option 1 — Razorpay */}
                <div
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border-2 ${
                    paymentMethod === 'razorpay'
                      ? 'border-indigo-400 bg-indigo-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'razorpay' ? 'border-indigo-500' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'razorpay' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-brand-navy">Razorpay</span>
                      <p className="text-xs text-slate-400 mt-0.5">Pay securely online now</p>
                    </div>
                  </div>
                  <div className="flex space-x-1.5">
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">UPI</span>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Cards</span>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Netbanking</span>
                  </div>
                </div>

                {/* Option 2 — Pay at Hotel */}
                <div
                  onClick={() => setPaymentMethod('payAtHotel')}
                  className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border-2 ${
                    paymentMethod === 'payAtHotel'
                      ? 'border-emerald-400 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'payAtHotel' ? 'border-emerald-500' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'payAtHotel' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-brand-navy">Pay at Hotel</span>
                      <p className="text-xs text-slate-400 mt-0.5">Pay cash or card at the front desk during check-in</p>
                    </div>
                  </div>
                  <div className="flex space-x-1.5">
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Cash</span>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Card</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right column — booking summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 sticky top-24">
              <div className="h-32 bg-slate-200 relative">
                <img
                  src={`https://picsum.photos/seed/${(hotelId || 1) * 10}/800/400`}
                  alt="Hotel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-brand-navy mb-1">
                  {room?.category_name || room?.roomCategory?.name || 'Room'}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Room #{room?.room_number || room?.roomNumber || '—'} · Sleeps {room?.capacity || room?.roomCategory?.capacity || 2}
                </p>

                <hr className="border-slate-100 mb-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>₹{price.toLocaleString()} × {nights || 1} night{(nights || 1) > 1 ? 's' : ''}</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹0</span>
                  </div>
                </div>

                <hr className="border-slate-100 mb-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="font-bold text-xl text-brand-navy">₹{total.toLocaleString()}</span>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className={`w-full py-3 text-white font-bold rounded-xl transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    paymentMethod === 'payAtHotel'
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
                  }`}
                >
                  {processing
                    ? (paymentMethod === 'payAtHotel' ? 'Confirming...' : 'Connecting to Razorpay...')
                    : (paymentMethod === 'payAtHotel'
                        ? 'Confirm Booking'
                        : `Pay ₹${total.toLocaleString()}`)
                  }
                </button>

                <p className="text-xs text-center text-slate-400 mt-4">
                  {paymentMethod === 'payAtHotel'
                    ? 'No advance payment needed — pay at the front desk'
                    : 'Secure payment powered by Razorpay'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
