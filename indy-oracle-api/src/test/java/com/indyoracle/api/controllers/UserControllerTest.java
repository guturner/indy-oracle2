package com.indyoracle.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.ListUsersPage;
import com.indyoracle.api.dtos.User;
import com.indyoracle.api.services.UserService;
import org.assertj.core.util.Lists;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(JUnit4.class)
public class UserControllerTest {

    MockMvc mockMvc;

    ObjectReader userObjectReader;

    ObjectReader usersObjectReader;

    UserService userService;

    @Mock
    FirebaseAuth firebaseAuth;

    @Mock
    Firestore db;

    UserController userController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        userObjectReader = new ObjectMapper().readerFor(User.class);

        usersObjectReader = new ObjectMapper().readerFor(User[].class);

        userService = new UserService(firebaseAuth, db);

        userController = new UserController(userService);

        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
    }

    @Test
    public void testGetUsersObfuscated() throws Exception {
        // Given
        ListUsersPage mockListUsersPage = mock(ListUsersPage.class);
        ExportedUserRecord userRecord1 = mock(ExportedUserRecord.class);
        ExportedUserRecord userRecord2 = mock(ExportedUserRecord.class);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/1.0/users/obfuscate");

        // When
        mockFirebaseLookup(mockListUsersPage, userRecord1, userRecord2);

        MvcResult result = mockMvc
                .perform(requestBuilder)
                // Then
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        User[] serviceResponse = usersObjectReader.readValue(result.getResponse().getContentAsString());

        assertEquals(2, serviceResponse.length);
        for (User user : serviceResponse) {
            assertTrue(user.getEmail().endsWith("********"));
            assertTrue(user.getPhoneNumber().endsWith("********"));
        }
    }

    @Test
    public void testGetUsers() throws Exception {
        // Given
        ListUsersPage mockListUsersPage = mock(ListUsersPage.class);
        ExportedUserRecord userRecord1 = mock(ExportedUserRecord.class);
        ExportedUserRecord userRecord2 = mock(ExportedUserRecord.class);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/1.0/users/");

        // When
        mockFirebaseLookup(mockListUsersPage, userRecord1, userRecord2);

        MvcResult result = mockMvc
                .perform(requestBuilder)
                // Then
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        User[] serviceResponse = usersObjectReader.readValue(result.getResponse().getContentAsString());

        assertEquals(2, serviceResponse.length);
        for (User user : serviceResponse) {
            assertTrue(user.getEmail().endsWith("@test.com"));
            assertEquals("1234567890", user.getPhoneNumber());
        }
    }

    @Test
    public void testGetVolunteers() throws Exception {
        // Given
        ListUsersPage mockListUsersPage = mock(ListUsersPage.class);
        ExportedUserRecord userRecord1 = mock(ExportedUserRecord.class);
        ExportedUserRecord userRecord2 = mock(ExportedUserRecord.class);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/1.0/volunteers/");

        // When
        mockFirebaseLookup(mockListUsersPage, userRecord1, userRecord2);

        MvcResult result = mockMvc
                .perform(requestBuilder)
                // Then
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        User[] serviceResponse = usersObjectReader.readValue(result.getResponse().getContentAsString());

        assertEquals(1, serviceResponse.length);
        assertFalse(serviceResponse[0].isAdmin());
    }

    @Test
    public void testGetAdmins() throws Exception {
        // Given
        ListUsersPage mockListUsersPage = mock(ListUsersPage.class);
        ExportedUserRecord userRecord1 = mock(ExportedUserRecord.class);
        ExportedUserRecord userRecord2 = mock(ExportedUserRecord.class);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/1.0/admins/");

        // When
        mockFirebaseLookup(mockListUsersPage, userRecord1, userRecord2);

        MvcResult result = mockMvc
                .perform(requestBuilder)
                // Then
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        User[] serviceResponse = usersObjectReader.readValue(result.getResponse().getContentAsString());

        assertEquals(1, serviceResponse.length);
        assertFalse(serviceResponse[0].isVolunteer());
    }

    /** Helpers **/
    private void mockFirebaseLookup(ListUsersPage mockListUsersPage, ExportedUserRecord ...users) throws Exception {
        ApiFuture mockFirebaseFuture = mock(ApiFuture.class);

        when(firebaseAuth.listUsersAsync(null)).thenReturn(mockFirebaseFuture);
        when(mockFirebaseFuture.get()).thenReturn(mockListUsersPage);
        when(mockListUsersPage.getValues()).thenReturn(Lists.list(users));
        when(mockListUsersPage.getNextPage()).thenReturn(null); // simulates 1 page

        for (int i = 0; i < users.length; i++) {
            String email = String.format("user%s@test.com", i + 1);
            when(users[i].getEmail()).thenReturn(email);
        }

        CollectionReference mockCollectionReference = mock(CollectionReference.class);
        ApiFuture mockFirestoreFuture = mock(ApiFuture.class);
        QuerySnapshot mockQuerySnapshot = mock(QuerySnapshot.class);

        List<QueryDocumentSnapshot> documents = new ArrayList();

        for (int i = 0; i < users.length; i++) {
            String email = String.format("user%s@test.com", i + 1);

            User user = new User();
            user.setEmail(email);
            user.setPhoneNumber("1234567890");

            if (i % 2 == 0) {
                user.setAdmin(true);
            } else {
                user.setVolunteer(true);
            }

            QueryDocumentSnapshot document = mock(QueryDocumentSnapshot.class);
            when(document.get("email")).thenReturn(email);
            when(document.get("admin")).thenReturn(user.isAdmin());
            when(document.get("volunteer")).thenReturn(user.isVolunteer());
            when(document.toObject(User.class)).thenReturn(user);
            documents.add(document);
        }

        when(db.collection("users")).thenReturn(mockCollectionReference);
        when(mockCollectionReference.get()).thenReturn(mockFirestoreFuture);
        when(mockFirestoreFuture.get()).thenReturn(mockQuerySnapshot);
        when(mockQuerySnapshot.getDocuments()).thenReturn(documents);
    }
}
