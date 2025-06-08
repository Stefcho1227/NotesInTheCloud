import React from "react";
import "./NoteItem.css";

const NoteItem = ({ note, isActive, onSelect, onDelete, isOwn, sharedPermission }) => {
    const formattedDate = note.updatedAt ? new Date(note.updatedAt).toLocaleString() : new Date(note.createdAt).toLocaleString();

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this note?")) {
            onDelete(note.id);
        }
    };

    return (
        <div className={`noteItem ${isActive ? 'active' : ''}`}
             onClick={() => onSelect(note)}>
            <div className="noteItemHeader">
                <h3>
                    {note.title}
                    {!isOwn && (
                        <span className="sharedBadge">
                            • shared ({sharedPermission.toLowerCase()})
                        </span>
                    )}
                </h3>
                {onDelete && (
                    <button className="deleteBtn" onClick={handleDelete}>
                        X
                    </button>
                )}
            </div>

            <p className="notePreview">
                {note.content.length > 50 ? note.content.substring(0, 50) + '...' : note.content}
            </p>
            <p className="noteDate">{formattedDate}</p>
        </div>
    );
};

export default NoteItem;