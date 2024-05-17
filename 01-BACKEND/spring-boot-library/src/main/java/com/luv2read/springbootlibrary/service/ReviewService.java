package com.luv2read.springbootlibrary.service;

import com.luv2read.springbootlibrary.dao.BookRepository;
import com.luv2read.springbootlibrary.dao.ReviewRepository;
import com.luv2read.springbootlibrary.entity.Review;
import com.luv2read.springbootlibrary.requestModels.ReviewRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private BookRepository bookRepository;

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(BookRepository bookRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }

    // Method to check if a user's review is already listed for a book
    public  boolean userReviewListed(String userEmail, Long bookId){
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null;
    }

    // Method to post a review for a book
    public  void postReview(String userEmail, ReviewRequest reviewRequest) throws  Exception{
        // Check if the user has already posted a review for the book
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());

        if(validateReview != null){
            throw new Exception("Review already created for this book");
        }

        // Create a new review entity
        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setUserEmail(userEmail);
        review.setRating(reviewRequest.getRating());

        // Set review description if present
        if(reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(Object::toString).orElse(null));
        }

        // Set the current date as the review date
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }
}
