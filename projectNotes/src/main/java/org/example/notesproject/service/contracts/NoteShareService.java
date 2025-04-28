package org.example.notesproject.service.contracts;

import org.example.notesproject.dtos.in.ShareInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.NoteShare;

import java.util.List;

public interface NoteShareService {
    NoteShare createShare(ShareInDTO dto);
    void confirm(String token);
    List<NoteShare> sharedToMe(Integer userId);

}
