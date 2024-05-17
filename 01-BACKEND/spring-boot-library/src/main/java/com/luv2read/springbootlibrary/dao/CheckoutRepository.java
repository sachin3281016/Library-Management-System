package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    // Method to find a Checkout entity by user email and book ID
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    // Method to find a list of Checkout entities by user email
    List<Checkout> findByUserEmail(String userEmail);
}
