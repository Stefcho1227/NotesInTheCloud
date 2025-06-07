import React from "react";
import "./ToDoList.css";

const ToDoItem = ({toDo, onDelete, onEdit}) => {
    const formattedDate = toDo.updatedAt
        ? new Date(toDo.updatedAt).toLocaleString()
        : toDo.reminder?.remindAt
            ? new Date(toDo.reminder.remindAt).toLocaleString()
            : '';

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(toDo.id);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(toDo.id);
    };

    return (
        <div className={`toDoItem ${toDo.done ? 'completed': ''}`}
             onClick={handleEdit}>
            <div className="toDoItemHeader">
                <span className='toDoTitle'>{toDo.text || 'Untitled To-do'}</span>
                <div className='toDoActions'>
                    <button className="deleteBtn" onClick={handleDelete}>X</button>
                </div>
            </div>

            {formattedDate && <p className="noteDate">{formattedDate}</p>}
            {toDo.done && <p className="completedStatus">Completed</p>}
            {toDo.reminder?.remindAt && (
                <p className="reminderStatus">
                    Reminder: {new Date(toDo.reminder.remindAt).toLocaleString()}
                </p>
            )}
        </div>
    );
};

export default ToDoItem;