import React from "react";
import { useNavigate, useLoaderData } from "react-router";
import ToDoEditor from "../components/ToDoEditor.jsx";
import { createToDo, updateToDo, createReminder, updateReminder, deleteReminder } from "../api/toDosApi.js";
import { getUID } from "../api/authApi.js";

export default function ToDoEditorPage() {
    const toDo = useLoaderData();
    const navigate = useNavigate();
    const isNew = !toDo?.id;

    const handleSave = async (toDoData) => {
        try {
            const todoToSave = {
                ...toDoData,
                ownerId: getUID()
            };

            let savedTodo;
            if (isNew) {
                savedTodo = await createToDo(todoToSave);
                if (toDoData.reminder) {
                    try {
                        await createReminder({
                            remindAt: toDoData.reminder.remindAt,
                            todoId: savedTodo.data.id,
                            creatorId: getUID()
                        });
                    } catch (reminderError) {
                        console.error("Failed to create reminder", reminderError);
                        // Continue even if reminder fails
                    }
                }
            } else {
                savedTodo = await updateToDo(toDoData.id, todoToSave);
                // Handle reminder updates
                if (toDoData.reminder) {
                    try {
                        if (toDo.reminder?.id) {
                            await updateReminder(toDo.reminder.id, {
                                remindAt: toDoData.reminder.remindAt,
                                todoId: toDoData.id,
                                creatorId: getUID()
                            });
                        } else {
                            await createReminder({
                                remindAt: toDoData.reminder.remindAt,
                                todoId: toDoData.id,
                                creatorId: getUID()
                            });
                        }
                    } catch (reminderError) {
                        console.error("Failed to update reminder", reminderError);
                    }
                } else if (toDo.reminder?.id) {
                    try {
                        await deleteReminder(toDo.reminder.id);
                    } catch (deleteError) {
                        console.error("Failed to delete reminder", deleteError);
                    }
                }
            }
            navigate('/app/todos', { replace: true });
        } catch (err) {
            console.error("Could not save to-do", err);
            alert(`Failed to ${isNew ? 'create' : 'update'} to-do: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCancel = () => {
        navigate('/app/todos');
    };

    if (toDo?.error) {
        return <section>{toDo.error}</section>;
    }

    return (
        <ToDoEditor
            toDo={isNew ? { text: '', isDone: false } : toDo}
            isNew={isNew}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
}