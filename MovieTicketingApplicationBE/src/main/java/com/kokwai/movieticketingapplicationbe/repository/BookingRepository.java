package com.kokwai.movieticketingapplicationbe.repository;

import com.kokwai.movieticketingapplicationbe.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByMovieId(Long movieId);
    List<Booking> findByUserId(Long userId);

}