package com.luv2read.springbootlibrary.controller;

import com.luv2read.springbootlibrary.requestModels.AddBookRequest;
import com.luv2read.springbootlibrary.service.AdminService;
import com.luv2read.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")  // Allowing cross-origin requests from specified URL
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService){
        this.adminService=adminService;
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token, @RequestBody AddBookRequest addBookRequest) throws Exception {
        // Extracting the user type from the JWT token payload
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");

        // Checking if the user is an admin, otherwise, throwing an exception
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }

        // Calling the adminService to add a book
        adminService.postBook(addBookRequest);
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extracting the user type from the JWT token payload
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");

        // Checking if the user is an admin, otherwise, throwing an exception
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }

        // Calling the adminService to increase the quantity of a book
        adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extracting the user type from the JWT token payload
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");

        // Checking if the user is an admin, otherwise, throwing an exception
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }

        // Calling the adminService to decrease the quantity of a book
        adminService.decreaseBookQuantity(bookId);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        // Extracting the user type from the JWT token payload
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");

        // Checking if the user is an admin, otherwise, throwing an exception
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }

        // Calling the adminService to delete a book
        adminService.deleteBook(bookId);
    }
}
