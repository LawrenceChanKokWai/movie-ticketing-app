package com.kokwai.movieticketingapplicationbe.service;

import com.kokwai.movieticketingapplicationbe.exception.ResourceNotFoundException;
import com.kokwai.movieticketingapplicationbe.model.Booking;
import com.kokwai.movieticketingapplicationbe.model.Movie;
import com.kokwai.movieticketingapplicationbe.model.User;
import com.kokwai.movieticketingapplicationbe.repository.BookingRepository;
import com.kokwai.movieticketingapplicationbe.repository.MovieRepository;
import com.kokwai.movieticketingapplicationbe.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, MovieRepository movieRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking createBooking(Booking booking) {
        /// Fetch the User object based on email
        User user = userRepository.findByEmail(booking.getUser().getEmail());
        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + booking.getUser().getEmail());
        }

        Movie movie = movieRepository.findById(booking.getMovie().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + booking.getMovie().getId()));

        // Check if there are enough available seats
        int seatsToBook = booking.getSeatNumbers().size();
        if (movie.getAvailableSeats() < seatsToBook) {
            throw new RuntimeException("Not enough seats available");
        }

        // Subtract the number of seats booked from available seats
        // Update the movie with the new available seats count
        // Set the complete User and Movie objects
        movie.setAvailableSeats(movie.getAvailableSeats() - seatsToBook);

        movieRepository.save(movie);
        booking.setUser(user);
        booking.setMovie(movie);

        // Save the booking
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setUser(bookingDetails.getUser());
            booking.setMovie(bookingDetails.getMovie());
            booking.setSeatNumbers(bookingDetails.getSeatNumbers());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Method to get all booked seats for a specific movie
    public Set<String> getBookedSeatsForMovie(Long movieId) {
        List<Booking> bookings = bookingRepository.findByMovieId(movieId);
        return bookings.stream()
                .flatMap(booking -> booking.getSeatNumbers().stream())
                .collect(Collectors.toSet());
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + email);
        }
        return bookingRepository.findByUserId(user.getId());
    }



}
