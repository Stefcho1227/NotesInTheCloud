import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import ToDoList from "../components/ToDoList";
import ToDoEditor from "../components/ToDoEditor";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog.jsx";
import "../App.css";
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote } from "../api/notesApi.js";

import {
    fetchToDos,
    createToDo,
    updateToDo,
    deleteToDo } from "../api/toDosApi.js";

const LOGGED_USER_ID = 1; // To be replaced with id from session

function Notes() {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);
    const [toDos, setToDos] = useState([]);
    const [activeToDo, setActiveToDo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [toDoToDelete, setToDoToDelete] = useState(null);

    useEffect(() => {
        fetchNotes().then(res => setNotes(res.data))
            .catch((err) => console.error("Could not load notes", err));

        fetchToDos().then(res => setToDos(res.data))
            .catch((err) => console.error("Could not load to-dos", err));
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
            try {
                const res = await createToDo({
                    id: Date.now(),
                    title: '',
                    completed: false,
                    reminder: null
                });
                const newToDo = res.data;
                setToDos([newToDo, ...toDos]);
                setActiveToDo(newToDo);
                setIsEditing(true);
            } catch (err) {
                console.error("Could not create To-do", err);
            }
        }
    };

    const handleSetReminder = (id) => {
        const reminderTime = prompt("Enter time for reminder");
        if (reminderTime){
            const updatedToDos = toDos.map(toDo => toDo.id === id ? {...toDo,reminder: reminderTime} : toDo);
            setToDos(updatedToDos);
        }
    };

    const handleToggleToDo = (id) => {
        const updated = toDos.map(toDo => toDo.id === id ? {...toDo,completed: !toDo.completed} : toDo);
        setToDos(updated);
    }

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

    const handleUpdateToDo = async(localToDo) => {
        try{
            const payload = {
                title: localToDo.title,
                completed: localToDo.completed,
                reminder: localToDo.reminder ?? null
            };

            const res = await updateToDo(localToDo.id, payload);
            const saved = res.data;

            setToDos(toDos.map(toDo => (toDo.id === saved.id ? saved : toDo)));
            setActiveToDo(saved);
            setIsEditing(true);
        } catch (err) {
            console.error("Could not update To-Do", err);
        }
    };

    const handleDeleteToDo = (id) => {
        const toDo = toDos.find(toDo => toDo.id === id);
        setToDoToDelete(toDo);
    };

    const confirmDeleteToDo = async () => {
        try {
            await deleteToDo(toDoToDelete.id);
            setToDos(toDos.filter(toDo => toDo.id !== toDoToDelete.id));
            if (activeToDo?.id === toDoToDelete.id) {
                setActiveToDo(null);
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Could not delete to-do", err);
            alert("Delete failed");
        }
        setToDoToDelete(null);
    };

    const handleDeleteNote = (id) => {
        setNoteToDelete(notes.find(note => note.id === id));
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
        if (activeNote && activeNote.id === note.id) {
            setActiveNote(null);
            setIsEditing(false);
        }
        else {
            setActiveNote(note);
            setIsEditing(true);
        }
    }

    const handleCancelEdit = () => {
        setActiveNote(null);
        setActiveToDo(null);
        setIsEditing(false);
    };

    return (
        <div className='app'>
            <Header
                activeTab={activeTab}
                onTabChange={setActiveTab}/>

            <div className='mainContent'>
                {activeTab === 'notes' ? (
                    <>
                        <NoteList
                            notes={filteredNotes}
                            activeNote={activeNote}
                            onNoteSelect={handleNoteSelect}
                            onNoteDelete={handleDeleteNote}
                            onSearch={setSearchTerm}
                        />

                        {activeNote && (
                            <NoteEditor
                                note={activeNote}
                                onUpdateNote={handleUpdateNote}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <ToDoList
                            toDos = {toDos}
                            onToggle={handleToggleToDo}
                            onDelete={handleDeleteToDo}
                            onEdit={setActiveToDo}
                            onReminder={handleSetReminder}
                        />

                        {activeToDo && (
                            <ToDoEditor
                                toDo={activeToDo}
                                onSave={handleUpdateToDo}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </>
                )}

                {!isEditing && (
                    <button
                        className='fab'
                        onClick={handleAddItem}>+
                    </button>
                )}
            </div>

            <DeleteConfirmationDialog
                isOpen={!!noteToDelete}
                onConfirm={confirmDelete}
                onCancel={() => setNoteToDelete(null)}
                noteTitle={noteToDelete?.title || ''}
            />

            <DeleteConfirmationDialog
                isOpen={!!toDoToDelete}
                onConfirm={confirmDeleteToDo}
                onCancel={() => setToDoToDelete(null)}
                noteTitle={toDoToDelete?.title || ''}
            />
        </div>
    );
}

export default Notes;