package org.example.notesproject.repository;

import org.example.notesproject.models.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Integer> {
    List<TodoItem> findTodoItemByCreatorId(Integer userId);

}
