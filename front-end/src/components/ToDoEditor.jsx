import React, { useState, useEffect } from 'react';
import './ToDoEditor.css'

const ToDoEditor = ({ toDo, isNew, onSave, onCancel }) => {
    const [text, setText] = useState('');
    const [reminder, setReminder] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (toDo) {
            setText(toDo.text || '');
            setReminder(toDo.reminder || '');
            setCompleted(toDo.completed || false);
        }
    }, [toDo]);

    useEffect(() => {
        const changesExist = (
            text !== (toDo?.text || '') ||
            reminder !== (toDo?.reminder || '') ||
            completed !== (toDo?.completed || false)
        );
        setHasChanges(changesExist);
    }, [text, reminder, completed, toDo]);

    const handleSave = async () => {
        if (!text.trim()) {
            alert("To-Do text cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            await onSave({
                ...(toDo || {}), // Include existing fields if editing
                text: text.trim(),
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
                    <label>text:</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter to-do text"
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