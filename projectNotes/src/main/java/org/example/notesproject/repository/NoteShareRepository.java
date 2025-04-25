package org.example.notesproject.repository;

import org.example.notesproject.models.NoteShare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteShareRepository extends JpaRepository<NoteShare, Integer> {
}
