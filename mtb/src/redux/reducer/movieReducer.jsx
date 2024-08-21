import {CREATE_MOVIE, FETCH_MOVIES, UPDATE_MOVIE, DELETE_MOVIE, MOVIE_ERROR, FETCH_MOVIE, FETCH_BOOKED_SEATS, FETCH_BOOKED_SEATS_ERROR} from '../types/movieTypes';

const initialState = {
  movies: [], // Ensure movies is an array
  bookedSeats: [],
  error: null,
  status: 'idle',
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        status: 'succeeded',
      };
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        status: 'succeeded',
      };
    case FETCH_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
        status: 'succeeded',
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
            movie.id === action.payload.id ? action.payload : movie
        ),
        status: 'succeeded',
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
        status: 'succeeded',
      };
    case FETCH_BOOKED_SEATS:
      return {
        ...state,
        bookedSeats: action.payload,
      };
    case FETCH_BOOKED_SEATS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case MOVIE_ERROR:
      return {
        ...state,
        error: action.payload,
        status: 'failed',
      };
    default:
      return state;
  }
};
