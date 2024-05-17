package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "history")
@Entity
public class History {

    // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Id
    private Long id;

    // User email associated with the history record
    @Column(name = "user_email")
    private String userEmail;

    // Title of the book in the history record
    @Column(name = "title")
    private String title;

    // Author of the book in the history record
    @Column(name = "author")
    private String author;

    // Description of the book in the history record
    @Column(name = "description")
    private String description;

    // Book ID associated with the history record
    @Column(name = "book_id")
    private Long bookId;

    // Date when the book was checked out in the history record
    @Column(name = "checkout_date")
    private String checkoutDate;

    // Date when the book was returned in the history record
    @Column(name = "returned_date")
    private String returnedDate;

    // URL or path to the book's image in the history record
    @Column(name = "img")
    private String img;

    // Default constructor required by JPA
    public History() {}

    // Parameterized constructor for convenient creation of History objects
    public History(String userEmail, String title, String author, String description, Long bookId, String checkoutDate, String returnedDate, String img) {
        this.userEmail = userEmail;
        this.title = title;
        this.author = author;
        this.description = description;
        this.bookId = bookId;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.img = img;
    }
}
