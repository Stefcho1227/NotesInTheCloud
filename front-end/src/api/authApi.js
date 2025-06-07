import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_ROOT = 'http://localhost:8080/api';
let accessToken = null;
let currentUser = null;

export const setAccessToken = (token) => {
    accessToken = token;
    if (accessToken) {
        const { sub: username, userId } = jwtDecode(accessToken);
        currentUser = { username, userId: userId };
    } else {
        currentUser = null;
    }
};
export const getAccessToken = () => {
    return accessToken;
};
export const getCurrentUser = () => currentUser;
export const clearAccessToken = () => {
    accessToken = null;
};

export function getUID(){
    return currentUser.userId;
}

export const login = async (username, password) => {
    const response = await axios.post(`${API_ROOT}/auth/login`, { username, password }, {
        withCredentials: true
    });
    setAccessToken(response.data.accessToken);
    return response;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_ROOT}/auth/register`, userData, {
        withCredentials: true
    });
    return response;
};

export const refreshToken = async () => {
    const response = await axios.post(`${API_ROOT}/auth/refresh`, {}, {
        withCredentials: true
    });
    setAccessToken(response.data.accessToken);
    return response;
};

export const logout = async () => {
    await axios.post(`${API_ROOT}/auth/logout`, {}, {
        withCredentials: true
    });
    clearAccessToken();
};