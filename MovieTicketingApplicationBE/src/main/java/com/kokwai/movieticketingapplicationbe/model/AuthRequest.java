package com.kokwai.movieticketingapplicationbe.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @Getter @Setter
public class AuthRequest {

    @Email( message = "Email invalid")
    @NotBlank( message = "Email should not be empty")
    private String email;

    @NotBlank(message = "Password should not be empty")
    private String password;

    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
