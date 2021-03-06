package com.indyoracle.api.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.indyoracle.api.config.TwilioConfigProperties;
import com.indyoracle.api.dtos.SmsMessage;
import com.indyoracle.api.dtos.User;
import com.indyoracle.api.exceptions.FirebaseException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class SmsService {
    private final Logger LOGGER = LoggerFactory.getLogger(SmsService.class);

    private final String INDY_ORACLE_PHONE = "+13175976725";
    private final String TWILIO_CALLBACK_URL = "https://indy-oracle.com/api/1.0/sms/results/";

    private final String MORNING_GREETING = "Good morning, hero!";
    private final String AFTERNOON_GREETING = "Good afternoon, hero!";
    private final String EVENING_GREETING = "Good evening, hero!";

    private final TwilioConfigProperties twilioConfigProperties;
    private final UserService userService;
    private final Firestore db;

    @Autowired
    public SmsService(
            TwilioConfigProperties twilioConfigProperties,
            UserService userService,
            Firestore db) {
        this.twilioConfigProperties = twilioConfigProperties;
        this.userService = userService;
        this.db = db;

        if (twilioConfigProperties != null) {
            Twilio.init(twilioConfigProperties.getSid(), twilioConfigProperties.getAuthToken());
        }
    }

    public String stripCountryCode(String phoneNumber) {
        if (phoneNumber.length() == 10) {
            return phoneNumber;
        }

        return phoneNumber.replaceAll("^\\+\\d", "");
    }

    public List<Message> contactVolunteers(User from) {
        List<User> volunteers = userService.getVolunteers();

        List<Message> result = new ArrayList();
        for (User volunteer : volunteers) {
            result.add(sendRequestForHelp(from, volunteer));
        }
        return result;
    }

    public Message informRequestFailed(User to) {
        String body = String.format("Unfortunately we were unable to deliver your request.\nIf this is an emergency, please dial 911.");

        return Message.creator(new PhoneNumber("+1" + to.getPhoneNumber()),  new PhoneNumber(INDY_ORACLE_PHONE), body)
                .create();
    }

    Message sendRequestForHelp(User from, User to) {
        String greeting = getTimeAppropriateGreeting(LocalDateTime.now(ZoneId.of("America/Indianapolis")));
        String body = String.format("%s\nA citizen is in need of help!\nPlease contact %s as soon as possible to provide assistance.\nThank you!", greeting, from.getPhoneNumber());

        return Message.creator(new PhoneNumber("+1" + to.getPhoneNumber()),  new PhoneNumber(INDY_ORACLE_PHONE), body)
                .setStatusCallback(URI.create(TWILIO_CALLBACK_URL))
                .create();
    }

    String getTimeAppropriateGreeting(LocalDateTime time) {
        int hour = time.getHour();

        if (hour < 5) {
            return EVENING_GREETING;
        } else if (hour < 12) {
            return MORNING_GREETING;
        } else if (hour < 18) {
            return AFTERNOON_GREETING;
        } else {
            return EVENING_GREETING;
        }
    }

    public void logMessage(SmsMessage message) {
        DocumentReference messageDocument = db.collection("messages").document(message.getMessageSid());
        messageDocument.set(message);
    }

    public SmsMessage getSmsMessageByMessageSid(String messageSid) {
        DocumentReference messageDocument = db.collection("messages").document(messageSid);

        ApiFuture<DocumentSnapshot> future = messageDocument.get();

        try {
            DocumentSnapshot document = future.get();
            if (document.exists()) {
                return document.toObject(SmsMessage.class);
            } else {
                return null;
            }
        } catch (ExecutionException | InterruptedException ex) {
            LOGGER.error("Failed to retrieve messages from Firestore: ", ex);
            throw new FirebaseException("Failed to retrieve message by messageId: " + messageSid);
        }
    }
}
