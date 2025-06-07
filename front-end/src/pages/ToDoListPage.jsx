import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router";
import ToDoList from "../components/ToDoList.jsx";
import { fetchToDos } from "../api/toDosApi.js";


export default function ToDoListPage() {
    const loaderData = useLoaderData();
    const [activeToDoId, setActiveToDoId] = useState(null);
    const navigate = useNavigate();

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

    const handleToDoSelect = (id) => {
        navigate(`${id}`)
        setActiveToDoId(id);
    };
    console.log(loaderData);
    return (
        <div className="todos-container">
            <ToDoList
                toDos={loaderData}
                onEdit={handleToDoSelect}
            />
            <Outlet/>
        </div>
    );
}