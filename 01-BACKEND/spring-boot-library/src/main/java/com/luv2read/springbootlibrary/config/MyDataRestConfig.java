package com.luv2read.springbootlibrary.config;

import com.luv2read.springbootlibrary.entity.Book;
import com.luv2read.springbootlibrary.entity.Message;
import com.luv2read.springbootlibrary.entity.Payment;
import com.luv2read.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // Define the allowed origins for CORS
//    private String theAllowedOrigins = "http://libraryms3.s3-website-ap-southeast-2.amazonaws.com";
        private String theAllowedOrigins="https://localhost:3000";
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // Define the HTTP methods to be disabled for entities
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.PUT};

        // Expose entity IDs in the REST response
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);
        config.exposeIdsFor(Payment.class);

        // Disable certain HTTP methods for the specified entity (Book)
        disableHttpMethods(Book.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class,config,theUnsupportedActions);
        disableHttpMethods(Message.class,config,theUnsupportedActions);
        disableHttpMethods(Payment.class,config,theUnsupportedActions);

        // Configure CORS mapping
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins).allowedMethods("GET", "POST", "PUT","DELETE");
    }

    // Disable specified HTTP methods for the given entity class
    private void disableHttpMethods(Class bookClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {

        config.getExposureConfiguration()
                .forDomainType(bookClass)
                // Disable specified HTTP methods for individual items
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                // Disable specified HTTP methods for collections of items
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
