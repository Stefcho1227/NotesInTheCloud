package org.example.notesproject.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.mappers.UserMapper;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.NoteRepository;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final NoteRepository noteRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, NoteRepository noteRepository){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.noteRepository = noteRepository;
    }
    @Override
    public User create(UserInDTO userInDTO) {
        if (userRepository.findByUsername(userInDTO.getUsername()).isPresent()) {
            throw new EntityExistsException("Username already exists");
        }
        if (userRepository.findByEmail(userInDTO.getEmail()).isPresent()) {
            throw new EntityExistsException("Email already exists");
        }
        User createdUser = userMapper.fromDto(userInDTO);
        return userRepository.save(createdUser);
    }
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
    @Override
    public User find(Integer id) {
        return userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User"));
    }
    @Override
    public User update(Integer id, UserInDTO userInDTO) {
        User userToUpdate = find(id);
        userMapper.updateDto(userToUpdate, userInDTO);
        return userRepository.save(userToUpdate);
    }
    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
    @Override
    public User findByUsername(String username) {
        User found = userRepository.findByUsername(username).orElseThrow(()->new EntityNotFoundException("User"));
        found.setLastLoginAt(LocalDateTime.now());
        return found;
    }
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()->new EntityNotFoundException("User"));
    }
}
