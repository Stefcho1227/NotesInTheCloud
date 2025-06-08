import React from "react";
import NoteItem from "./NoteItem";
import { useState } from 'react';
import "./NoteList.css"

const NoteList = ({ notes, activeNote, onNoteSelect, onNoteDelete, onSearch }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <ul className="noteList">
            <input
                type='text'
                placeholder='Search notes...'
                value={searchInput}
                onChange={handleSearch}
                className='searchInput'
            />

            {notes.length === 0 ? (
                <div className="emptyState">
                    No notes found
                </div>
            ) : (
                notes.map(note => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        isActive={activeNote && activeNote.id === note.id}
                        onSelect={onNoteSelect}
                        onDelete={note.canDelete ? onNoteDelete : null}
                        isOwn={note.isOwn}
                        sharedPermission={note.sharedPermission}
                    />
                ))
            )}
        </ul>
    );
};

export default NoteList;