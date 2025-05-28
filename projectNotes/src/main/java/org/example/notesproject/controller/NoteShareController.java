package org.example.notesproject.controller;

import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.ShareInDTO;
import org.example.notesproject.models.NoteShare;
import org.example.notesproject.service.contracts.NoteShareService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/shares")
//@CrossOrigin("http://localhost:5173")
public class NoteShareController {
    private final NoteShareService noteShareService;

    public NoteShareController(NoteShareService noteShareService) {
        this.noteShareService = noteShareService;
    }

    @PostMapping
    public ResponseEntity<NoteShare> share(@RequestBody @Valid ShareInDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(noteShareService.createShare(dto));
    }

    @GetMapping("/confirm/{token}")
    public ResponseEntity<Void> confirm(@PathVariable String token) {
        noteShareService.confirm(token);
        URI ui = URI.create("http://localhost:5173/shared/accepted");
        return ResponseEntity.status(HttpStatus.FOUND).location(ui).build();
    }
    @GetMapping("/shared/{userId}")
    public ResponseEntity<List<NoteShare>> sharedWith(@PathVariable Integer userId){
        return ResponseEntity.status(HttpStatus.FOUND).body(noteShareService.sharedToMe(userId));
    }
}
