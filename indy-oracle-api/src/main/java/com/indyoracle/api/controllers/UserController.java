package com.indyoracle.api.controllers;

import com.indyoracle.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/1.0/users")
    @CrossOrigin(origins = { "indy-oracle.com" })
    public ResponseEntity getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }
}
