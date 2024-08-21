import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../../redux/action/movieActions';

import './MovieList.css'

function MovieList({ onUpdateClick }) {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteMovie(id));
    };

    if (status === 'loading') return <p>Loading movies...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Release</th>
                <th>Description</th>
                <th>Screening</th>
                <th>Hall</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {movies.map((movie) => (
                <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>{movie.category}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.description}</td>
                    <td>{new Date(movie.screeningDateTime).toLocaleString()}</td>
                    <td>{movie.hall}</td>
                    <td>
                        <button onClick={() => onUpdateClick(movie)}>Update</button>
                        <button onClick={() => handleDelete(movie.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MovieList;
