import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog.jsx";
import './App.css'
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote} from "./api/notesApi.js";

const LOGGED_USER_ID = 1; // To be replaced with id from session

function App() {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useState([]);
    //const [todos, setTodos] = useState({});
    const [activeNote, setActiveNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {
        fetchNotes().then(res => setNotes(res.data))
            .catch((err) => console.error("Could not load notes", err));
    }, []);

    const filteredNotes = notes.filter(note =>
        note &&
        note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = async () => {
        if(activeTab === 'notes') {
            try {
                const res = await createNote({
                    title: 'Untitled Note',
                    content: '',
                    isPublic: false,
                    ownerId: LOGGED_USER_ID
                });
                const newNote = res.data;
                setNotes([newNote, ...notes]);
                setActiveNote(newNote);
                setIsEditing(true);
            } catch (err) {
                console.error("Could not create note", err);
            }
        }
        else {
            // Add logic for adding a new todo item
        }
      };

    const handleUpdateNote = async (localNote) => {
        try {
            const payload = {
                title: localNote.title,
                content: localNote.content,
                isPublic: localNote.isPublic ?? false,
                ownerId: LOGGED_USER_ID
            };

            const res = await updateNote(localNote.id, payload);
            const saved = res.data;

            setNotes(notes.map(note => (note.id === saved.id ? saved : note)));
            setActiveNote(saved);
            setIsEditing(true);
        } catch (err) {
            console.error("Could not update note", err);
        }
    };

    const handleDeleteNote = (id) => {
        const note = notes.find(note => note.id === id)
        setNoteToDelete(note);
    };

    const confirmDelete = async () => {
        try {
            await deleteNote(noteToDelete.id);
            setNotes(notes.filter(note => note.id !== noteToDelete.id));
            if (activeNote?.id === noteToDelete.id) {
                setActiveNote(null);
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Could not delete note", err);
            alert("Delete failed");
        }
        setNoteToDelete(null);
    };
    const handleNoteSelect = (note) => {
        setActiveNote(note);
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setActiveNote(null);
        setIsEditing(false);
    };

    return (
        <div className='app'>
            <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}/>

            <div className='mainContent'>
            {activeTab === 'notes' ? (
                <div className='mainContent'>
                    <NoteList
                    notes={filteredNotes}
                    activeNote={activeNote}
                    onNoteSelect={handleNoteSelect}
                    onNoteDelete={handleDeleteNote}
                    onSearch={setSearchTerm}/>

                    {activeNote &&
                    <NoteEditor
                    note={activeNote}
                    onUpdateNote={handleUpdateNote}
                    onCancel={handleCancelEdit}/>
                    }
            </div>
            ) : (
            <div/* To-Do List Component *//>
            )}

            {!isEditing && (<button
            className='fab'
            onClick={handleAddItem}>+</button>)}
        </div>
        <DeleteConfirmationDialog
        isOpen={!!noteToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setNoteToDelete(null)}
        noteTitle={noteToDelete?.title || ''}/>
    </div>
    );
};

export default App;