package org.example.notesproject.service;

import org.example.notesproject.dtos.in.NoteInDTO;
import org.example.notesproject.mappers.NoteMapper;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.NoteRepository;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final NoteMapper noteMapper;
    private static final String BASE_URL = "api/notes/";
    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, NoteMapper noteMapper, UserRepository userRepository){
        this.noteRepository = noteRepository;
        this.noteMapper = noteMapper;
        this.userRepository = userRepository;
    }
    @Override
    public Note create(NoteInDTO noteInDTO) {
        Note createdNote = noteMapper.fromDto(noteInDTO);
        if (noteInDTO.getOwnerId() == null) {
            throw new IllegalArgumentException("Note must have an ownerId");
        }
        User owner = userRepository.findById(noteInDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        createdNote.setOwner(owner);
        Note savedNote = noteRepository.save(createdNote);
        if(savedNote.getIsPublic()){
            String secureSlug = generateSecureSlug(savedNote.getId());
            savedNote.setPublicSlug(BASE_URL + "{"+secureSlug+"}");
            return noteRepository.save(savedNote);
        }
        return savedNote;
    }

    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    @Override
    public Note find(Integer id) {
        return noteRepository.findById(id).orElseThrow(()->new RuntimeException("Note"));
    }

    @Override
    public Note update(Integer id, NoteInDTO noteInDTO) {
        Note noteToUpdate = find(id);
        Boolean wasPublic = noteToUpdate.getIsPublic();
        noteMapper.updateDto(noteToUpdate, noteInDTO);
        if (Boolean.TRUE.equals(noteInDTO.getIsPublic()) && !Boolean.TRUE.equals(wasPublic)) {
            String secureSlug = generateSecureSlug(id);
            noteToUpdate.setPublicSlug(BASE_URL + "{" + secureSlug + "}");
        } else if (!Boolean.TRUE.equals(noteInDTO.getIsPublic()) && Boolean.TRUE.equals(wasPublic)) {
            noteToUpdate.setPublicSlug(null);
        }
        return noteRepository.save(noteToUpdate);
    }

    @Override
    public void delete(Integer id) {
        noteRepository.deleteById(id);
    }
    private String generateSecureSlug(Integer noteId) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String input = noteId.toString();
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash).substring(0, 16);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating secure slug", e);
        }
    }
}
