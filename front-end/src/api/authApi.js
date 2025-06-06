import axios from 'axios';



export const login = async (username, password) => {
    return axios.post(`${import.meta.env.VITE_API_ROOT}/auth/login`, { username, password }, {
        withCredentials: true
    });
};

export const register = async (userData) => {
    return axios.post(`${import.meta.env.VITE_API_ROOT}/auth/register`, userData, {
        withCredentials: true
    });
};

export const refreshToken = async () => {
    return axios.post(`${import.meta.env.VITE_API_ROOT}/auth/refresh`, {}, {
        withCredentials: true
    });
};

export const logout = async () => {
    return axios.post(`${import.meta.env.VITE_API_ROOT}/auth/logout`, {}, {
        withCredentials: true
    });
};