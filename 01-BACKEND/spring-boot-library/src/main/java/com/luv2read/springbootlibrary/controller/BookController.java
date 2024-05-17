package com.luv2read.springbootlibrary.controller;

import com.luv2read.springbootlibrary.entity.Book;
import com.luv2read.springbootlibrary.responseModels.ShelfCurrentLoansResponse;
import com.luv2read.springbootlibrary.service.BookService;
import com.luv2read.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")  // Allowing cross-origin requests from specified URL
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Endpoint to get the list of current loans for the authenticated user
    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to get the list of current loans for the user
        return bookService.currentLoans(userEmail);
    }

    // Endpoint to get the count of current loans for the authenticated user
    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to get the count of current loans for the user
        return bookService.currentLoansCount(userEmail);
    }

    // Endpoint to check out a book by the authenticated user
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to check out the book for the user
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    // Endpoint to securely check out a book
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to securely check out the book for the user
        return bookService.checkoutBook(userEmail, bookId);
    }

    // Endpoint to return a checked-out book
    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to return the checked-out book for the user
        bookService.returnBook(userEmail, bookId);
    }

    // Endpoint to renew a loan for a book
    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the service to renew the loan for the book for the user
        bookService.renewLoan(userEmail, bookId);
    }
}
