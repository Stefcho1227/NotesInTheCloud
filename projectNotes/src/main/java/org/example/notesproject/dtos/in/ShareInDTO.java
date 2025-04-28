package org.example.notesproject.dtos.in;

import jakarta.validation.constraints.NotNull;
import org.example.notesproject.enums.Permission;

public class ShareInDTO {
    @NotNull
    private Integer noteId;
    @NotNull
    private Integer targetUserId;
    @NotNull
    private Permission perm;

    public ShareInDTO() {
    }

    public Integer getNoteId() {
        return noteId;
    }

    public void setNoteId(Integer noteId) {
        this.noteId = noteId;
    }

    public Integer getTargetUserId() {
        return targetUserId;
    }

    public void setTargetUserId(Integer targetUserId) {
        this.targetUserId = targetUserId;
    }

    public Permission getPerm() {
        return perm;
    }

    public void setPerm(Permission perm) {
        this.perm = perm;
    }
}