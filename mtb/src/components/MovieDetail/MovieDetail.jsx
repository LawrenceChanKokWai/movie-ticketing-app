
import './MovieDetail.css';
import {useNavigate} from "react-router-dom";

const MovieDetails = ({ movie, selectedSeats }) => {

    const navigate = useNavigate();

    if (!movie) {
        return <div>No movie details available</div>;
    }

    const seatsLeft = movie.availableSeats - selectedSeats.length;

    return (
        <div className="movie-details">
            <img src={movie.imageUrl} alt={`${movie.title} Movie Poster`} className="poster" />
            <div className="details">
                <h1>{movie.title}</h1>
                <p>
                    Screening Date:
                    {new Date(movie.screeningDateTime).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}</p>
                <div className="additional-info">
                    <p><strong>Description:</strong> {movie.description || 'N/A'}</p>
                    <p><strong>Category:</strong> {movie.category || 'N/A'}</p>
                    <p><strong>Seats Left:</strong> {seatsLeft}</p>
                    <p><strong>Cost per seat: SGD {movie.price || 'N/A'}</strong></p>
                </div>
                <button onClick={ () => navigate('/') }>Home</button>
            </div>
        </div>
    );
};

export default MovieDetails;
