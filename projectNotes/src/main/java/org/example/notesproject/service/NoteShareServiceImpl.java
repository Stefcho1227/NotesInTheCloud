package org.example.notesproject.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.notesproject.dtos.in.ShareInDTO;
import org.example.notesproject.mappers.NoteShareMapper;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.NoteShare;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.NoteRepository;
import org.example.notesproject.repository.NoteShareRepository;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.NoteShareService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteShareServiceImpl implements NoteShareService {
    private final NoteRepository noteRepo;
    private final UserRepository userRepo;
    private final NoteShareRepository shareRepo;
    private final NoteShareMapper mapper;
    private final MailService mailService;

    public NoteShareServiceImpl(NoteRepository noteRepo, UserRepository userRepo, NoteShareRepository shareRepo,
                                NoteShareMapper mapper, MailService mailService) {
        this.noteRepo = noteRepo;
        this.userRepo = userRepo;
        this.shareRepo = shareRepo;
        this.mapper = mapper;
        this.mailService = mailService;
    }

    @Override
    @Transactional
    public NoteShare createShare(ShareInDTO dto) {
        Note note = noteRepo.findById(dto.getNoteId()).orElseThrow(() -> new EntityNotFoundException("note"));
        User sender = note.getOwner();
        User target = userRepo.findById(dto.getTargetUserId()).orElseThrow(() -> new EntityNotFoundException("user"));
        NoteShare ns = mapper.fromDto(dto, note, target);
        shareRepo.save(ns);
        mailService.sendMailForShare(target, ns.getConfirmToken(), note, sender);
        return ns;
    }

    @Override
    @Transactional
    public void confirm(String token) {
        NoteShare ns = shareRepo.findByConfirmToken(token)
                .orElseThrow(() -> new IllegalArgumentException("invalid link"));
        ns.setConfirmed(true);
        shareRepo.save(ns);
        Note note = ns.getNote(); // не ни трябва
        note.setIsPublic(true); // не ни трябва
        note.setPublicSlug(token); //не ни трябва
        noteRepo.save(note); // не ни трябва
    }

    @Override
    public List<NoteShare> sharedToMe(Integer userId) {
        return List.of();
    }
}
