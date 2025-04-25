package org.example.notesproject.service.contracts;

import org.example.notesproject.dtos.in.NoteInDTO;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.User;

import java.util.List;

public interface NoteService {
    public Note create(NoteInDTO noteInDTO);
    public List<Note> findAll();
    public Note find(Integer id);
    public Note update(Integer id, NoteInDTO userInDTO);
    public void delete(Integer id);
}
