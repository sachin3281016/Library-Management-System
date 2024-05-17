package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "message")
public class Message {

    // Primary key
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User email associated with the message
    @Column(name = "user_email")
    private String userEmail;

    // Title of the message
    @Column(name = "title")
    private String title;

    // Question or content of the message
    @Column(name = "question")
    private String question;

    // Admin email associated with the message response
    @Column(name = "admin_email")
    private String adminEmail;

    // Response content for the message
    @Column(name = "response")
    private String response;

    // Flag indicating whether the message is closed or not
    @Column(name = "closed")
    private boolean closed;

    // Default constructor required by JPA
    public Message() {}

    // Parameterized constructor for creating messages with title and question
    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }
}
