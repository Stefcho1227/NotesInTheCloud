// NoteListPage.jsx
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import NoteList from "../components/NoteList.jsx";



export default function NoteListPage() {
    const loaderData = useLoaderData();
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

    const filteredNotes = loaderData.filter(note => note &&
        (note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const handleNoteSelect = (note) => {
        setActiveNoteId(note.id);
    };

    return (
        <div className="notes-container">
            <NoteList
                notes={filteredNotes}
                activeNote={filteredNotes.find(note => note.id === activeNoteId)}
                onNoteSelect={handleNoteSelect}
                onSearch={setSearchTerm}
            />
        </div>
    );
}