package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Date when the book was checked out
    @Column(name = "checkout_date")
    private String checkoutDate;

    // Date when the book is expected to be returned
    @Column(name = "return_date")
    private String returnDate;

    // User email associated with the checkout
    @Column(name = "user_email")
    private String userEmail;

    // Book ID associated with the checkout
    @Column(name = "book_id")
    private Long bookId;

    // Default constructor required by JPA
    public Checkout() {
    }

    // Parameterized constructor for convenient creation of Checkout objects
    public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.userEmail = userEmail;
        this.bookId = bookId;
    }
}
