package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Custom query method to find a page of Review entities by book ID
    Page<Review> findByBookId(@RequestParam("bookId") Long bookId, Pageable pageable);

    // Custom query method to find a Review entity by user email and book ID
    Review findByUserEmailAndBookId(String userEmail, Long bookId);
}
