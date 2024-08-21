package com.kokwai.movieticketingapplicationbe.service;

import com.kokwai.movieticketingapplicationbe.exception.DuplicateEmailException;
import com.kokwai.movieticketingapplicationbe.exception.ResourceNotFoundException;
import com.kokwai.movieticketingapplicationbe.model.Role;
import com.kokwai.movieticketingapplicationbe.model.User;
import com.kokwai.movieticketingapplicationbe.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * List All Users
     * @return a list of users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Save a user
     * @param userFromForm user info from front end
     * @return saved user
     * @throws DuplicateEmailException
     */
    public User saveUser(User userFromForm) throws DuplicateEmailException {
        boolean hasProvidedId = userFromForm.getId() != null;
        if( hasProvidedId ) {
            User userInDB = userRepository.findById( userFromForm.getId() ).get();
            boolean isEmailExist = userFromForm.getEmail().equals( userInDB.getEmail() );
            if( isEmailExist ) {
                userFromForm.setEmail(userInDB.getEmail() );
            } else  {
                checkEmailDuplicate( userFromForm.getEmail() );
            }
            encodePassword( userFromForm );
        } else {
            checkEmailDuplicate( userFromForm.getEmail() );
            encodePassword( userFromForm );
        }
        return userRepository.save( userFromForm );
    }
    private void checkEmailDuplicate(String email) throws DuplicateEmailException {
        User user = userRepository.findByEmail( email );
        if( user != null ) {
            throw new DuplicateEmailException("Email: " + email + " exist");
        }
    }

    /**
     * Retrieve user from user id
     * @param id user id of retriever
     * @return retrieved user
     * @throws ResourceNotFoundException
     */
    public User getUserById(Long id) throws ResourceNotFoundException {
        try {
            return userRepository.findById( id ).get();
        } catch( NoSuchElementException exception ) {
            throw new ResourceNotFoundException("User with id: " + id + "not found");
        }
    }

    /**
     * Delete user from id
     * @param id user id of retriever
     * @throws ResourceNotFoundException
     */
    public void deleteUser(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById( id );
        if( user.isEmpty() ) {
            throw new ResourceNotFoundException( "User with id: " + id + " not found" );
        }
        userRepository.deleteById( id );
    }

    /**
     * Find user by email
     * @param email user email of retriever
     * @return retrievved email
     * @throws ResourceNotFoundException
     */
    public User findByEmail( String email ) throws ResourceNotFoundException {
        try {
            return userRepository.findByEmail( email );
        } catch( Exception exception ) {
            throw new ResourceNotFoundException( "Could not find any email: " + email );
        }
    }

    public void register( User user ) throws DuplicateEmailException {
        checkEmailDuplicate( user.getEmail() );
        setUserDetails( user );
        encodePassword( user );

        userRepository.save( user );
    }

    private void encodePassword(User user) {
        String encodedPassword = passwordEncoder.encode( user.getPassword() );
        user.setPassword( encodedPassword );
    }

    private void setUserDetails(User user) {
        user.getRoles().add(new Role(1L) );
    }


}
