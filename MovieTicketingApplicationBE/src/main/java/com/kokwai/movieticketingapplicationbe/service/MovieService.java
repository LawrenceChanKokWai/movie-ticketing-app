package com.kokwai.movieticketingapplicationbe.service;

import com.kokwai.movieticketingapplicationbe.exception.ResourceNotFoundException;
import com.kokwai.movieticketingapplicationbe.model.Movie;
import com.kokwai.movieticketingapplicationbe.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.kokwai.movieticketingapplicationbe.constants.MovieConstants.*;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final BookingService bookingService;

    public MovieService(MovieRepository movieRepository, BookingService bookingService) {
        this.movieRepository = movieRepository;
        this.bookingService = bookingService;
    }

    public List<Movie> getAllMovie() {
        return movieRepository.findAll();
    }

    public Movie createMovie(Movie movie) {
        if (movie.getPrice() == null || movie.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            movie.setPrice(DEFAULT_COST_CONSTANT);
        }
        if (movie.getAvailableSeats() == null || movie.getAvailableSeats() <= 0) {
            movie.setAvailableSeats(DEFAULT_SEAT_CAPACITY_CONSTANT);
        }
        if (movie.getImageUrl() == null || movie.getImageUrl().isEmpty()) {
            movie.setImageUrl(BLANK_IMAGE_URL_CONSTANT);
        }
        if (movie.getHall() == null) {
            throw new IllegalArgumentException("Hall is required");
        }

        return movieRepository.save(movie);
    }

    public Movie getMovieByID(Long id) {
        return movieRepository.findById(id).orElse(new Movie());
    }

    public Movie updateMovie(Long id, Movie movie) {
        Movie movieInDB = movieRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

        movieInDB.setTitle(movie.getTitle());
        movieInDB.setCategory(movie.getCategory());
        movieInDB.setReleaseDate(movie.getReleaseDate());
        movieInDB.setDescription(movie.getDescription());
        movieInDB.setImageUrl(movie.getImageUrl());
        movieInDB.setScreeningDateTime(movie.getScreeningDateTime());
        movieInDB.setHall(movie.getHall());

        return movieRepository.save(movieInDB);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    public List<Movie> searchMovies(String keyword) {
        return movieRepository.searchMovies(keyword);
    }

    // Method to get available seats for a movie
    public Set<String> getAvailableSeatsForMovie(Movie movie, Set<String> bookedSeats) {

        List<String> totalSeats = generateTotalSeats(movie.getAvailableSeats());

        // Calculate available seats by removing booked seats from total seats
        Set<String> availableSeats = new HashSet<>(totalSeats);
        availableSeats.removeAll(bookedSeats);

        return availableSeats;
    }

    private List<String> generateTotalSeats(int availableSeats) {
        List<String> seats = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E"};

        for (String row : rows) {
            for (int i = 1; i <= 10; i++) {
                seats.add(row + i);
            }
        }
        return seats;
    }


}
