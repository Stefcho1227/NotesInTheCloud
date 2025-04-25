package org.example.notesproject.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.mappers.UserMapper;
import org.example.notesproject.models.User;
import org.example.notesproject.repository.UserRepository;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    @Override
    public User create(UserInDTO userInDTO) {
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
}
