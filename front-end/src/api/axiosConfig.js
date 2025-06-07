import axios from 'axios';
import { refreshToken, getAccessToken, setAccessToken, clearAccessToken } from './authApi';

const API_ROOT = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_ROOT,
    withCredentials: true
});

// Add request interceptor to inject the access token
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    console.log('token: ', token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json'; // Ensure content-type is set
    }
    return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                await refreshToken();
                // Retry the original request with new token
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear token and redirect to login
                clearAccessToken();
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;