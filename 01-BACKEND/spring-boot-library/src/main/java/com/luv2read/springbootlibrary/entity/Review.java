// Import necessary packages
package com.luv2read.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

// Define the Review entity class
@Entity // Indicates that this class is a JPA entity
@Table(name = "review") // Specifies the name of the database table to which this entity is mapped
@Data // Lombok annotation that generates getter, setter, toString, equals, and hashCode methods
public class Review {

    @Id // Indicates the primary key field of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies the strategy used for primary key generation
    @Column(name = "id") // Specifies the mapping of the entity's field to the corresponding column in the database table
    private Long id;

    @Column(name = "rating") // Maps the 'rating' field to the 'rating' column in the database
    private double rating;

    @Column(name = "user_email") // Maps the 'userEmail' field to the 'user_email' column in the database
    private String userEmail;

    @Column(name = "date") // Maps the 'date' field to the 'date' column in the database
    private Date date;

    @Column(name = "book_id") // Maps the 'bookId' field to the 'book_id' column in the database
    private Long bookId;

    @Column(name = "review_description") // Maps the 'reviewDescription' field to the 'review_description' column in the database
    private String reviewDescription;


}
