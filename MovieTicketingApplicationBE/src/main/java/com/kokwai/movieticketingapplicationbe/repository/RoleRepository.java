package com.kokwai.movieticketingapplicationbe.repository;

import com.kokwai.movieticketingapplicationbe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
