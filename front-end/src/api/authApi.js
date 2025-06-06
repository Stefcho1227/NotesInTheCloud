import axios from 'axios';

const API_ROOT = 'http://localhost:8080/api'

export const login = async (username, password) => {
    return axios.post(`${API_ROOT}/auth/login`, { username, password }, {
        withCredentials: true
    });
};

export const register = async (userData) => {
    return axios.post(`${API_ROOT}/auth/register`, userData, {
        withCredentials: true
    });
};

export const refreshToken = async () => {
    return axios.post(`${API_ROOT}/auth/refresh`, {}, {
        withCredentials: true
    });
};

export const logout = async () => {
    return axios.post(`${API_ROOT}/auth/logout`, {}, {
        withCredentials: true
    });
};