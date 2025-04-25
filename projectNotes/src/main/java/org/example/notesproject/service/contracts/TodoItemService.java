package org.example.notesproject.service.contracts;

import org.example.notesproject.dtos.in.TodoItemInDTO;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.models.TodoItem;
import org.example.notesproject.models.User;

import java.util.List;

public interface TodoItemService {
    public TodoItem create(TodoItemInDTO todoItemInDTO);
    public List<TodoItem> findAll();
    public TodoItem find(Integer id);
    public TodoItem update(Integer id, TodoItemInDTO todoItemInDTO);
    public void delete(Integer id);
}
