import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import ToDoList from "../components/ToDoList.jsx";
import { fetchToDos } from "../api/toDosApi.js";

export async function loader() {
    try {
        const response = await fetchToDos();
        if (response.statusText !== 'OK') {
            throw new Error("Could not load to-dos");
        }
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

export default function ToDoListPage() {
    const loaderData = useLoaderData();
    const [activeToDoId, setActiveToDoId] = useState(null);

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

    const handleToDoSelect = (id) => {
        setActiveToDoId(id);
    };

    return (
        <div className="todos-container">
            <ToDoList
                toDos={loaderData}
                onEdit={handleToDoSelect}
            />
        </div>
    );
}