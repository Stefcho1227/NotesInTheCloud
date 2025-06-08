import React, { useState, useEffect } from 'react';
import { createShare } from "../api/shareApi";
import './NoteEditor.css'
import UserPickerDialog from "./UserPickerDialog";

const NoteEditor = ({ note, isNew, onUpdateNote, onCancel, isReadOnly }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [shareBusy, setShareBusy] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
        }
    }, [note]);

    useEffect(() => {
        const changesExist = (
            title !== (note?.title || '') ||
            content !== (note?.content || '')
        );
        setHasChanges(changesExist);
    }, [title, content, note]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Note title cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            await onUpdateNote({
                ...(note || {}), // Include existing fields if editing
                id: note?.id,    // Include id if it exists
                title: title.trim(),
                content
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
                        readOnly={isReadOnly}
                    />
                </div>

                <div className="formGroup">
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here..."
                        rows={10}
                        readOnly={isReadOnly}
                    />
                </div>

                {!isNew && !isReadOnly && (
                    <div className="formGroup">
                        <button
                            type="button"
                            className="shareBtn"
                            disabled={isSaving || shareBusy}
                            onClick={() => setShowPicker(true)}
                        >
                            Share
                        </button>
                    </div>
                )}

                {showPicker && (
                    <UserPickerDialog
                        onClose={() => setShowPicker(false)}
                        onSelect={async (user, permission) => {
                            if (!note?.id) return;
                            setShareBusy(true);
                            try {
                                await createShare(note.id, user.id, permission);
                                alert(`Shared with ${user.username} (${permission} permission)`);
                            } catch (e) {
                                alert("Failed to share");
                            } finally {
                                setShareBusy(false);
                                setShowPicker(false);
                            }
                        }}
                    />
                )}

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