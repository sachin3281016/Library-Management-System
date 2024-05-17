package com.luv2read.springbootlibrary.service;

import com.luv2read.springbootlibrary.dao.PaymentRepository;
import com.luv2read.springbootlibrary.entity.Payment;
import com.luv2read.springbootlibrary.requestModels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PaymentService {

    PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, @Value("${stripe.key.secret}") String secretKey){

        this.paymentRepository=paymentRepository;

        // Set the secret key for Stripe API
        Stripe.apiKey=secretKey;
    }

    // Method to create a payment intent for Stripe
    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException{
        // Specify payment method types (currently supporting only card)
        List<String> paymentMethodTypes=new ArrayList<>();
        paymentMethodTypes.add("card");

        // Set parameters for creating a PaymentIntent
        Map<String,Object> params=new HashMap<>();
        long amount= Math.round(paymentInfoRequest.getAmount());
        params.put("amount",amount );
        params.put("currency",paymentInfoRequest.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);

        // Create a PaymentIntent using Stripe API
        PaymentIntentCreateParams paymentIntentCreateParams=PaymentIntentCreateParams.builder().setAmount(amount).setCurrency("INR").build();
        return  PaymentIntent.create(paymentIntentCreateParams);
    }

    // Method to handle Stripe payment
    public ResponseEntity<String> stripePayment(String userEmail) throws  Exception{
        // Retrieve user's payment information
        Payment payment=paymentRepository.findByUserEmail(userEmail);

        // Check if payment information is present
        if(payment==null)
            throw new Exception("Payment information is missing");

        // Set the amount to zero to indicate successful payment
        payment.setAmount(0.00);
        paymentRepository.save(payment);

        // Return a response with HTTP status OK
        return  new ResponseEntity<>(HttpStatus.OK);
    }
}
