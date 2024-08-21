package com.kokwai.movieticketingapplicationbe.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "roles" )
@Data @NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Schema(
            description = "Unique identifier of the role",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private Long id;

    @Column( length = 50, nullable = false, unique = true )
    @Schema(
            description = "Name of the role",
            example = "ROLE_USER",
            requiredProperties = {"name"}
    )
    private String name;

    public Role(Long id) {
        this.id = id;
    }

    public Role(String name) {
        this.name = name;
    }
}
