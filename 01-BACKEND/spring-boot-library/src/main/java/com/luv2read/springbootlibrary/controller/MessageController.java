package com.luv2read.springbootlibrary.controller;

import com.luv2read.springbootlibrary.entity.Message;
import com.luv2read.springbootlibrary.requestModels.AdminQuestionRequest;
import com.luv2read.springbootlibrary.service.MessageService;
import com.luv2read.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("https://localhost:3000")  // Allowing cross-origin requests from specified URL
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService){
        this.messageService=messageService;
    }

    // Endpoint to post a message securely
    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody Message messageRequest){
        // Extract user email from the JWT token
        String userEmail= ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the service to post the message for the user
        messageService.postMessage(messageRequest,userEmail);
    }

    // Endpoint to update an admin message securely
    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception{
        // Extract user email and user type from the JWT token
        String userEmail=ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        String admin=ExtractJWT.payloadJWTExtraction(token,"\"userType\"");

        // Check if the user is an admin, otherwise, throw an exception
        if(admin==null || !admin.equals("admin")){
            throw  new Exception("Administration Page only");
        }

        // Call the service to update the admin message
        messageService.putMessage(adminQuestionRequest,userEmail);
    }
}
