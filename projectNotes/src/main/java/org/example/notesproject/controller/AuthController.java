package org.example.notesproject.controller;


import org.example.notesproject.mappers.UserMapper;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserMapper userMapper;
    private final UserService userService;
    private final AuthenticationHelper authenticationHelper;
}
