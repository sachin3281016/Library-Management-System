package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Custom query method to find a Payment entity by user email
    Payment findByUserEmail(@RequestParam("user_email") String userEmail);
}
