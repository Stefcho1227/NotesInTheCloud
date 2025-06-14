package org.example.notesproject.repository;

import org.example.notesproject.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByOwner_Id(Integer ownerId);
}
