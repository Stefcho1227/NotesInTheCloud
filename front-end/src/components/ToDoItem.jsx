import React from "react";

const ToDoItem = ({toDo, onToggle, onDelete, onEdit, onReminder}) => {
    const formattedDate = toDo.updatedAt
        ? new Date(toDo.updatedAt).toLocaleString()
        : toDo.reminder
        ? new Date(toDo.reminder).toLocaleString()
        : '';

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(toDo.id);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(toDo.id);
    };

    const handleReminder = (e) => {
        e.stopPropagation();
        onReminder(toDo.id);
    };

    return (
        <div className={`toDoItem ${toDo.completed ? 'completed': ''} `}
             onClick={handleEdit}>
            <div className="toDoItemHeader">
                <label>
                    <input
                        type='checkbox'
                        checked={toDo.completed}
                        onChange={() => onToggle(toDo.id)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className='toDoTitle'>{toDo.text || 'Untitled To-do'}</span>
                </label>

                <div className='toDoActions'>
                    <button className="reminderBtn" onClick={handleReminder}>Reminder</button>
                    <button className="deleteBtn" onClick={handleDelete}>X</button>
                </div>
            </div>

            {formattedDate && <p className="noteDate">{formattedDate}</p>}

        </div>
    );
};

export default ToDoItem;