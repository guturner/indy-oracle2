package com.indyoracle.api.services;

import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.ListUsersPage;
import com.indyoracle.api.dtos.User;
import com.indyoracle.api.exceptions.FirebaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final FirebaseAuth firebaseAuth;

    @Autowired
    public UserService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public List<User> getUsers() throws FirebaseException {
        List<User> users = new ArrayList();

        try {
            ListUsersPage page = firebaseAuth.listUsersAsync(null).get();
            while (page != null) {
                for (ExportedUserRecord firebaseUser : page.getValues()) {
                    User user = new User();
                    user.setEmail(firebaseUser.getEmail());
                    user.setPhoneNumber(firebaseUser.getPhoneNumber());

                    users.add(user);
                }
                page = page.getNextPage();
            }

        } catch (Exception ex) {
            LOGGER.error("Failed to retrieve users from Firebase: ", ex);
            throw new FirebaseException("Failed to retrieve users.");
        }

        return users;
    }
}
