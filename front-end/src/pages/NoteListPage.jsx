import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router";
import NoteList from "../components/NoteList.jsx";
import { deleteNote } from "../api/notesApi.js";
import { fetchSharedNotes } from "../api/shareApi";
import { getUID } from "../api/authApi";


export default function NoteListPage() {
    const loaderData = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    
    const [shared,    setShared]    = useState([]);
    const uid = getUID();

    useEffect(() => {
          fetchSharedNotes(uid)
            .then(r => setShared(r.data))
            .catch(() => setShared([]));
        }, [uid]);

    const ownNotes     = loaderData.map(n => ({ ...n, shared: false }));
    const sharedNotes  = shared.map(s => ({
            ...s.note,      // the note entity lives inside NoteShare
            shared: true,
            perm : s.perm
    }));
    const merged = [...ownNotes, ...sharedNotes];
    const filteredNotes = merged.filter(note => {
            const term = searchTerm.toLowerCase();
            return (
                  note.title?.toLowerCase().includes(term) ||
                  note.content.toLowerCase().includes(term)
                );
        });
    const [activeNoteId, setActiveNoteId] = useState(null);
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

/*    const filteredNotes = loaderData.filter(note => note &&
        (note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        ));*/

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