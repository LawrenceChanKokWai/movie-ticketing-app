import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducer/authReducer.jsx";
import {movieReducer} from "./reducer/movieReducer.jsx";
import bookingReducer from "./reducer/bookingReducer.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
        bookings: bookingReducer,
    },
});

export default store;
