import axios from 'axios';
import { refreshToken } from './authApi';

const API_ROOT = import.meta.env.VITE_API_ROOT;

const api = axios.create({
    baseURL: API_ROOT,
    withCredentials: true // Important for cookies
});

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already retried
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                await refreshToken();
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, redirect to login
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;