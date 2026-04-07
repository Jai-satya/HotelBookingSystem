package com.example.HotelBookingSystem.service;

import com.example.HotelBookingSystem.dto.ReviewRequest;
import com.example.HotelBookingSystem.entity.Hotel;
import com.example.HotelBookingSystem.entity.Review;
import com.example.HotelBookingSystem.entity.User;
import com.example.HotelBookingSystem.repository.HotelRepository;
import com.example.HotelBookingSystem.repository.ReviewRepository;
import com.example.HotelBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelRepository hotelRepository;

    public Review addReview(Long userId, ReviewRequest request) {
        User user = userRepository.findById(userId).orElseThrow();
        Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow();

        Review review = new Review();
        review.setUser(user);
        review.setHotel(hotel);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return reviewRepository.save(review);
    }

    public List<Review> getHotelReviews(Long hotelId) {
        return reviewRepository.findByHotelHotelId(hotelId);
    }
}
