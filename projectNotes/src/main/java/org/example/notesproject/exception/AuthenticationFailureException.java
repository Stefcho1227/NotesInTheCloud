package org.example.notesproject.exception;

public class AuthenticationFailureException extends RuntimeException {
    public AuthenticationFailureException(String message) {
        super(message);
    }
}
