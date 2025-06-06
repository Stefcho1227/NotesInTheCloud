import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import ToDoEditor from "../components/ToDoEditor.jsx";
import { fetchToDo, updateToDo } from "../api/toDosApi.js";

export async function loader({ params }) {
    try {
        const response = await fetchToDo(params.id);
        if (response.statusText !== 'OK') {
            throw new Error("Could not load to-do");
        }
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

export default function ToDoEditorPage() {
    const toDo = useLoaderData();
    const navigate = useNavigate();

    const handleUpdateToDo = async (updatedToDo) => {
        try {
            await updateToDo(updatedToDo.id, updatedToDo);
            navigate('/todos');
        } catch (err) {
            console.error("Could not update to-do", err);
            alert("Failed to update to-do");
        }
    };

    const handleCancel = () => {
        navigate('/todos');
    };

    if (toDo.error) {
        return <section>{toDo.error}</section>;
    }

    return (
        <ToDoEditor
            toDo={toDo}
            onSave={handleUpdateToDo}
            onCancel={handleCancel}
        />
    );
}