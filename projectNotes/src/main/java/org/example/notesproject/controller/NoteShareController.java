package org.example.notesproject.controller;

import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.ShareInDTO;
import org.example.notesproject.models.NoteShare;
import org.example.notesproject.service.contracts.NoteShareService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/shares")
@CrossOrigin("http://localhost:5173")
public class NoteShareController {
    private final NoteShareService service;

    public NoteShareController(NoteShareService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<NoteShare> share(@RequestBody @Valid ShareInDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createShare(dto));
    }

    @GetMapping("/confirm/{token}")
    public ResponseEntity<Void> confirm(@PathVariable String token) {
        service.confirm(token);
        URI ui = URI.create("http://localhost:5173/shared/accepted");
        return ResponseEntity.status(HttpStatus.FOUND).location(ui).build();
    }
}
