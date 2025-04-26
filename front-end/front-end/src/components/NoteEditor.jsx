import React from "react";
import {useState, useEffect} from 'react';
import {createNote, updateNote} from "../services/noteService.js";

const NoteEditor = ({note, onUpdateNote, onCancel}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setIsPublic(note.isPublic || false);
        }
        else {
            setTitle('');
            setContent('');
            setIsPublic(false);
        }
    }, [note]);

    const handleSave = async () => {
        if (!title || !title.trim()) {
        alert("Note title cannot be empty");
        return;
        }

        if (!note) {
            alert("No note selected to save");
            return;
        }

        setIsSaving(true);

        try {
            const noteData = {title, content, isPublic};
            const savedNote = note.id ?
                await updateNote(note.id, noteData) :
                await createNote({...noteData, ownerId : 1}); // TEMP, replace with actual user ID later

            onUpdateNote(savedNote);
        } catch (err) {
            console.error("Failed to save note: ", err);
            alert("Failed to save note. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if(!note) {
            return (
                <div className='noteEditor empty'>
                    <div className='emptyState'>
                        Select a note to edit or create a new one
                    </div>
                </div>
            );
        }

        return (
            <div className='noteEditor'>
                <input
                type='text'
                className='noteTitle'
                value={title || 'Untitled Note'}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Note title'/>
                
                <textarea
                className='noteContent'
                value={content || ''}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write your note here...'
                />

                <div className={'publicToggle'}>
                    <label>
                        <input
                        type='checkbox'
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}/>
                    Make note public
                    </label>
                </div>

                <div className='editorActions'>
                    <button onClick={handleSave} className='saveBtn' disabled={isSaving}>{isSaving ? "Saving..." : "Save" }</button>

                    <button onClick={onCancel} className='cancelBtn' disabled={isSaving}>Cancel</button>
                    
                </div>  
            </div>
        );
};

export default NoteEditor;