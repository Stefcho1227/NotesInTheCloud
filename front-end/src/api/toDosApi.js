import axios from 'axios';

const API_ROOT = 'http://localhost:8080/api';
export const fetchToDos = () => axios.get(`${API_ROOT}/toDos`);
export const createToDo = (toDo) => axios.post(`${API_ROOT}/toDos`, toDo);
export const updateToDo = (id, toDo) => axios.put(`${API_ROOT}/toDos/${id}`, toDo);
export const deleteToDo = (id) => axios.delete(`${API_ROOT}/toDos/${id}`);

