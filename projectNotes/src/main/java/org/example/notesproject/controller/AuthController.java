/*
package org.example.notesproject.controller;


import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.example.notesproject.dtos.in.UserInDTO;
import org.example.notesproject.helpers.AuthenticationHelper;
import org.example.notesproject.mappers.UserMapper;
import org.example.notesproject.models.User;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserMapper userMapper;
    private final UserService userService;
    private final AuthenticationHelper authenticationHelper;

    @Autowired
    public AuthController(UserMapper userMapper, UserService userService, AuthenticationHelper authenticationHelper) {
        this.userMapper = userMapper;
        this.userService = userService;
        this.authenticationHelper = authenticationHelper;
    }

    @GetMapping("/register")
    public ResponseEntity<?> getRegisterInfo() {
        return ResponseEntity.ok("Please POST your registration details to ");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserInDTO userInDTO, BindingResult bindingResult, HttpSession session) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords should match.");
        }

        try {
            userService.create(userInDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(userInDTO);
        }catch () {

        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> getLoginInfo() {
        return ResponseEntity.ok("Please POST your login details to ");
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@Valid @RequestBody UserInDTO userInDTO, BindingResult bindingResult, HttpSession session) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        try{
            User user = authenticationHelper.
        }
    }

}
*/
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//    private final UserMapper userMapper;
//    private final UserService userService;
//    private final AuthenticationHelper authenticationHelper;
//}
