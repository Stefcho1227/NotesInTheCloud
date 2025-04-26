import React from "react";
import {useState, useEffect} from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog.jsx";
import './App.css'
import {fetchNotes} from "./services/noteService.js";


function App() {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState({});
    const [activeNote, setActiveNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (err) {
                console.error("Failed to load notes", err);
            }
        };
        loadNotes();

        // const sampleNotes = [
        //     {id:1, title: 'Note 1', content: 'This is the first note', lastModified: new Date()},
        //     {id:2, title: 'Note 2', content: 'This is the second note', lastModified: new Date()}
        // ];
        // setNotes(sampleNotes);
    }, []);

    const filterNotes = notes.filter(note =>
        note?.title?.toLowerCase()||''.includes(searchTerm.toLowerCase()) ||
        note?.content?.toLowerCase()||''.includes(searchTerm.toLowerCase())
    );

    const handleAddItem = () => {
        if(activeTab === 'notes') {
            // const newNote = {
            //     id: Date.now(),
            //     title: 'Untitled Note',
            //     content: '',
            //     lastModified: new Date()
            //   };
            //   setNotes([newNote, ...notes]);
              //setActiveNote(newNote);
            setActiveNote({
                id: Date.now(), //TEMP
                title: 'Untitled Note',
                content: '',
                isPublic: false
            });
              setIsEditing(true);
        }
        else {
            // Add logic for adding a new todo item
        }
        
      };

    const handleUpdateNote = (savedNote) => {
        setNotes(prevNotes => {
            const existing = prevNotes.find(note => note.id === savedNote.id);
            if (existing) {
                // Update existing note
                return prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                );
            } else {
                // Add new note
                return [savedNote, ...prevNotes];
            }
        });
        setActiveNote(savedNote);
        setIsEditing(false);
    };


    // const handleUpdateNote = (updatedNote) => {
    //     if (notes.some(note => note.id === updatedNote.id)) {
    //         const updatedNotes = notes.map(note =>
    //             note.id === updatedNote.id ? {...updatedNote, lastModified: new Date()} : note
    //         );
    //         setNotes(updatedNotes);
    //     }
    //     else {
    //         setNotes([{...updatedNote, lastModified: new Date()}, ...notes]);
    //     }
    //
    //     setActiveNote(updatedNote);
    //     setIsEditing(true);
    // };

    const handleDeleteNote = (id) => {
        const note = notes.find(note => note.id === id)
        setNoteToDelete(note);

        // setNotes(notes.filter(note => note.id !== id));
        // if(activeNote && activeNote.id === id) {
        //     setActiveNote(null);
        //     setIsEditing(false);
        // }
    };

    const confirmDelete = () => {
        setNotes(notes.filter(note => note.id !== noteToDelete.id));
        if (activeNote?.id === noteToDelete.id) {
            setActiveNote(null);
            setIsEditing(false);
        }
        setNoteToDelete(null);
    };
    const handleNoteSelect = (note) => {
        setActiveNote(note);
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        if(activeNote && activeNote.title === 'Untitled Note' && activeNote.content === '') {//fix statement
            setNotes(notes.filter(note => note.id !== activeNote.id));
        }
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
                    notes={filterNotes}
                    activeNote={activeNote}
                    onNoteSelect={handleNoteSelect}
                    onNoteDelete={handleDeleteNote}
                    onSearch={setSearchTerm}/>

                    <NoteEditor
                    note={activeNote}
                    onUpdateNote={handleUpdateNote}
                    onCancel={handleCancelEdit}/>
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