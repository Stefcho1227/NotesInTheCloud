import api from './axiosConfig';

export const fetchToDos = (userId) => api.get(`/users/${userId}/todos`);
export const fetchToDo = (id) => api.get(`/todoItems/${id}`);
export const createToDo = (toDo) => api.post('/todoItems', toDo);
export const updateToDo = (id, toDo) => api.put(`/todoItems/${id}`, toDo);
export const deleteToDo = (id) => api.delete(`/todoItems/${id}`);

export const getReminders = () => api.get('/reminders');

// Reminder endpoints
export const createReminder = (reminderData) => {
    const formattedData = {
        remindAt: new Date(reminderData.remindAt).toISOString(),
        todoItemId: reminderData.todoId,
        creatorId: reminderData.creatorId,
        isSent: false
    };
    return api.post('/reminders', formattedData);
}
export const updateReminder = (id, reminderData) => {
    const formattedData = {
        remindAt: new Date(reminderData.remindAt).toISOString(),
        todoItemId: reminderData.todoId,
        creatorId: reminderData.creatorId
    };
    return api.put(`/reminders/${id}`, formattedData);
}
export const deleteReminder = (id) => api.delete(`/reminders/${id}`);