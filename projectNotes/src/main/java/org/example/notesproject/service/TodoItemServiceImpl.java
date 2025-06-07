package org.example.notesproject.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.notesproject.dtos.in.TodoItemInDTO;
import org.example.notesproject.mappers.TodoItemMapper;
import org.example.notesproject.models.TodoItem;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.ReminderRepository;
import org.example.notesproject.repository.TodoItemRepository;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TodoItemServiceImpl implements TodoItemService {
    private final TodoItemMapper todoItemMapper;
    private final TodoItemRepository todoItemRepository;
    private final UserRepository userRepository;
    private final ReminderRepository reminderRepository;
    @Autowired
    TodoItemServiceImpl(TodoItemRepository todoItemRepository, TodoItemMapper todoItemMapper,
                        UserRepository userRepository, ReminderRepository reminderRepository){
        this.todoItemRepository = todoItemRepository;
        this.todoItemMapper = todoItemMapper;
        this.userRepository = userRepository;
        this.reminderRepository = reminderRepository;
    }
    @Override
    public TodoItem create(TodoItemInDTO todoItemInDTO) {
        TodoItem item = todoItemMapper.fromDto(todoItemInDTO);
        if (todoItemInDTO.getOwnerId() == null) {
            throw new IllegalArgumentException("Todo item must have an ownerId");
        }
        User creator = userRepository.findById(todoItemInDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        item.setCreator(creator);
        item.setReminder(null);
        return todoItemRepository.save(item);
    }

    @Override
    public List<TodoItem> findAll() {
        return todoItemRepository.findAll();
    }

    @Override
    public TodoItem find(Integer id) {
        return todoItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TodoItem not found"));
    }

    @Override
    @Transactional
    public TodoItem update(Integer id, TodoItemInDTO todoItemInDTO) {
        TodoItem item = find(id);
        boolean beforeDone = Boolean.TRUE.equals(item.getDone());
        todoItemMapper.updateDto(item, todoItemInDTO);
        boolean afterDone = Boolean.TRUE.equals(item.getDone());
        if(!beforeDone && afterDone && item.getReminder() != null){
            reminderRepository.delete(item.getReminder());
            item.setReminder(null);
        }
        return todoItemRepository.save(item);
    }

    @Override
    public void delete(Integer id) {
        todoItemRepository.deleteById(id);
    }

    @Override
    public List<TodoItem> findTodosByUserId(Integer userId) {
        return todoItemRepository.findTodoItemByCreatorId(userId);
    }
}
