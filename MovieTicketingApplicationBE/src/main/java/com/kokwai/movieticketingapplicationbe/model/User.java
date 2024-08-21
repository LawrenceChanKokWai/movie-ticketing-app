package com.kokwai.movieticketingapplicationbe.model;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.AccessMode;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "users" )
@Getter @Setter @ToString @NoArgsConstructor
@Schema(description = "Entity representing a user in the movie booking ticketing system")
public class User {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Schema(
            description = "Unique identifier of the user",
            example = "1",
            accessMode = AccessMode.READ_ONLY
    )
    private Long id;

    @Column(length = 50, nullable = false)
    @NotBlank(message = "First name is required!")
    @Length(min = 2, max = 50, message = "First name to be between 2-50 characters!")
    @Schema(description = "First name of the user", example = "Lawrence")
    private String firstName;

    @Column(length = 50, nullable = false)
    @NotBlank(message = "Last name is required!")
    @Length(min = 2, max = 50, message = "Last name to be between 2-50 characters!")
    @Schema(description = "Last name of the user", example = "Chan")
    private String lastName;

    @Column(length = 125, nullable = false, unique = true)
    @NotBlank(message = "E-mail is required!")
    @Length(min = 5, max = 125, message = "E-mail must have between 5-125 characters!")
    @Email(message = "E-mail is not valid!")
    @Schema(description = "E-mail address of the user", example = "lawrence.chan@example.com")
    private String email;

    @Column(length = 70, nullable = false)
    @NotBlank(message = "Password is required!")
    @Length(min = 5, max = 70, message = "Password must have between 5-70 characters!")
    @Schema(description = "Password for the user's account", example = "password123")
    private String password;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @Schema(description = "Roles assigned to the user")
    private Set<Role> roles = new HashSet<>();

    public User(String firstName, String lastName, String email, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles.add( role );
    }
}
