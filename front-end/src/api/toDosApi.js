import api from './axiosConfig';

export const fetchToDos = (userId) => api.get(`/users/${userId}/todos`);
export const fetchToDo = (id) => api.get(`/todoItems/${id}`);
export const createToDo = (toDo) => api.post('/todoItems', toDo);
export const updateToDo = (id, toDo) => api.put(`/todoItems/${id}`, toDo);
export const deleteToDo = (id) => api.delete(`/todoItems/${id}`);