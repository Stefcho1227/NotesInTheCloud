package org.example.notesproject.controller;


import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.ReminderInDTO;
import org.example.notesproject.models.Reminder;
import org.example.notesproject.service.contracts.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
    private final ReminderService reminderService;
    @Autowired
    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }
    @PostMapping
    public ResponseEntity<Reminder> create(@RequestBody @Valid ReminderInDTO dto) {
        Reminder created = reminderService.create(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @GetMapping
    public List<Reminder> findAll() {
        return reminderService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Reminder> find(@PathVariable Integer id) {
        return ResponseEntity.ok(reminderService.find(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Reminder> update(@PathVariable Integer id, @RequestBody @Valid ReminderInDTO dto) {
        return ResponseEntity.ok(reminderService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        reminderService.delete(id);
    }
}
