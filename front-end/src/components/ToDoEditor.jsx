import React, { useState, useEffect } from 'react';
import './ToDoEditor.css'
import {getCurrentUser, getUID} from "../api/authApi.js";

const ToDoEditor = ({ toDo, isNew, onSave, onCancel }) => {
    const [text, setText] = useState('');
    const [reminder, setReminder] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (toDo) {
            setText(toDo.text || '');
            setReminder(toDo.reminder?.remindAt || '');
            setIsDone(toDo.isDone || false);
        }
    }, [toDo]);

    useEffect(() => {
        const changesExist = (
            text !== (toDo?.text || '') ||
            reminder !== (toDo?.reminder?.remindAt || '') ||
            isDone !== (toDo?.isDone || false)
        );
        setHasChanges(changesExist);
    }, [text, reminder, isDone, toDo]);

    const handleSave = async () => {
        if (!text.trim()) {
            alert("To-Do text cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                id: toDo.id,
                text: text.trim(),
                isDone,
                reminder: reminder ? {
                    todoId: toDo.id,
                    remindAt: new Date(reminder).toISOString(),
                    creatorId: getUID()
                } : null
            };
            await onSave(payload);
        } finally {
            setIsSaving(false);
        }
    };

    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className="toDoEditor">
            <h2>{isNew ? 'Create New' : 'Edit'} To-Do</h2>

            <div className="editorForm">
                <div className="formGroup">
                    <label>Text:</label>
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
                        step='60'
                        value={formatDateTimeLocal(reminder)}
                        onChange={(e) => setReminder(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label>
                        <input
                            type="checkbox"
                            checked={isDone}
                            onChange={(e) => setIsDone(e.target.checked)}
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