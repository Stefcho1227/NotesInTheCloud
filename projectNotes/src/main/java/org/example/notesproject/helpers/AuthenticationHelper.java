package org.example.notesproject.helpers;

import jakarta.persistence.EntityNotFoundException;
import org.example.notesproject.exception.AuthenticationFailureException;
import org.example.notesproject.models.User;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class AuthenticationHelper {

    private static final String AUTHENTICATION_HEADER = "Authorization";
    private static final String INVALID_AUTHENTICATION_ERROR = "Invalid authentication.";

    private final UserService userService;

    @Autowired
    public AuthenticationHelper(UserService userService) {
        this.userService = userService;
    }

    public User throwIfWrongAuthentication(String username, String password) {
        User user;
        try {
            user = userService.findByUsername(username);
        } catch (EntityNotFoundException e) {
            throw new AuthenticationFailureException("Wrong username or password.");
        }
        String passwordHash = hashPassword(password);
        if (!user.getPasswordHash().equals(passwordHash)) {
            throw new AuthenticationFailureException("Wrong username or password.");
        }
        return user;
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