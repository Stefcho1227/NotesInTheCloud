package org.example.notesproject.service.contracts;

import org.example.notesproject.models.RefreshToken;
import org.example.notesproject.models.User;

public interface RefreshTokenService {
    RefreshToken create(User user);
    User verify(String token);
    void delete(User user);
    void delete(String token);
}
