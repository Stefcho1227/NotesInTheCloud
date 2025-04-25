package org.example.notesproject.dtos.in;

import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class TodoItemInDTO {
    @Size(min = 2, max = 80, message = "Text should be between 2 and 80 characters long")
    private String text;
    private Boolean isDone;
    private Integer ownerId;

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }
}
