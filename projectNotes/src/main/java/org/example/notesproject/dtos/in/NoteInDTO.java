package org.example.notesproject.dtos.in;

import jakarta.validation.constraints.Size;

public class NoteInDTO {
    @Size(min = 1, max = 60, message = "Title should be between 1 and 60 characters long")
    private String title;
    private String content;
    private Boolean isPublic;
    private Integer ownerId;

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }
}
