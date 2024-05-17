package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Table(name = "payment")
@Entity
public class Payment {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // User email associated with the payment
    @Column(name = "user_email")
    private String userEmail;

    // Amount of the payment
    @Column(name = "amount")
    private double amount;

    // Default constructor required by JPA
    public Payment() {
    }

    // Parameterized constructor for creating Payment objects with user email and amount
    public Payment(String userEmail, double amount) {
        this.userEmail = userEmail;
        this.amount = amount;
    }
}
