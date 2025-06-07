import api from './axiosConfig';

export const fetchNotes = (userId) => api.get(`/users/${userId}/notes`);
export const fetchNote = (id) => api.get(`/notes/${id}`);
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);