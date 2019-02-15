package com.indyoracle.api.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class SmsServiceTest {

    SmsService smsService;

    @Before
    public void setup() {
        smsService = new SmsService();
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
}
