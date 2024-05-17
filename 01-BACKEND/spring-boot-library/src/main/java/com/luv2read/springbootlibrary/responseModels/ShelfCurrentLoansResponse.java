package com.luv2read.springbootlibrary.responseModels;

import com.luv2read.springbootlibrary.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    // Book associated with the response
    private Book book;

    // Number of days left for the book's loan
    private int dayLeft;

    // Parameterized constructor for creating ShelfCurrentLoansResponse objects with book and dayLeft details
    public ShelfCurrentLoansResponse(Book book, int dayLeft) {
        this.book = book;
        this.dayLeft = dayLeft;
    }
}
