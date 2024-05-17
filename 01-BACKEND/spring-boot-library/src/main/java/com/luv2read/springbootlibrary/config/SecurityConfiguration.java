package com.luv2read.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    // Configuring security settings
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(configurer ->
                        configurer
                                // Allow public access to these API endpoints
                                .requestMatchers(HttpMethod.GET, "api/books").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/books/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/reviews/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/payments/search/**").permitAll()

                                // Require authentication for these API endpoints
                                .requestMatchers("/api/messages/**").authenticated()
                                .requestMatchers("/api/admin/**").authenticated()
                                .requestMatchers("/api/payments/secure/**").authenticated()
                                .requestMatchers("api/histories/**").authenticated()
                                .requestMatchers("/api/books/secure/**").authenticated()
                                .requestMatchers("/api/reviews/secure/**").authenticated()
                )

                // Configure OAuth2 login, client, and JWT as the resource server
                .oauth2Login(Customizer.withDefaults())
                .oauth2Client(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        // Disable CSRF protection
        http.csrf(csrf -> csrf.disable());

        // Enable Cross-Origin Resource Sharing (CORS)
        http.cors(Customizer.withDefaults());

        // Set content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // Configure Okta for handling resource server
        Okta.configureResourceServer401ResponseBody(http);

        // Build and return the configured SecurityFilterChain
        return http.build();
    }

    // Configure JWT decoder for decoding JWT tokens
    @Bean
    public JwtDecoder jwtDecoder() {
        // Create JWT decoder from Okta issuer location
        JwtDecoder jwtDecoder = JwtDecoders.fromIssuerLocation("https://dev-63396241.okta.com/oauth2/default");
        return jwtDecoder;
    }
}
