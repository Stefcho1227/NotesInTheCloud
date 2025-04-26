import React from "react";
import NoteItem  from "./NoteItem";
import {useState, useEffect} from 'react';
import {fetchNotes, deleteNote} from '../services/noteService.js';

const NoteList = ({ activeNote, onNoteSelect, }) => {
    const [notes,setNotes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const loadNotes = async () => {
        //     try {
        //         const data = await fetchNotes();
        //         setNotes(data);
        //     } catch (err) {
        //         setError("Failed to load notes");
        //         console.error(err);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        fetchNotes()
            .then(data=> {
                console.log(data)
                data.json()
            })
            .then(data=>setNotes(data))
            .catch(error=>{
                setError("Failed to load notes");
                console.log(error.message)
            })
            .finally(()=>setLoading(false))
        //loadNotes();
    }, []);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        //onSearch(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note.id !== id));
            if (activeNote?.id === id) {
                onNoteSelect(null);
            }
        } catch (err) {
            console.error("Failed to delete note", err);
            alert("Could not delete note. Please try again.");
        }
    };

    const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchInput.toLowerCase())
    || note.content.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (loading) return <div className={'emptyState'}>Loading notes...</div>;
    if (error) return <div className={'emptyState'}>{error}</div>;

    return (
        <ul className="noteList">
            <input 
                type='text'
                placeholder='Search notes...'
                value={searchInput}
                onChange={handleSearch}
                className='searchInput'/>

            {filteredNotes.length === 0 ?
            (<div className="emptyState">
                No notes found
            </div>) : (
                
                filteredNotes.map(note => (
                    <NoteItem
                    key={note.id}
                    note={note}
                    isActive={activeNote && activeNote.id === note.id}
                    onSelect={() => onNoteSelect(note)}
                    onDelete={handleDelete}/>// alt: onDelete={() => onNoteDelete(note.id)}
                ))
            )}
        </ul>
    );
};

export default NoteList;