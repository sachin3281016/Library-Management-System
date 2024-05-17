package com.luv2read.springbootlibrary.controller;

import com.luv2read.springbootlibrary.requestModels.PaymentInfoRequest;
import com.luv2read.springbootlibrary.service.PaymentService;
import com.luv2read.springbootlibrary.utils.ExtractJWT;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")  // Allowing cross-origin requests from specified URL
@RestController
@RequestMapping("/api/payments/secure")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Endpoint to create a payment intent
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException{
        // Call the service to create a payment intent
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        // Convert payment intent to JSON string
        String paymentString = paymentIntent.toJson();

        // Return the JSON string as a response with OK status
        return new ResponseEntity<>(paymentString, HttpStatus.OK);
    }

    // Endpoint to complete a Stripe payment
    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "Authorization") String token) throws Exception{
        // Extract user email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        // Check if user email is missing and throw an exception
        if(userEmail == null)
            throw new Exception("User Email is missing");

        // Call the service to complete the Stripe payment
        return paymentService.stripePayment(userEmail);
    }
}
