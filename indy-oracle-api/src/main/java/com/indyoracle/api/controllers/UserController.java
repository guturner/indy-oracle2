package com.indyoracle.api.controllers;

import com.indyoracle.api.dtos.User;
import com.indyoracle.api.services.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/1.0/users")
    @ApiOperation("Get all Users, obfuscated by default.")
    @CrossOrigin(origins = { "indy-oracle.com" })
    public ResponseEntity getUsers() {
        return ResponseEntity.ok(userService.getUsers(true));
    }

    @GetMapping("/1.0/users/email/{email}")
    @ApiOperation("Get a single User, by email.")
    @CrossOrigin(origins = { "indy-oracle.com" })
    public ResponseEntity getUserByEmail(@PathVariable String email) {
        User user = userService.findUserByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user);
        }
    }
}
