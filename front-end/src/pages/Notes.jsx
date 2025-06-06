// Notes.jsx
import React from "react";
import Header from "../components/Header";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog.jsx";
import { Outlet, useNavigate } from "react-router";
import "../App.css";

const LOGGED_USER_ID = 1; // To be replaced with id from session

function Notes() {
    const navigate = useNavigate();

    const handleAddItem = () => {
        const path = window.location.pathname;
        if (path.includes('notes')) {
            navigate('/notes/new');
        } else if (path.includes('todos')) {
            navigate('/todos/new');
        }
    };

    return (
        <div className='app'>
            <Header/>

            <div className='mainContent'>
                <Outlet />

                <button className='fab' onClick={handleAddItem}>+</button>
            </div>

            <DeleteConfirmationDialog
                isOpen={false}
                onConfirm={() => {}}
                onCancel={() => {}}
                noteTitle={''}
            />
        </div>
    );
}

export default Notes;