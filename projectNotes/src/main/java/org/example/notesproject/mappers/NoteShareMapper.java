package org.example.notesproject.mappers;

import org.example.notesproject.dtos.in.ShareInDTO;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.NoteShare;
import org.example.notesproject.models.User;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class NoteShareMapper {
    public NoteShare fromDto(ShareInDTO dto, Note note, User target) {
        NoteShare ns = new NoteShare();
        ns.setNote(note);
        ns.setSharedWith(target);
        ns.setPerm(dto.getPerm());
        ns.setConfirmToken(UUID.randomUUID().toString().replace("-",""));
        ns.setConfirmed(false);
        return ns;
    }

}
