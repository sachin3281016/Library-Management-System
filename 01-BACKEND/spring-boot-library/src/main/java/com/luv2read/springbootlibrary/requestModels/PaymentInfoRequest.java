package com.luv2read.springbootlibrary.requestModels;

import lombok.Data;

@Data
public class PaymentInfoRequest {

    // Currency for the payment
    private String currency;

    // Amount to be paid
    private double amount;

    // Email address to receive payment receipt
    private String receiptEmail;
}
