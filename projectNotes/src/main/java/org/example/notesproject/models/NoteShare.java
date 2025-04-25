package org.example.notesproject.models;


import jakarta.persistence.*;
import org.example.notesproject.enums.Permission;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "note_shares")
public class NoteShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_with_id")
    private User sharedWith;

    @Enumerated(EnumType.STRING)
    private Permission perm;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    public NoteShare() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public User getSharedWith() {
        return sharedWith;
    }

    public void setSharedWith(User sharedWith) {
        this.sharedWith = sharedWith;
    }

    public Permission getPerm() {
        return perm;
    }

    public void setPerm(Permission perm) {
        this.perm = perm;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
