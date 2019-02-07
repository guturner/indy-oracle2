package com.indyoracle.api.controllers;

import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @PostMapping(value = "/1.0/sms/", produces = MediaType.APPLICATION_XML_VALUE)
    @ApiOperation("Twilio WebHook.")
    public ResponseEntity<String> twilioWebHook() {
        Body body = new Body
                .Builder("Indy Oracle is online.")
                .build();
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
