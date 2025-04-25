package org.example.notesproject.mappers;

import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.dtos.out.UserOutDTO;
import org.example.notesproject.models.User;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class UserMapper {
    public User fromDto(UserInDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPasswordHash(hashPassword(dto.getPassword()));
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
            user.setPasswordHash(hashPassword(dto.getPassword()));
        }
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
