package com.luv2read.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    // Method to extract a specific value from JWT payload
    public static String payloadJWTExtraction(String token, String extraction) {
        // Remove "Bearer" from the token if present
        token = token.replace("Bearer", "");

        // Split the token into its three parts: header, payload, signature
        String chunks[] = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        // Decode the payload using Base64 decoding
        String payload = new String(decoder.decode(chunks[1]));

        // Split the payload into individual entries
        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<>();

        // Iterate through entries to extract key-value pairs
        for (String entry : entries) {
            // Split each entry into key and value
            String[] keyValue = entry.split(":");

            // Check if the key matches the specified extraction
            if (keyValue[0].equals(extraction)) {
                int remove = 1;

                // If the value ends with "}", remove an additional character
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }

                // Remove unnecessary characters from the value
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                // Add the key-value pair to the map
                map.put(keyValue[0], keyValue[1]);
            }
        }

        // Check if the extraction key exists in the map
        if (map.containsKey(extraction)) {
            // Return the extracted value
            return map.get(extraction);
        }

        // If extraction key not found, return null
        return null;
    }
}
