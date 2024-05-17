package com.luv2read.springbootlibrary.requestModels;

import lombok.Data;

@Data
public class AdminQuestionRequest {

    // Identifier of the message
    private Long id;

    // Response content for the message
    private String response;
}
