import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMovie } from '../../redux/action/movieActions';

import './UpdateMovieModal.css'

function UpdateMovieModal({ movie, closeModal }) {
    const [title, setTitle] = useState(movie.title);
    const [category, setCategory] = useState(movie.category);
    const [releaseDate, setReleaseDate] = useState(movie.releaseDate);
    const [description, setDescription] = useState(movie.description);
    const [price, setPrice] = useState(movie.price);
    const [availableSeats, setAvailableSeats] = useState(movie.availableSeats);
    const [imageUrl, setImageUrl] = useState(movie.imageUrl);
    const [screeningDateTime, setScreeningDateTime] = useState(movie.screeningDateTime);
    const [hall, setHall] = useState(movie.hall);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMovie({
            id: movie.id,
            title,
            category,
            releaseDate,
            description,
            price: parseFloat(price),
            availableSeats: parseInt(availableSeats),
            imageUrl,
            screeningDateTime,
            hall
        }));
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        required
                    />
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        placeholder="Release Date"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="number"
                        value={availableSeats}
                        onChange={(e) => setAvailableSeats(e.target.value)}
                        placeholder="Available Seats"
                        required
                    />
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                    />
                    <input
                        type="datetime-local"
                        value={screeningDateTime}
                        onChange={(e) => setScreeningDateTime(e.target.value)}
                        placeholder="Screening Date and Time"
                        required
                    />
                    <select value={hall} onChange={(e) => setHall(e.target.value)} required>
                        <option value="">Select Hall</option>
                        <option value="HALL_1">Hall 1</option>
                        <option value="HALL_2">Hall 2</option>
                        <option value="HALL_3">Hall 3</option>
                        <option value="HALL_4">Hall 4</option>
                    </select>
                    <button type="submit">Update Movie</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateMovieModal;
