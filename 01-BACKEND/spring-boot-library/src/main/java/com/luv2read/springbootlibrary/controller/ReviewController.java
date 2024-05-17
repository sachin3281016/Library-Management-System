package com.luv2read.springbootlibrary.controller;

import com.luv2read.springbootlibrary.requestModels.ReviewRequest;
import com.luv2read.springbootlibrary.service.ReviewService;
import com.luv2read.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("https://localhost:3000")  // Allowing cross-origin requests from specified URL
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Endpoint to check if a user has already reviewed a specific book
    @GetMapping("secure/user/book")
    public boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Check if user email is missing and throw an exception
        if(userEmail == null)
            throw new Exception("User email is missing.");
        // Call the service to check if the user has already reviewed the book
        return reviewService.userReviewListed(userEmail, bookId);
    }

    // Endpoint to post a review securely
    @PostMapping("secure")
    public void postReview(@RequestHeader(value = "Authorization") String token , @RequestBody ReviewRequest reviewRequest) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Check if user email is missing and throw an exception
        if(userEmail == null){
            throw new Exception("User email is missing.");
        }
        // Call the service to post the review for the user
        reviewService.postReview(userEmail, reviewRequest);
    }
}
