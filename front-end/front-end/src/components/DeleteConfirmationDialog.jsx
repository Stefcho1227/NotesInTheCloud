import React, { useEffect } from 'react';
import { useState } from 'react';

const DeleteConfirmationDialog = ({
    isOpen,
    onConfirm,
    onCancel,
    noteTitle
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onCancel]);

if (!isOpen) return null;

    return (
        <div className='dialogOverlay'>
            <section className='dialogContent'>
                <h3>Delete note</h3>
                <p>Are you sure you want to delete note "{noteTitle}"?</p>
                <div className='dialogButtons'>
                    <button className='cancelBtn'
                    onClick={onCancel}>
                        Cancel
                    </button>
                    <button className='confirmBtn'
                    onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </section>
        </div>
    );
};

export default DeleteConfirmationDialog;