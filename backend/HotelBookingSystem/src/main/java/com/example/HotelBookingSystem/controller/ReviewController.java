package com.example.HotelBookingSystem.controller;

import com.example.HotelBookingSystem.dto.ReviewRequest;
import com.example.HotelBookingSystem.entity.Hotel;
import com.example.HotelBookingSystem.entity.Review;
import com.example.HotelBookingSystem.entity.User;
import com.example.HotelBookingSystem.repository.HotelRepository;
import com.example.HotelBookingSystem.repository.ReviewRepository;
import com.example.HotelBookingSystem.repository.UserRepository;
import com.example.HotelBookingSystem.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    private Long getCurrentUserId() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }

    @PostMapping
    public ResponseEntity<Review> postReview(@Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(getCurrentUserId(), request));
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<Review>> getHotelReviews(@PathVariable Long hotelId) {
        return ResponseEntity.ok(reviewService.getHotelReviews(hotelId));
    }
}
