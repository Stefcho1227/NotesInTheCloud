import api from './axiosConfig';

export const fetchToDos = () => api.get('/toDos');
export const fetchToDo = (id) => api.get(`/toDos/${id}`);
export const createToDo = (toDo) => api.post('/toDos', toDo);
export const updateToDo = (id, toDo) => api.put(`/toDos/${id}`, toDo);
export const deleteToDo = (id) => api.delete(`/toDos/${id}`);