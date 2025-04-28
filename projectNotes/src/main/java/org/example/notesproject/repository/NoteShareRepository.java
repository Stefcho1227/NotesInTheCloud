package org.example.notesproject.repository;

import org.example.notesproject.models.NoteShare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteShareRepository extends JpaRepository<NoteShare, Integer> {
    Optional<NoteShare> findByConfirmToken(String token);
    List<NoteShare> findAllBySharedWithIdAndConfirmedTrue(Integer userId);
}
