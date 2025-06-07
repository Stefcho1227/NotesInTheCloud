// api/userApi.js
import api from "./axiosConfig";

export const fetchAllUsers = () => api.get("/users");
