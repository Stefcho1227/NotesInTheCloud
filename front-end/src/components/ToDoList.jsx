import React from "react";
import ToDoItem from "./ToDoItem"
import './TodoList.css'

const ToDoList = ({toDos, onDelete, onEdit}) => {
    return (
        <div className="toDoListContainer">
            <ul className="toDoList">
                {toDos.length === 0 ? (
                    <div className='emptyState'>
                        No to-dos found.
                        Click + to add your first todo
                    </div>
                ) : (
                    toDos.map((toDo) => (
                        <ToDoItem
                            key={toDo.id}
                            toDo={toDo}
                            onDelete={() => onDelete(toDo.id)}
                            onEdit={() => onEdit(toDo.id)}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default ToDoList;