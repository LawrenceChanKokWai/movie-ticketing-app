package com.kokwai.movieticketingapplicationbe;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "This is a Cinema Ticketing Booking API Documentation",
                description = "Cinema Ticketing Booking REST API Documentation",
                version = "1.0",
                contact = @Contact(
                        name = "Chan Kok Wai",
                        email = "kokwai2107@gmail.com",
                        url = "https://github.com/LawrenceChanKokWai"
                )
        )
)
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}



