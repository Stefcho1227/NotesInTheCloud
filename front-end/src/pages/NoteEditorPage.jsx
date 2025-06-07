// NoteEditorPage.jsx
import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import NoteEditor from "../components/NoteEditor.jsx";
import {createNote, updateNote} from "../api/notesApi.js";
import {getUID, getAccessToken, getCurrentUser} from "../api/authApi.js";

export default function NoteEditorPage() {
    const note = useLoaderData();
    const navigate = useNavigate();
    const isNew = !note; // Determine if this is a new note

    const handleSave = async (noteData) => {
        try {
            if (isNew) {
                await createNote({...noteData, ownerId: getUID()});
            } else {
                await updateNote(noteData.id, {...noteData, ownerId: getUID()});
            }
            navigate('/app/notes');
        } catch (err) {
            console.error("Could not save note", err);
            alert(`Failed to ${isNew ? 'create' : 'update'} note`);
        }
    };

    const handleCancel = () => {
        navigate('/app/notes');
    };

    if (note?.error) {
        return <section>{note.error}</section>;
    }

    return (
        <NoteEditor
            note={isNew ? { title: '', content: '', isPublic: false } : note}
            isNew={isNew}
            onUpdateNote={handleSave}
            onCancel={handleCancel}
        />
    );
}