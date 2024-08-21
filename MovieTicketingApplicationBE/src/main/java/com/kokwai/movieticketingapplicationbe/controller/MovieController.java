package com.kokwai.movieticketingapplicationbe.controller;

import com.kokwai.movieticketingapplicationbe.model.Movie;
import com.kokwai.movieticketingapplicationbe.service.BookingService;
import com.kokwai.movieticketingapplicationbe.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final BookingService bookingService;

    public MovieController(MovieService movieService, BookingService bookingService) {
        this.movieService = movieService;
        this.bookingService = bookingService;
    }

    @Operation(
            summary = "Getting movie details from the REST API",
            description = "REST API in retrieving all movies"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK"
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "HTTP Status No Content Found"
            )
    })
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> allMovies = movieService.getAllMovie();
        if (allMovies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(allMovies, HttpStatus.OK);
    }

    @Operation(
            summary = "Adding movie with details from the REST API",
            description = "REST API adding movie with details"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "HTTP Status CREATED"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "HTTP Status Internal Server Error"
            )
    })
    @PostMapping
    public ResponseEntity<?> createMovie(@RequestBody Movie movie) {
        try {
            Movie savedMovie = movieService.createMovie(movie);
            return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
        } catch (Exception error) {
            return new ResponseEntity<>(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(
            summary = "Retrieve a movie by ID",
            description = "REST API to retrieve a movie by its ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK, movie found"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "HTTP Status Not Found, no movie found with given ID"
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieByID(@PathVariable Long id) {
        Movie movie = movieService.getMovieByID(id);
        if (movie.getId() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        }
    }

    @Operation(
            summary = "Update a movie by ID",
            description = "REST API to update a movie's details using its ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK, movie updated successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "HTTP Status Not Found, no movie found with given ID"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "HTTP Status Internal Server Error"
            )
    })
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        Movie updatedMovie = movieService.updateMovie(id, movie);
        return ResponseEntity.ok(updatedMovie);
    }

    @Operation(
            summary = "Get all available seats for a movie",
            description = "REST API to retrieve all available seats for a specific movie by its ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK, available seats retrieved"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "HTTP Status Not Found, movie not found with given ID"
            )
    })
    @GetMapping("/{id}/available-seats")
    public ResponseEntity<Set<String>> getAvailableSeats(@PathVariable Long id) {
        Movie movie = movieService.getMovieByID(id);
        if (movie.getId() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Set<String> bookedSeats = bookingService.getBookedSeatsForMovie(id);
        Set<String> availableSeats = movieService.getAvailableSeatsForMovie(movie, bookedSeats);
        return new ResponseEntity<>(availableSeats, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all booked seats for a movie",
            description = "REST API to retrieve all booked seats for a specific movie by its ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK, booked seats retrieved"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "HTTP Status Not Found, movie not found with given ID"
            )
    })
    @GetMapping("/{id}/booked-seats")
    public ResponseEntity<Set<String>> getBookedSeats(@PathVariable Long id) {
        Movie movie = movieService.getMovieByID(id);
        if (movie.getId() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Set<String> bookedSeats = bookingService.getBookedSeatsForMovie(id);
        return new ResponseEntity<>(bookedSeats, HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a movie by ID",
            description = "REST API to delete a movie using its ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK, movie deleted successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "HTTP Status Not Found, no movie found with given ID"
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        Movie movie = movieService.getMovieByID(id);
        if (movie != null) {
            movieService.deleteMovie(id);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Movie not found", HttpStatus.NOT_FOUND);
        }
    }

}

