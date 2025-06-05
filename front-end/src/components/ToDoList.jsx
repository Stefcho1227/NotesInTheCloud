import React, { useState } from "react";
import ToDoItem from "./ToDoItem"

const ToDoList = ({toDos, onToggle, onDelete, onEdit, onReminder}) => {
    return (
        <ul className="toDoList">

            {toDos.length === 0 ? (
                <div className='emptyState'>
                    No to-dos found.
                    Click + to add your first note
                </div>
            ) : (
                toDos.map((toDo) => (
                    <ToDoItem
                        key={toDo.id}
                        toDo={toDo}
                        onToggle={() => onToggle(toDo.id)}
                        onDelete={() => onDelete(toDo.id)}
                        onEdit={() => onEdit(toDo.id)}
                        OnReminder={() => onReminder(toDo.id)}
                    />
                ))
            )}
        </ul>
    );
};
    export default ToDoList;