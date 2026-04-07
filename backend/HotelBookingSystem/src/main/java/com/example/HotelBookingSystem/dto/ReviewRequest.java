package com.example.HotelBookingSystem.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class ReviewRequest {
    @NotNull
    private Long hotelId;
    
    @NotNull
    private Double rating;
    
    private String comment;
}
