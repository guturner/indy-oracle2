package com.indyoracle.api.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/1.0/user")
    @CrossOrigin(origins = { "indy-oracle-ui-svc:3000", "indy-oracle.com" })
    public String sayHello() {
        return "Hello!";
    }
}
