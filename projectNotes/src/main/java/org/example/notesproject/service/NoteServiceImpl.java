package org.example.notesproject.service;

import org.example.notesproject.dtos.in.NoteInDTO;
import org.example.notesproject.enums.Permission;
import org.example.notesproject.mappers.NoteMapper;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.NoteRepository;
import org.example.notesproject.repository.NoteShareRepository;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final NoteShareRepository noteShareRepository;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, NoteMapper noteMapper, UserRepository userRepository, NoteShareRepository noteShareRepository){
        this.noteRepository = noteRepository;
        this.noteMapper = noteMapper;
        this.userRepository = userRepository;
        this.noteShareRepository = noteShareRepository;
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
    @Transactional
    public Note update(Integer id, NoteInDTO noteInDTO) {
        Integer userId = getCurrentUserId();
        Note noteToUpdate = find(id);
        boolean isOwner = noteToUpdate.getOwner().getId().equals(userId);
        boolean isSharedWithEdit = noteShareRepository
                .findByNoteIdAndSharedWithId(id, userId)
                .map(share -> share.getPerm() == Permission.EDIT)
                .orElse(false);
        if (!isOwner && !isSharedWithEdit) {
            throw new AccessDeniedException("You do not have permission to edit this note");
        }
        noteMapper.updateDto(noteToUpdate, noteInDTO);
        return noteRepository.save(noteToUpdate);
    }

    @Override
    public void delete(Integer id) {
        noteRepository.deleteById(id);
    }

    @Override
    public List<Note> findNoteByUserId(Integer userId) {
        return noteRepository.findByOwner_Id(userId);
    }

    private Integer getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl userDetails) {
            return userDetails.getId();
        }
        throw new RuntimeException("User not authenticated");
    }
}
