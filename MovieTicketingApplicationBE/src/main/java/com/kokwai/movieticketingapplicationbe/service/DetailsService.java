package com.kokwai.movieticketingapplicationbe.service;

import com.kokwai.movieticketingapplicationbe.exception.ResourceNotFoundException;
import com.kokwai.movieticketingapplicationbe.model.User;
import com.kokwai.movieticketingapplicationbe.model.UserPrincipal;
import com.kokwai.movieticketingapplicationbe.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class DetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    public DetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail( email );

        if( user == null ) {
            throw new ResourceNotFoundException("Auth ERROR: User: " + email + " does not exists" );
        }
        return new UserPrincipal( user );
    }
}
