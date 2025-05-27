package org.example.notesproject.repository;

import org.example.notesproject.models.RefreshToken;
import org.example.notesproject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Integer> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
    Optional<RefreshToken> findByIdAndExpiryDateAfter(Integer id, LocalDateTime date);
}
