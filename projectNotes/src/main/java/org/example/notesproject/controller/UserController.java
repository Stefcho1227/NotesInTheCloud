package org.example.notesproject.controller;
import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.User;
import org.example.notesproject.service.contracts.NoteService;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final NoteService noteService;

    @Autowired
    public UserController(UserService userService, NoteService noteService) {
        this.userService = userService;
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody @Valid UserInDTO dto) {
        User created = userService.create(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }
    @GetMapping("/{userId}/notes")
    public List<Note> findAllNotesByUserId(@PathVariable Integer userId) {
        return noteService.findNoteByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> find(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.find(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id,
                                       @RequestBody @Valid UserInDTO dto) {
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }
}
