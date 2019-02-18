package com.indyoracle.api.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
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
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final FirebaseAuth firebaseAuth;
    private final Firestore db;

    @Autowired
    public UserService(
            FirebaseAuth firebaseAuth,
            Firestore db) {
        this.firebaseAuth = firebaseAuth;
        this.db = db;
    }

    public List<User> getUsers() throws FirebaseException {
        return getUsers(Boolean.FALSE);
    }

    public List<User> getUsers(boolean obfuscate) throws FirebaseException {
        List<User> users = new ArrayList();

        try {
            ListUsersPage page = firebaseAuth.listUsersAsync(null).get();
            while (page != null) {
                for (ExportedUserRecord firebaseUser : page.getValues()) {
                    User user = findUserByEmail(firebaseUser.getEmail());
                    users.add(obfuscate ? user.obfuscateData() : user);
                }
                page = page.getNextPage();
            }

        } catch (Exception ex) {
            LOGGER.error("Failed to retrieve users from Firebase: ", ex);
            throw new FirebaseException("Failed to retrieve users.");
        }

        return users;
    }

    public User findUserByEmail(String email) {
        return findUserByField("email", email);
    }

    public User findUserByPhoneNumber(String phoneNumber) {
        return findUserByField("phoneNumber", phoneNumber);
    }

    public List<User> getAdmins() {
        return findUsersByField("admin", true);
    }

    public List<User> getVolunteers() {
        return findUsersByField("volunteer", true);
    }

    User findUserByField(String field, Object value) {
        User user = null;

        try {
            ApiFuture<QuerySnapshot> future = db.collection("users").get();
            user = getUserByValue(future, field, value);
        } catch (ExecutionException | InterruptedException ex) {
            LOGGER.error("Failed to retrieve user from Firestore: ", ex);
            throw new FirebaseException("Failed to retrieve user metadata by Field: " + field);
        }

        return user;
    }

    List<User> findUsersByField(String field, Object value) {
        List<User> users = null;

        try {
            ApiFuture<QuerySnapshot> future = db.collection("users").get();
            users = getUsersByValue(future, field, value);
        } catch (ExecutionException | InterruptedException ex) {
            LOGGER.error("Failed to retrieve users from Firestore: ", ex);
            throw new FirebaseException("Failed to retrieve user metadata by Field: " + field);
        }

        return users;
    }

    User getUserByValue(ApiFuture<QuerySnapshot> queryResult, String field, Object value) throws ExecutionException, InterruptedException {
        Optional<QueryDocumentSnapshot> userDocument = queryResult.get().getDocuments()
                .stream()
                .filter(document -> value.equals(document.get(field)))
                .findFirst();

        return userDocument.isPresent() ? userDocument.get().toObject(User.class) : null;
    }

    List<User> getUsersByValue(ApiFuture<QuerySnapshot> queryResult, String field, Object value) throws ExecutionException, InterruptedException {
        return queryResult.get().getDocuments()
                .stream()
                .filter(document -> value.equals(document.get(field)))
                .map(document -> document.toObject(User.class))
                .collect(Collectors.toList());
    }
}
