// NoteEditorPage.jsx
import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import NoteEditor from "../components/NoteEditor.jsx";
import {  updateNote } from "../api/notesApi.js";


export default function NoteEditorPage() {
    const note = useLoaderData();
    const navigate = useNavigate();

    const handleUpdateNote = async (updatedNote) => {
        try {
            await updateNote(updatedNote.id, updatedNote);
            navigate('/app/notes');
        } catch (err) {
            console.error("Could not update note", err);
            alert("Failed to update note");
        }
    };

    const handleCancel = () => {
        navigate('/app/notes');
    };

    if (note.error) {
        return <section>{note.error}</section>;
    }

    return (
        <NoteEditor
            note={note}
            onUpdateNote={handleUpdateNote}
            onCancel={handleCancel}
        />
    );
}