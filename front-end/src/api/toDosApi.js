import axios from 'axios';

export const fetchToDos = () => axios.get(`${import.meta.env.VITE_API_ROOT}/toDos`);
export const fetchToDo = (id) => axios.get(`${import.meta.env.VITE_API_ROOT}/toDos/${id}`);
export const createToDo = (toDo) => axios.post(`${import.meta.env.VITE_API_ROOT}/toDos`, toDo);
export const updateToDo = (id, toDo) => axios.put(`${import.meta.env.VITE_API_ROOT}/toDos/${id}`, toDo);
export const deleteToDo = (id) => axios.delete(`${import.meta.env.VITE_API_ROOT}/toDos/${id}`);