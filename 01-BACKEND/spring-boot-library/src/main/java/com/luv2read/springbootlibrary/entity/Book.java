package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "book")
@Data
public class Book {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Title of the book
    @Column(name = "title")
    private String title;

    // Author of the book
    @Column(name = "author")
    private String author;

    // Description of the book
    @Column(name = "description")
    private String description;

    // Total number of copies
    @Column(name = "copies")
    private int copies;

    // Number of available copies
    @Column(name = "copies_available")
    private int copiesAvailable;

    // Category of the book
    @Column(name = "category")
    private String category;

    // URL or path to the book's image
    @Column(name = "img")
    private String img;

    // List of reviews associated with the book
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id")
    private List<Review> reviews;

    // List of checkouts associated with the book
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id")
    private List<Checkout> checkouts;
}
