import React from "react";
import {useState, useEffect} from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './App.css'


function App() {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState({});
    const [activeNote, setActiveNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const sampleNotes = [
            {id:1, title: 'Note 1', content: 'This is the first note', lastModified: new Date()},
            {id:2, title: 'Note 2', content: 'This is the second note', lastModified: new Date()}
        ];
        setNotes(sampleNotes);
    }, []);

    const filterNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = () => {
        if(activeTab === 'notes') {
            const newNote = {
                id: Date.now(),
                title: 'Untitled Note',
                content: '',
                lastModified: new Date()
              };
              setNotes([newNote, ...notes]);
              setActiveNote(newNote);
              setIsEditing(true);
        }
        else {
            // Add logic for adding a new todo item
        }
        
      };

    // const handleAddNote = () => {
    //   const newNote = {
    //     id: Date.now(),
    //     title: 'Untitled Note',
    //     content: '',
    //     lastModified: new Date()
    //   };
    //   setNotes([newNote, ...notes]);
    //   setActiveNote(newNote);
    // };

    const handleUpdateNote = (updatedNote) => {
        const updatedNotes = notes.map(note => 
            note.id === updatedNote.id ? {...updatedNote, lastModified: new Date()} : note
        );
        setNotes(updatedNotes);
        setActiveNote(updatedNote);
        setIsEditing(true);
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        if(activeNote && activeNote.id === id) {
            setActiveNote(null);
            setIsEditing(false);
        }
    };

    const handleNoteSelect = (note) => {
        setActiveNote(note);
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        if(activeNote && activeNote.title === 'Untitled Note' && activeNote.content === '') {//fix statement
            if(window.confirm('Delete this empty note?')) {
                setNotes(notes.filter(note => note.id !== activeNote.id));
            }
        }
        setActiveNote(null);
        setIsEditing(false);
    }

    return (
        <div className='app'>
            <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}/>

            <div className='mainContent'>
            {activeTab === 'notes' ? (<div className='mainContent'>
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

            {!isEditing && <button 
            className='fab'
            onClick={handleAddItem}>+</button>}
        </div>          
    </div>    
    );
};

export default App;