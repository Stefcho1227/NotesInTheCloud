package org.example.notesproject.mappers;

import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.dtos.out.UserOutDTO;
import org.example.notesproject.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User fromDto(UserInDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPasswordHash(dto.getPassword());
        return user;
    }
    public void updateDto(User user, UserInDTO dto){
        if(dto.getUsername() != null){
            user.setUsername(dto.getUsername());
        }
        if(dto.getEmail() != null){
            user.setEmail(dto.getEmail());
        }
        if(dto.getPassword() != null){
            user.setPasswordHash(dto.getPassword());
        }
    }
}
