import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import ToDoEditor from "../components/ToDoEditor.jsx";
import { fetchToDo, updateToDo } from "../api/toDosApi.js";

export default function ToDoEditorPage() {
    const toDo = useLoaderData();
    const navigate = useNavigate();
    const isNew = !toDo; // Determine if this is a new todo

    const handleSave = async (toDoData) => {
        try {
            if (isNew) {
                await createToDo(toDoData);
            } else {
                await updateToDo(toDoData.id, toDoData);
            }
            navigate('/app/todos');
        } catch (err) {
            console.error("Could not save to-do", err);
            alert(`Failed to ${isNew ? 'create' : 'update'} to-do`);
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
            toDo={isNew ? { text: '', reminder: null, completed: false } : toDo}
            isNew={isNew}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
}