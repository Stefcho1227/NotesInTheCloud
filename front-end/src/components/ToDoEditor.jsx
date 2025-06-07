import React, { useState, useEffect } from 'react';
import './ToDoEditor.css'

const ToDoEditor = ({ toDo, isNew, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (toDo) {
            setTitle(toDo.title || '');
            setReminder(toDo.reminder || '');
            setCompleted(toDo.completed || false);
        }
    }, [toDo]);

    useEffect(() => {
        const changesExist = (
            title !== (toDo?.title || '') ||
            reminder !== (toDo?.reminder || '') ||
            completed !== (toDo?.completed || false)
        );
        setHasChanges(changesExist);
    }, [title, reminder, completed, toDo]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("To-Do title cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            await onSave({
                ...(toDo || {}), // Include existing fields if editing
                title: title.trim(),
                reminder: reminder || null,
                completed
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="toDoEditor">
            <h2>{isNew ? 'Create New' : 'Edit'} To-Do</h2>

            <div className="editorForm">
                <div className="formGroup">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter to-do title"
                    />
                </div>

                <div className="formGroup">
                    <label>Reminder:</label>
                    <input
                        type="datetime-local"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        Completed
                    </label>
                </div>

                <div className="editorActions">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || (!isNew && !hasChanges)}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={onCancel} disabled={isSaving}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoEditor;