
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';
import api from "../../service/api.js";

{/*Actions in performing user login actions*/}
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await api.post('http://localhost:8080/auth/login', {
            email,
            password,
        });

        const { jwt, expirationDate } = response.data;
        const userRole = parseJwt(jwt).authorities[0];

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { token: jwt, expirationDate, role: userRole },
        });

        localStorage.setItem('jwt', jwt);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('role', userRole);
    } catch (error) {
        if( error.response && error.response.data && Array.isArray(error.response.data.message)) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: error.message,
            });
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: ['Unexpected error occurred'],
            })
        }
    }
};

{/*Actions in performing user logout actions*/}
export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('role');

    dispatch({ type: LOGOUT });
};

{/*Actions in performing user registration actions*/}
export const register = (firstName, lastName, email, password, onSuccess) => async (dispatch) => {
    try {
        await api.post('http://localhost:8080/auth/register', {
            firstName,
            lastName,
            email,
            password,
        });
        // Upon Successful
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.message,
        });
    }
};

{/*Used for JWT Token parsing*/}
export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}


