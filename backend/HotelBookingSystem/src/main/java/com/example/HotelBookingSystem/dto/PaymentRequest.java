package com.example.HotelBookingSystem.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class PaymentRequest {
    @NotNull
    private Long bookingId;

    @NotNull
    private Double amount;
    
    @NotNull
    private String method;
}
