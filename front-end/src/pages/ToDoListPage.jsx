import React, { useState } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router";
import ToDoList from "../components/ToDoList.jsx";
import { deleteToDo } from "../api/toDosApi.js";

export default function ToDoListPage() {
    const loaderData = useLoaderData();
    const [activeToDoId, setActiveToDoId] = useState(null);
    const navigate = useNavigate();
    console.log(loaderData);
    const handleDelete = async (id) => {
        try {
            await deleteToDo(id);
            navigate('.', { replace: true });
        } catch (err) {
            console.error("Failed to delete todo:", err);
            alert("Failed to delete todo. Please try again.");
        }
    };

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

    const handleToDoSelect = (id) => {
        setActiveToDoId(id);
        navigate(`${id}`);
    };

    return (
        <div className="todos-container">
            <ToDoList
                toDos={loaderData}
                onEdit={handleToDoSelect}
                onDelete={handleDelete}
            />
            <Outlet/>
        </div>
    );
}