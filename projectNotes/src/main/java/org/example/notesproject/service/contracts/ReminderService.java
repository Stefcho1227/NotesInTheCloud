package org.example.notesproject.service.contracts;

import org.example.notesproject.dtos.in.ReminderInDTO;
import org.example.notesproject.models.Reminder;

import java.util.List;

public interface ReminderService {
    Reminder create(ReminderInDTO dto);
    Reminder update(Integer id, ReminderInDTO dto);
    Reminder find(Integer id);
    List<Reminder> findAll();
    void delete(Integer id);
}