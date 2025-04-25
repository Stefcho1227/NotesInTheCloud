import React from "react";


const NoteItem = ({note, isActive, onSelect, onDelete}) => {
    const formattedDate = new Date(note.lastModified).toLocaleString();

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(note.id);
    };

    return (
        <div className={`noteItem ${isActive ? 'active': ''} `}
        onClick={() => onSelect(note)}>
            <div className="noteItemHeader">
                <h3>{note.title}</h3>
                <button className="deleteBtn" onClick={handleDelete}>
                    X
                </button>
            </div>

            <p className="notePreview">
                {note.content.length > 50 ? note.content.substring(0,50) + '...' : note.content}
            </p>
            <p className="noteDate">{formattedDate}</p>
        </div>
    );
};

export default NoteItem;