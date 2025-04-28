<<<<<<< HEAD
import axios from "axios";

const API_ROOT =
    import.meta.env.VITE_API || "http://localhost:8080/api";
export const fetchNotes  = ()             => axios.get (`${API_ROOT}/notes`);
export const createNote  = (note)         => axios.post(`${API_ROOT}/notes`,        note);
export const updateNote  = (id, note)     => axios.put (`${API_ROOT}/notes/${id}`,  note);
export const deleteNote  = (id)           => axios.delete(`${API_ROOT}/notes/${id}`);
=======
import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API || 'http://localhost:8080/api';
axios.defaults.withCredentials = true;
export const fetchNotes = () => axios.get(`${API_ROOT}/notes`);
export const createNote = (note) => axios.post(`${API_ROOT}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API_ROOT}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_ROOT}/notes/${id}`);
>>>>>>> 95d0ed6fbd941bb7eeb2c1192765a34f72827209
