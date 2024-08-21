package com.kokwai.movieticketingapplicationbe.repository;

import com.kokwai.movieticketingapplicationbe.model.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

@DataJpaTest
@AutoConfigureTestDatabase( replace = Replace.NONE)
@Rollback( false )
class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    void save_all_roles_list() {
        Role user = new Role("USER");
        Role admin = new Role("ADMIN");

        List<Role> savedRoles = roleRepository.saveAll(List.of(user, admin));

        assertNotNull( savedRoles );
        assertEquals( 2, savedRoles.size() );
    }

}