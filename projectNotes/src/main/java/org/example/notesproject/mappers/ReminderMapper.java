package org.example.notesproject.mappers;

import org.example.notesproject.dtos.in.NoteInDTO;
import org.example.notesproject.dtos.in.ReminderInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.Reminder;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReminderMapper {

    public Reminder fromDto(ReminderInDTO dto) {
        Reminder reminder = new Reminder();
        reminder.setRemindAt(dto.getRemindAt());
        reminder.setSent(false);
        return reminder;
    }
    public void updateDto(Reminder reminder, ReminderInDTO dto){
        if(reminder.getRemindAt() != null){
            reminder.setRemindAt(dto.getRemindAt());
        }

    }
}