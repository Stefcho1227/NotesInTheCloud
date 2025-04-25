package org.example.notesproject.dtos.in;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReminderInDTO {
    @NotNull(message = "remindAt is required")
    @FutureOrPresent(message = "remindAt must be in the present or future")
    private LocalDateTime remindAt;

    private Integer todoItemId;

    private Integer creatorId;

    private Boolean isSent;

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public LocalDateTime getRemindAt() {
        return remindAt;
    }

    public void setRemindAt(LocalDateTime remindAt) {
        this.remindAt = remindAt;
    }

    public Boolean getSent() {
        return isSent;
    }

    public void setSent(Boolean sent) {
        isSent = sent;
    }

    public Integer getTodoItemId() {
        return todoItemId;
    }

    public void setTodoItemId(Integer todoItemId) {
        this.todoItemId = todoItemId;
    }
}