import {
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE,
    FETCH_BOOKING_FAILURE,
    FETCH_BOOKING_SUCCESS,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILURE,
    FETCH_TICKETS_SUCCESS, FETCH_TICKETS_REQUEST, FETCH_TICKETS_FAILURE
} from '../types/bookingsType.jsx'
import api from '../../service/api.js'
import axios from "axios";
import {DELETE_MOVIE, MOVIE_ERROR} from "../types/movieTypes.jsx";

export const fetchBookingsSuccess = (bookings) => {
    return {
        type: FETCH_BOOKINGS_SUCCESS,
        payload: bookings,
    };
};

export const fetchBookingsFailure = (error) => {
    return {
        type: FETCH_BOOKINGS_FAILURE,
        payload: error,
    };
};

export const fetchBookings = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('http://localhost:8080/bookings');
            dispatch(fetchBookingsSuccess(response.data));
        } catch (error) {
            console.error('Error fetching bookings:', error);
            dispatch(fetchBookingsFailure(error.message));
        }
    };
};

export const deleteBooking = (id) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        await axios.delete(`http://localhost:8080/bookings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: DELETE_BOOKING_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({ type: DELETE_BOOKING_FAILURE, payload: error.message });
    }
};

export const fetchBooking = (id) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        await axios.get(`http://localhost:8080/bookings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: FETCH_BOOKING_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({ type: FETCH_BOOKING_FAILURE, payload: error.message });
    }
};

// Action to create a new booking
export const createBooking = (bookingData) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth; // Retrieve token from auth state
        const response = await axios.post('http://localhost:8080/bookings', bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        dispatch(createBookingSuccess(response.data));
    } catch (error) {
        dispatch(createBookingFailure(error.message));
    }
};

// Action to handle booking creation success
export const createBookingSuccess = (booking) => {
    return {
        type: CREATE_BOOKING_SUCCESS,
        payload: booking,
    };
};

// Action to handle booking creation failure
export const createBookingFailure = (error) => {
    return {
        type: CREATE_BOOKING_FAILURE,
        payload: error,
    };
};

export const fetchTickets = (email) => async (dispatch, getState) => {
    dispatch({ type: FETCH_TICKETS_REQUEST });

    try {
        const { token } = getState().auth;
        const response = await axios.get(`http://localhost:8080/bookings/user?email=${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        dispatch({
            type: FETCH_TICKETS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error); // Log the error for debugging
        dispatch({
            type: FETCH_TICKETS_FAILURE,
            payload: error.message,
        });
    }
};
