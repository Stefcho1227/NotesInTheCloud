import axios from 'axios';

export const fetchNotes = () => axios.get(`${import.meta.env.VITE_API_ROOT}/notes`);
export const fetchNote = (id) => axios.get(`${import.meta.env.VITE_API_ROOT}/notes/${id}`);
export const createNote = (note) => axios.post(`${import.meta.env.VITE_API_ROOT}/notes`, note);
export const updateNote = (id, note) => axios.put(`${import.meta.env.VITE_API_ROOT}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${import.meta.env.VITE_API_ROOT}/notes/${id}`);