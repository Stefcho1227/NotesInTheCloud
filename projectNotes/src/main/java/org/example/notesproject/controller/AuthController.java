package org.example.notesproject.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.exception.AuthenticationFailureException;
import org.example.notesproject.exception.DuplicateEntityException;
import org.example.notesproject.exception.EmailException;
import org.example.notesproject.helpers.AuthenticationHelper;

import org.example.notesproject.models.User;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {
    private final UserService userService;
    private final AuthenticationHelper authenticationHelper;

    @Autowired
    public AuthController(UserService userService, AuthenticationHelper authenticationHelper) {
        this.userService = userService;
        this.authenticationHelper = authenticationHelper;
    }

    @GetMapping("/register")
    public ResponseEntity<?> getRegisterInfo() {
        return ResponseEntity.ok("Please POST your registration details to /api/auth/register");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserInDTO userInDTO, BindingResult bindingResult, HttpSession session) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }

        /*if (!userInDTO.getPassword().equals(userInDTO.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords should match.");
        }*/

        try {
            User createdUser = userService.create(userInDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (DuplicateEntityException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (EmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> getLoginInfo() {
        return ResponseEntity.ok("Please POST your login details to /api/auth/register");
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@Valid @RequestBody UserInDTO userInDTO, BindingResult bindingResult, HttpSession session) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        try{
            User user = authenticationHelper.throwIfWrongAuthentication(userInDTO.getUsername(), userInDTO.getPassword());
            session.setAttribute("currentUser", user);
            session.setAttribute("userId", user.getId());
            return ResponseEntity.ok(user);
        } catch (AuthenticationFailureException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully.");
    }
}

