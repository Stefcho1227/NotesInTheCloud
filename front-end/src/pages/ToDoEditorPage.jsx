import React from "react";
import { useNavigate, useLoaderData, useRevalidator } from "react-router";
import ToDoEditor from "../components/ToDoEditor.jsx";
import { createToDo, updateToDo, createReminder, updateReminder, deleteReminder } from "../api/toDosApi.js";
import { getUID } from "../api/authApi.js";

export default function ToDoEditorPage() {
    const toDo = useLoaderData();
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();
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
                await updateToDo(toDoData.id, todoToSave);
                const r = toDoData.reminder;       // shorter name
                const hadReminder   = !!toDo.reminder?.id;   // from loader
                const wantsReminder = !!r?.remindAt;         // after editing

                if (wantsReminder && r.id) {
                    // A) existed and user kept it → UPDATE
                    await updateReminder(r.id, {
                        remindAt: r.remindAt,
                        todoId:   toDoData.id,
                        creatorId: getUID()
                    });
                } else if (wantsReminder && !r.id) {
                    // B) was absent and user added one → CREATE
                    await createReminder({
                        remindAt: r.remindAt,
                        todoId:   toDoData.id,
                        creatorId: getUID()
                    });
                } else if (!wantsReminder && hadReminder) {
                    // C) user cleared the field → DELETE
                    await deleteReminder(toDo.reminder.id);

                }
            }
            await revalidate();
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