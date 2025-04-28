
import axios from 'axios';

const API_ROOT = /*import.meta.env.VITE_API ||*/ 'http://localhost:8080/api';
export const fetchNotes = () => axios.get(`${API_ROOT}/notes`);
export const createNote = (note) => axios.post(`${API_ROOT}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API_ROOT}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_ROOT}/notes/${id}`);

