package com.indyoracle.api.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class SmsServiceTest {

    SmsService smsService;

    @Before
    public void setup() {
        smsService = new SmsService(null);
    }

    @Test
    public void testStripCountryCode_Yes() {
        // Given
        String phoneNumber = "+13175555555";

        // When
        String finalPhoneNumber = smsService.stripCountryCode(phoneNumber);

        // Then
        assertEquals("3175555555", finalPhoneNumber);
    }

    @Test
    public void testStripCountryCode_No() {
        // Given
        String phoneNumber = "3175555555";

        // When
        String finalPhoneNumber = smsService.stripCountryCode(phoneNumber);

        // Then
        assertEquals("3175555555", finalPhoneNumber);
    }

    @Test
    public void testGetTimeAppropriateGreeting_Morning() {
        // Given
        LocalDateTime now = LocalDateTime.of(2019, 01, 01, 6, 0, 0);

        // When
        String msg = smsService.getTimeAppropriateGreeting(now);

        // Then
        assertEquals("Good morning, hero!", msg);
    }

    @Test
    public void testGetTimeAppropriateGreeting_Afternoon() {
        // Given
        LocalDateTime now = LocalDateTime.of(2019, 01, 01, 14, 0, 0);

        // When
        String msg = smsService.getTimeAppropriateGreeting(now);

        // Then
        assertEquals("Good afternoon, hero!", msg);
    }

    @Test
    public void testGetTimeAppropriateGreeting_EarlyEvening() {
        // Given
        LocalDateTime now = LocalDateTime.of(2019, 01, 01, 20, 0, 0);

        // When
        String msg = smsService.getTimeAppropriateGreeting(now);

        // Then
        assertEquals("Good evening, hero!", msg);
    }

    @Test
    public void testGetTimeAppropriateGreeting_LateEvening() {
        // Given
        LocalDateTime now = LocalDateTime.of(2019, 01, 01, 2, 0, 0);

        // When
        String msg = smsService.getTimeAppropriateGreeting(now);

        // Then
        assertEquals("Good evening, hero!", msg);
    }
}
