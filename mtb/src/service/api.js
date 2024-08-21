
import axios from 'axios';
import {logout} from "../redux/action/authActions.jsx";
import store from "../redux/store.jsx";

const api = axios.create({
    baseURL: 'http://localhost:8080/auth/login',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
