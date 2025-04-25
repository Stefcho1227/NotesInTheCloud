package org.example.notesproject.helpers;

import org.apache.catalina.User;
import org.example.notesproject.mappers.UserMapper;
import org.example.notesproject.service.contracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpHeaders;

@Component
public class AuthenticationHelper {

    private static final String AUTHENTICATION_HEADER = "Authorization";
    private static final String INVALID_AUTHENTICATION_ERROR = "Invalid authentication.";

    private final UserService userService;

    @Autowired
    public AuthenticationHelper(UserService userService) {
        this.userService = userService;
    }

    /*public User tryGetUser(HttpHeaders headers) {
        String userInfo = headers.getFirst(AUTHENTICATION_HEADER_NAME);
    }*/
}