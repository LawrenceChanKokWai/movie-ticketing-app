package com.kokwai.movieticketingapplicationbe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data @NoArgsConstructor
@Schema(description = "Entity representing a booking in the movie ticketing system")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(
            description = "Unique identifier of the booking",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnoreProperties({"firstName", "lastName", "email", "password", "roles"})
    @Schema(description = "User who made the booking")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "movie_id", nullable = false)
//    @JsonIgnoreProperties({"title", "category", "releaseDate", "description", "price", "availableSeats", "imageUrl", "screeningDateTime", "hall", "bookings"})
    @Schema(description = "Movie associated with the booking")
    private Movie movie;

    @ElementCollection
    @Schema(description = "List of seat numbers booked", example = "[\"A1\", \"A2\", \"A3\"]")
    private List<String> seatNumbers;

    @Schema(description = "Timestamp when the booking was created", example = "2024-09-23T15:30:00")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Booking(User user, Movie movie, List<String> seatNumbers) {
        this.user = user;
        this.movie = movie;
        this.seatNumbers = seatNumbers;
        this.createdAt = LocalDateTime.now();
    }

}