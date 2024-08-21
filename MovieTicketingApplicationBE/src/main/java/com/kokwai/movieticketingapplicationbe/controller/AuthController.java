package com.kokwai.movieticketingapplicationbe.controller;

import com.kokwai.movieticketingapplicationbe.exception.DuplicateEmailException;
import com.kokwai.movieticketingapplicationbe.model.AuthRequest;
import com.kokwai.movieticketingapplicationbe.model.JWT;
import com.kokwai.movieticketingapplicationbe.model.User;
import com.kokwai.movieticketingapplicationbe.model.UserPrincipal;
import com.kokwai.movieticketingapplicationbe.service.UserService;
import com.kokwai.movieticketingapplicationbe.utils.TokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.kokwai.movieticketingapplicationbe.constants.SecurityConstants.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserService userService;
    public AuthController(AuthenticationManager authenticationManager, TokenProvider tokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<JWT> login(@RequestBody @Valid AuthRequest request ) {
        authenticateUser( request.getEmail(), request.getPassword() );

        String jwt = tokenProvider.generateJWT(new UserPrincipal(userService.findByEmail(request.getEmail())));

        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_HEADER, jwt);

        return new ResponseEntity<>(new JWT(jwt), headers, HttpStatus.OK);
    }
    private void authenticateUser(String email, String password) {
        authenticationManager.authenticate( new UsernamePasswordAuthenticationToken( email, password ) );
    }

    @PostMapping("/register")
    public ResponseEntity<String> register( @RequestBody @Valid User user ) throws DuplicateEmailException {
        userService.register( user );

        return new ResponseEntity<>(REGISTRATION_SUCCESS, HttpStatus.OK);
    }

}
