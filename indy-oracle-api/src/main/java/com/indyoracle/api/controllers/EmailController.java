package com.indyoracle.api.controllers;

import com.indyoracle.api.config.TwilioConfigProperties;
import com.indyoracle.api.dtos.User;
import com.indyoracle.api.services.UserService;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class EmailController {
    private final Logger LOGGER = LoggerFactory.getLogger(EmailController.class);

    private final TwilioConfigProperties twilioConfigProperties;
    private final UserService userService;

    @Autowired
    public EmailController(
            TwilioConfigProperties twilioConfigProperties,
            UserService userService) {
        this.twilioConfigProperties = twilioConfigProperties;
        this.userService = userService;
    }

    @PostMapping(value = "/1.0/sms/", produces = MediaType.APPLICATION_XML_VALUE)
    @ApiOperation("Twilio WebHook.")
    public ResponseEntity<String> twilioWebHook(
            @RequestParam("From") String from,
            @RequestParam("Body") String requestBody,
            @RequestParam("AccountSid") String accountSid) {
        if (!twilioConfigProperties.getSid().equals(accountSid)) {
            LOGGER.warn("Unknown Entity: {} attempted to post Body: {}.", from, requestBody);
            return ResponseEntity.badRequest().body("Naughty, naughty... The Oracle is watching.");
        }

        Optional<User> user = userService.getUsers().stream()
                .filter(u -> from.equals(u.getPhoneNumber()))
                .findFirst();

        Body body;
        if (user.isPresent()) {
            body = new Body
                    .Builder("Indy Oracle is online.")
                    .build();
        } else {
            body = new Body
                    .Builder("Hello, citizen!\nIndy Oracle is expanding. Find out more at https://indy-oracle.com/\nIf this is an emergency, please dial 911.")
                    .build();
        }

        Message sms = new Message
                .Builder()
                .body(body)
                .build();
        MessagingResponse twiml = new MessagingResponse
                .Builder()
                .message(sms)
                .build();
        return ResponseEntity.ok(twiml.toXml());
    }
}
