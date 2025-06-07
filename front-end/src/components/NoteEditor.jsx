import React, { useState, useEffect } from 'react';
import './NoteEditor.css'

const NoteEditor = ({ note, isNew, onUpdateNote, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
        }
    }, [note]);

    useEffect(() => {
        const changesExist = (
            title !== (note?.title || '') ||
            content !== (note?.content || '') ||
            isPublic !== (note?.isPublic || false)
        );
        setHasChanges(changesExist);
    }, [title, content, isPublic, note]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Note title cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            await onUpdateNote({
                ...(note || {}), // Include existing fields if editing
                title: title.trim(),
                content,
                isPublic
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="noteEditor">
            <h2>{isNew ? 'Create New' : 'Edit'} Note</h2>

            <div className="editorForm">
                <div className="formGroup">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note title"
                    />
                </div>

                <div className="formGroup">
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here..."
                        rows={10}
                    />
                </div>

                <div className="formGroup">
                    <label>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        Make note public
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

export default NoteEditor;