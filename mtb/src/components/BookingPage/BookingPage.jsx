import {useEffect, useState} from 'react';
import MovieDetails from '../MovieDetail/MovieDetail.jsx';
import SeatSelector from '../SeatSelector/SeatSelector.jsx';
import SeatCalculator from "../SeatCalculator/SeatCalculator.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import './BookingPage.css'
import {fetchBookedSeats, fetchMovie} from "../../redux/action/movieActions.jsx";
import {createBooking} from "../../redux/action/bookingActions.jsx";
import {parseJwt} from "../../redux/action/authActions.jsx";

function BookingPage() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const seatCost = 15;
    const { id } = useParams();

    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movies.selectedMovie);
    const bookedSeats = useSelector((state) => state.movies.bookedSeats);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        dispatch(fetchMovie(id)); // Fetch movie details by ID
        dispatch(fetchBookedSeats(id)); // Fetch booked seats for the movie
    }, [dispatch, id]);

    // Extract email from the JWT token
    const getEmailFromJwt = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const { sub: email } = parseJwt(token);
            return email; // Return the user's email
        }
        return null;
    };

    // Handle booking creation and dispatch the booking action
    const handleCreateBooking = () => {
        const email = getEmailFromJwt();
        if (!email) {
            console.error('User email not found in JWT');
            return;
        }

        const bookingData = {
            user: { email: email },  // Use email instead of ID
            movie: { id: movie.id },
            seatNumbers: selectedSeats
        };

        dispatch(createBooking(bookingData));
    };

    // Testing purpose
    useEffect(() => {
        if (movie) {
            console.log("Movie Details:", movie);
        }
    }, [movie]);

    // Testing purpose
    useEffect(() => {
        console.log("Booked Seats after dispatch:", bookedSeats);
    }, [bookedSeats]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }
    if (!movie) {
        return <div>No movie found.</div>;
    }

    return (
        <div className="booking-page">
            <div className="left-column">
                <MovieDetails
                    movie={movie}
                    selectedSeats={selectedSeats}
                />
            </div>
            <div className="right-column">
                <SeatSelector
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    bookedSeats={bookedSeats} // Pass booked seats to SeatSelector
                />
                <SeatCalculator
                    selectedSeats={selectedSeats}
                    seatCost={seatCost}
                    onConfirmBooking={handleCreateBooking}
                />
            </div>
        </div>
    );
}

export default BookingPage;


