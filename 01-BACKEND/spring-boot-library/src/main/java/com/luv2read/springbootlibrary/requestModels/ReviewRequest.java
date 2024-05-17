package com.luv2read.springbootlibrary.requestModels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {

    // Identifier of the book for which the review is submitted
    private Long bookId;

    // User email submitting the review
    private String userEmail;

    // Rating given in the review
    private double rating;

    // Optional description or comments in the review
    private Optional<String> reviewDescription;

    // Parameterized constructor for creating ReviewRequest objects with review details
    public ReviewRequest(Long bookId, String userEmail, double rating, Optional<String> reviewDescription) {
        this.bookId = bookId;
        this.userEmail = userEmail;
        this.rating = rating;
        this.reviewDescription = reviewDescription;
    }
}
