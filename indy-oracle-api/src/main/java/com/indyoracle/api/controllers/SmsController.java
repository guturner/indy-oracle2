package com.indyoracle.api.controllers;

import com.indyoracle.api.config.TwilioConfigProperties;
import com.indyoracle.api.dtos.User;
import com.indyoracle.api.services.SmsService;
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

@RestController
public class SmsController {
    private final Logger LOGGER = LoggerFactory.getLogger(SmsController.class);

    private final TwilioConfigProperties twilioConfigProperties;
    private final SmsService smsService;
    private final UserService userService;

    @Autowired
    public SmsController(
            TwilioConfigProperties twilioConfigProperties,
            SmsService smsService,
            UserService userService) {
        this.twilioConfigProperties = twilioConfigProperties;
        this.smsService = smsService;
        this.userService = userService;
    }

    @PostMapping(value = "/1.0/sms/", produces = MediaType.APPLICATION_XML_VALUE)
    @ApiOperation("Twilio response WebHook.")
    public ResponseEntity<String> twilioResponseWebHook(
            @RequestParam("From") String from,
            @RequestParam("Body") String requestBody,
            @RequestParam("AccountSid") String accountSid) {
        if (!twilioConfigProperties.getSid().equals(accountSid)) {
            LOGGER.warn("Unknown Entity: {} attempted to post Body: {}.", from, requestBody);
            return ResponseEntity.badRequest().body("Naughty, naughty... The Oracle is watching.");
        }

        String phoneNumber = smsService.stripCountryCode(from);
        User user = userService.findUserByPhoneNumber(phoneNumber);

        Body body;
        if (user != null) {
            smsService.contactVolunteers(user);

            body = new Body
                    .Builder("Sit tight, citizen!\nIndy Oracle is finding a volunteer in your area.\nIf this is an emergency, please dial 911.")
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

    @PostMapping(value = "/1.0/sms/results/", produces = MediaType.APPLICATION_XML_VALUE)
    @ApiOperation("Twilio callback WebHook.")
    public ResponseEntity twilioCallbackWebHook(
            @RequestParam("From") String from,
            @RequestParam("MessageStatus") String messageStatus,
            @RequestParam("AccountSid") String accountSid) {
        if (!twilioConfigProperties.getSid().equals(accountSid)) {
            LOGGER.warn("Unknown Entity: {} attempted to post.", from);
            return ResponseEntity.badRequest().body("Naughty, naughty... The Oracle is watching.");
        }

        String phoneNumber = smsService.stripCountryCode(from);
        User user = userService.findUserByPhoneNumber(phoneNumber);

        if (user != null) {

            switch (messageStatus) {
                case "sent":
                case "delivered":
                    smsService.informRequestSucceeded(user);
                    break;
                case "failed":
                case "undelivered":
                    smsService.informRequestFailed(user);
                    break;
            }

        } else {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
}
