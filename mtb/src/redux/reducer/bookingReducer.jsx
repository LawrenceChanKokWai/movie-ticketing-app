import {
    CREATE_BOOKING_FAILURE,
    CREATE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_SUCCESS, FETCH_BOOKING_FAILURE, FETCH_BOOKING_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    FETCH_BOOKINGS_SUCCESS, FETCH_TICKETS_FAILURE, FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS
} from "../types/bookingsType.jsx";

const initialState = {
    bookings: [],
    error: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
                error: null,
            };
        case CREATE_BOOKING_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload,
                error: null,
            };
        case FETCH_BOOKINGS_FAILURE:
            return {
                ...state,
                bookings: [],
                error: action.payload,
            };
        case FETCH_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: action.payload,
                error: null,
            };
        case FETCH_BOOKING_FAILURE:
            return {
                ...state,
                bookings: [],
                error: action.payload,
            };
        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id !== action.payload),
            };
        case DELETE_BOOKING_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case FETCH_TICKETS_REQUEST:
            return {
                ...state,
                loading: true, // Set loading to true when request starts
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                loading: false, // Set loading to false on success
                bookings: action.payload,
                error: null, // Clear any errors
            };
        case FETCH_TICKETS_FAILURE:
            return {
                loading: false, // Set loading to false on failure
                bookings: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default bookingReducer;
