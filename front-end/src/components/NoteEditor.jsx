
import React from "react";
import {useState, useEffect} from 'react';

const NoteEditor = ({note, onUpdateNote, onCancel}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
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

    useEffect(() => {
        const trimmedTitle = title.trim();
        const originalTitle = note.title.trim();

        const changesExist = (
          trimmedTitle !== originalTitle ||
          content !== note.content ||
          isPublic !== (note.isPublic || false)
        );

        setHasChanges(changesExist);
    }, [title, content, isPublic, note]);
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
            onUpdateNote({...note, title, content, isPublic});
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Note title'/>

                <textarea
                className='noteContent'
                value={content}
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
                    <button onClick={handleSave} className='saveBtn' disabled={isSaving || !hasChanges}>{isSaving ? "Saving..." : "Save" }</button>

                    <button onClick={onCancel} className='cancelBtn' disabled={isSaving}>Cancel</button>

                </div>
            </div>
        );
};

export default NoteEditor;