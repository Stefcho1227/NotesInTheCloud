package org.example.notesproject.controller;

import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.NoteInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.service.contracts.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<Note> create(@RequestBody @Valid NoteInDTO dto) {
        Note created = noteService.create(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Note> findAll() {
        return noteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> find(@PathVariable Integer id) {
        return ResponseEntity.ok(noteService.find(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable Integer id,
                                       @RequestBody @Valid NoteInDTO dto) {
        return ResponseEntity.ok(noteService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        noteService.delete(id);
    }

    /* ---------- (Optional) Access via public slug ---------- */
    // If you later add noteService.findBySlug(String slug), expose it like this:
    // @GetMapping("/public/{slug}")
    // public ResponseEntity<Note> findBySlug(@PathVariable String slug) {
    //     return ResponseEntity.ok(noteService.findBySlug(slug));
    // }
}
