package com.luv2read.springbootlibrary.requestModels;

import lombok.Data;

@Data
public class AddBookRequest {

    // Title of the book
    private String title;

    // Author of the book
    private String author;

    // Description of the book
    private String description;

    // Category of the book
    private String category;

    // URL or path to the book's image
    private String img;

    // Total number of copies for the book
    private int copies;

    // Parameterized constructor for creating AddBookRequest objects with book details
    public AddBookRequest(String title, String author, String description, String category, String img, int copies) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.category = category;
        this.img = img;
        this.copies = copies;
    }
}
