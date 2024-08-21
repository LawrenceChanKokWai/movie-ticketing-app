package com.kokwai.movieticketingapplicationbe.repository;

import com.kokwai.movieticketingapplicationbe.model.Role;
import com.kokwai.movieticketingapplicationbe.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.*;

@DataJpaTest
@AutoConfigureTestDatabase( replace = Replace.NONE)
@Rollback( false )
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void save_all_users_test() {

        String password = "password";
        String hashedPassword = passwordEncoder.encode( password );

        User user = new User(
                "User", "user", "user@gmail.com",
                hashedPassword, new Role( 1L )
        );
        User admin = new User(
                "Admin", "admin", "admin@gmail.com",
                hashedPassword, new Role( 2L )
        );
        User user2 = new User(
                "User2", "user2", "user2@gmail.com",
                hashedPassword, new Role( 1L )
        );

        List<User> savedUsers = userRepository.saveAll(List.of(user, admin, user2));

        assertNotNull( savedUsers );
        assertEquals( 3, savedUsers.size() );

    }

    @Test
    void list_all_users_test() {
        List<User> users = userRepository.findAll();

        assertEquals(2, users.size() );
        assertNotNull( users );

        users.forEach( user -> System.err.println( user ));
    }

    @Test
    void get_user_test() {
        User user = userRepository.findById(1L).get();

        assertNotNull( user );
        System.err.println( user );
    }

    @Test
    void update_user_test() {
        String lastName = "USER";

        User user = userRepository.findById(1L).get();
        user.setLastName( lastName );

        User updatedUser = userRepository.save( user );

        assertEquals( lastName, updatedUser.getLastName() );
    }
}