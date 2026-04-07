package com.example.HotelBookingSystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", referencedColumnName = "bookingId")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Booking booking;

    private Double amount;
    private String method; // e.g. "CREDIT_CARD", "PAYPAL"
    private String status; // e.g. "SUCCESS", "FAILED"
}
