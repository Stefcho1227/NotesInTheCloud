package org.example.notesproject.controller;

import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.TodoItemInDTO;
import org.example.notesproject.models.TodoItem;
import org.example.notesproject.service.TodoItemServiceImpl;
import org.example.notesproject.service.contracts.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todoItems")
public class TodoItemController {
    private final TodoItemService todoItemService;
    @Autowired
    public TodoItemController(TodoItemService todoItemService) {
        this.todoItemService = todoItemService;
    }
    @PostMapping
    public ResponseEntity<TodoItem> create(@RequestBody @Valid TodoItemInDTO dto) {
        TodoItem created = todoItemService.create(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @GetMapping
    public List<TodoItem> findAll() {
        return todoItemService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<TodoItem> find(@PathVariable Integer id) {
        return ResponseEntity.ok(todoItemService.find(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> update(@PathVariable Integer id, @RequestBody @Valid TodoItemInDTO dto) {
        return ResponseEntity.ok(todoItemService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        todoItemService.delete(id);
    }
}
