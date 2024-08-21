import {
    CREATE_MOVIE,
    FETCH_MOVIES,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    MOVIE_ERROR,
    FETCH_MOVIE,
    FETCH_BOOKED_SEATS, FETCH_BOOKED_SEATS_ERROR
} from '../types/movieTypes';
import axios from 'axios';

// Create a new movie
export const createMovie = (movieData) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        const response = await axios.post('http://localhost:8080/movies', movieData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: CREATE_MOVIE,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIE_ERROR, payload: error.message });
    }
};

// Fetch a movie
export const fetchMovie = (id) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        const response = await axios.get(`http://localhost:8080/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: FETCH_MOVIE,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: MOVIE_ERROR,
            payload: error.message,
        });
    }
};

// Fetch all movies
export const fetchMovies = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8080/movies');
        dispatch({
            type: FETCH_MOVIES,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIE_ERROR, payload: error.message });
    }
};


// Update a movie
export const updateMovie = (movieData) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        const response = await axios.put(`http://localhost:8080/movies/${movieData.id}`, movieData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: UPDATE_MOVIE,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: MOVIE_ERROR, payload: error.message });
    }
};

// Delete a movie
export const deleteMovie = (movieId) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        await axios.delete(`http://localhost:8080/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: DELETE_MOVIE,
            payload: movieId,
        });
    } catch (error) {
        dispatch({ type: MOVIE_ERROR, payload: error.message });
    }
};

export const fetchBookedSeats = (movieId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token; // Ensure the token is correctly fetched from the state
        const response = await axios.get(`http://localhost:8080/movies/${movieId}/booked-seats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("API Response:", response.data); // Log the API response
        dispatch({
            type: FETCH_BOOKED_SEATS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: FETCH_BOOKED_SEATS_ERROR, payload: error.message });
    }
};
