
import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../types/authTypes';

const initialState = {
    token: localStorage.getItem('jwt') || null,
    expirationDate: localStorage.getItem('expirationDate') || null,
    role: localStorage.getItem('role') || null,
    error: null,
    isAuthenticated: !!localStorage.getItem('jwt'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                expirationDate: action.payload.expirationDate,
                role: action.payload.role,
                isAuthenticated: true,
                error: [],
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                expirationDate: null,
                role: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
