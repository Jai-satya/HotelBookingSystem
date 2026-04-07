package com.example.HotelBookingSystem.service;

import com.example.HotelBookingSystem.dto.PaymentRequest;
import com.example.HotelBookingSystem.entity.Booking;
import com.example.HotelBookingSystem.entity.Payment;
import com.example.HotelBookingSystem.repository.BookingRepository;
import com.example.HotelBookingSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public Payment processPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(request.getAmount());
        payment.setMethod(request.getMethod());
        payment.setStatus("SUCCESS");
        
        payment = paymentRepository.save(payment);
        
        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);

        return payment;
    }
}
