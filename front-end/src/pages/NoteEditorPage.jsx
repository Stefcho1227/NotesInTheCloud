import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import NoteEditor from "../components/NoteEditor.jsx";
import { createNote, updateNote } from "../api/notesApi.js";
import { getUID } from "../api/authApi.js";

export default function NoteEditorPage() {
    const note = useLoaderData();
    const navigate = useNavigate();
    const isNew = !note?.id; // Determine if this is a new note

    const handleSave = async (noteData) => {
        try {
            if (isNew) {
                // For new notes, include ownerId and other required fields
                await createNote({
                    ...noteData,
                    ownerId: getUID(),
                    isPublic: false // Default value for new notes
                });
            } else {
                // For shared notes, only allow update if user has EDIT permission
                if (note.sharedPermission && note.sharedPermission !== 'EDIT') {
                    alert("You don't have permission to edit this note");
                    return;
                }
                await updateNote(noteData.id, {
                    ...noteData,
                    ownerId: getUID()
                });
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
            note={isNew ? { title: '', content: '' } : note}
            isNew={isNew}
            onUpdateNote={handleSave}
            onCancel={handleCancel}
            isReadOnly={!isNew && note?.sharedPermission === 'READ'}
        />
    );
}