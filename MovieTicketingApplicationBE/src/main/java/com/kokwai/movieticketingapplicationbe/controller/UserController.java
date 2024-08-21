package com.kokwai.movieticketingapplicationbe.controller;

import com.kokwai.movieticketingapplicationbe.exception.DuplicateEmailException;
import com.kokwai.movieticketingapplicationbe.exception.ResourceNotFoundException;
import com.kokwai.movieticketingapplicationbe.model.User;
import com.kokwai.movieticketingapplicationbe.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> listUsers = userService.getAllUsers();
        if( listUsers.isEmpty() ) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(listUsers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable("id") Long id
    ) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) throws DuplicateEmailException {
        User savedUser = userService.saveUser(user);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/(id)")
                .buildAndExpand( savedUser.getId() ).toUri();
        return ResponseEntity.created(uri).body( savedUser );
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody @Valid User user) throws DuplicateEmailException {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser( id );
        return ResponseEntity.noContent().build();
    }
}