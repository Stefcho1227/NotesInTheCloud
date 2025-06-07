import React, { useState } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router";
import NoteList from "../components/NoteList.jsx";
import { deleteNote } from "../api/notesApi.js";

export default function NoteListPage() {
    const loaderData = useLoaderData();
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            // Refresh the page after deletion
            navigate('.', { replace: true });
        } catch (error) {
            console.error("Failed to delete note:", error);
            alert("Failed to delete note. Please try again.");
        }
    };

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

    const filteredNotes = loaderData.filter(note => note &&
        (note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const handleNoteSelect = (note) => {
        setActiveNoteId(note.id);
        navigate(`${note.id}`);
    };

    return (
        <div className="notes-container">
            <NoteList
                notes={filteredNotes}
                activeNote={filteredNotes.find(note => note.id === activeNoteId)}
                onNoteSelect={handleNoteSelect}
                onNoteDelete={handleDeleteNote}
                onSearch={setSearchTerm}
            />
            <Outlet/>
        </div>
    );
}