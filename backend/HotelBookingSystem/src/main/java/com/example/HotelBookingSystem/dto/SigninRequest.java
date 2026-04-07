package com.example.HotelBookingSystem.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class SigninRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
