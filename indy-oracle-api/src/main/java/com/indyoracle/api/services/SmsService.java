package com.indyoracle.api.services;

import org.springframework.stereotype.Service;

@Service
public class SmsService {

    public String stripCountryCode(String phoneNumber) {
        if (phoneNumber.length() == 10) {
            return phoneNumber;
        }

        return phoneNumber.replaceAll("^\\+\\d", "");
    }
}
