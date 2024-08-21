package com.kokwai.movieticketingapplicationbe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kokwai.movieticketingapplicationbe.enumeration.Hall;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Entity representing a movie in the ticketing system")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(
            description = "Unique identifier of the movie",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private Long id;

    @Column(length = 150, nullable = false)
    @NotBlank(message = "Title is required!")
    @Length(min = 2, max = 150, message = "Title to be between 2-150 characters!")
    @Schema(
            description = "Title of the movie",
            example = "Marvel Heroes")
    private String title;

    @Column(nullable = false)
    @Schema(description = "Category of the movie", example = "Action")
    private String category;

    @Column(nullable = false)
    @Schema(
            description = "Release date of the movie",
            example = "2024-09-23",
            type = "string",
            format = "date"
    )
    private LocalDate releaseDate;

    @Column(length = 1000)
    @Schema(
            description = "Short description of the movie",
            example = "Welcome to cinema ticketing booking system"
    )
    private String description;

    @Schema(
            description = "Ticket price for the movie",
            example = "12.50",
            type = "number",
            format = "decimal"
    )
    private BigDecimal price;

    @Schema(
            description = "Number of available seats for the movie",
            example = "60",
            type = "integer"
    )
    private Integer availableSeats;

    @Schema(
            description = "URL of the movie poster image",
            example = "http://someExample.com/poster.jpg"
    )
    private String imageUrl;

    @Column(nullable = false)
    @Schema(
            description = "Screening date and time for the movie",
            example = "2024-09-23T18:00:00",
            type = "string",
            format = "date-time"
    )
    private LocalDateTime screeningDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(
            description = "Hall where the movie will be screened",
            example = "HALL_1"
    )
    private Hall hall;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>();
}
