
import React from "react";
import {useState, useEffect} from 'react';

const ToDoEditor = ({toDo, onSave, onCancel}) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (toDo) {
            setTitle(toDo.title);
            setReminder(toDo.reminder);
        }
        else {
            setTitle('');
            setReminder('');
        }
    }, [toDo]);

    useEffect(() => {
        const changesExist =
            title.trim() !== toDo.title.trim() ||
            reminder !== toDo.reminder;
            setHasChanges(changesExist);
            }, [title, reminder, toDo]);

    const handleSave = async () => {
        if (!title || !title.trim()) {
            alert("To-do title cannot be empty");
            return;
        }

        if (!toDo) {
            alert("No to-do selected to save");
            return;
        }

        setIsSaving(true);

        try {
            await onSave({
                ...toDo,
                title: title.trim(),
                reminder: reminder || null});
        } catch (err) {
            console.error("Failed to save to-do: ", err);
            alert("Failed to save to-do. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if(!toDo) {
        return (
            <div className='toDoEditor empty'>
                <div className='emptyState'>
                    Select a to-do to edit or create a new one
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
                placeholder='to-do title'/>

            <input
                type = 'datetime-local'
                className='noteContent'
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                placeholder='Reminder'
            />

            <div className='editorActions'>
                <button onClick={handleSave} className='saveBtn' disabled={isSaving || !hasChanges}>
                    {isSaving ? "Saving..." : "Save" }</button>

                <button onClick={onCancel} className='cancelBtn' disabled={isSaving}>Cancel</button>

            </div>
        </div>
    );
};

export default ToDoEditor;