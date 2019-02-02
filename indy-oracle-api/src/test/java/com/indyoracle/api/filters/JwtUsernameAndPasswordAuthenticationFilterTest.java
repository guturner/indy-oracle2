package com.indyoracle.api.filters;

import com.indyoracle.api.config.JwtConfigProperties;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class JwtUsernameAndPasswordAuthenticationFilterTest {

    JwtConfigProperties jwtConfigProperties;
    JwtUsernameAndPasswordAuthenticationFilter filter;

    @Before
    public void setup() {
        jwtConfigProperties = new JwtConfigProperties();
        jwtConfigProperties.setUrl("/auth/");

        filter = new JwtUsernameAndPasswordAuthenticationFilter(null, jwtConfigProperties);
    }

    @Test
    public void testGetRawCredentials() {
        // Given
        String rawCredentialString = "username:password1234";
        byte[] encodedAuthHeader = Base64.getEncoder().encode(rawCredentialString.getBytes());
        String encodedAuthString = new String(encodedAuthHeader, StandardCharsets.UTF_8);

        // When
        String[] creds = filter.getRawCredentials(encodedAuthString);

        // Then
        assertEquals(2, creds.length);
        assertEquals("username", creds[0]);
        assertEquals("password1234", creds[1]);
    }
}
