package org.example.notesproject.dtos.in;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserInDTO {
    @Email(message = "Email should be in a valid format.")
    @Size(min = 10, max = 60, message = "Email should be between 10 and 60 characters long")
    private String email;

    @Size(min = 2, max = 60, message = "Username should be between 2 and 60 characters long")
    private String username;

    @Size(min = 8, max = 60, message = "Password should be between 8 and 60 characters long")
    private String password;

    /*@NotBlank(message = "Confirm password is required")
    private String confirmPassword;*/

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /*public String getConfirmPassword() { return confirmPassword; }

    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }*/
}
