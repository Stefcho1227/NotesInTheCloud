package org.example.notesproject.service.contracts;

import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.models.User;

import java.util.List;

public interface UserService {
    public User create(UserInDTO userInDTO);
    public List<User> findAll();
    public User find(Integer id);
    public User update(Integer id, UserInDTO userInDTO);
    public void delete(Integer id);
}
