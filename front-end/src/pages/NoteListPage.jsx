import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router";
import NoteList from "../components/NoteList.jsx";
import { deleteNote } from "../api/notesApi.js";
import { fetchSharedNotes } from "../api/shareApi";
import { getUID } from "../api/authApi.js";

export default function NoteListPage() {
    const loaderData = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [sharedNotes, setSharedNotes] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const navigate = useNavigate();
    const uid = getUID();

    useEffect(() => {
        const loadSharedNotes = async () => {
            try {
                const response = await fetchSharedNotes(uid);
                setSharedNotes(response.data || []);
            } catch (error) {
                console.error("Failed to fetch shared notes:", error);
                setSharedNotes([]);
            }
        };
        loadSharedNotes();
    }, [uid]);

    // Merge own notes and shared notes, marking ownership
    const mergedNotes = [
        ...(loaderData || []).map(note => ({
            ...note,
            isOwn: true,
            canDelete: true
        })),
        ...sharedNotes.map(share => ({
            ...share.note,
            isOwn: false,
            canDelete: false,
            sharedPermission: share.perm
        }))
    ];

    // Filter notes based on search term
    const filteredNotes = mergedNotes.filter(note => {
        if (!note) return false;
        const term = searchTerm.toLowerCase();
        return (
            note.title?.toLowerCase().includes(term) ||
            note.content?.toLowerCase().includes(term)
        );
    });

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            navigate('.', { replace: true });
        } catch (error) {
            console.error("Failed to delete note:", error);
            alert("Failed to delete note. Please try again.");
        }
    };

    const handleNoteSelect = (note) => {
        setActiveNoteId(note.id);
        navigate(`${note.id}`);
    };

    if (loaderData.error) {
        return <section>{loaderData.error}</section>;
    }

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