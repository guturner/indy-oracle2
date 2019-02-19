package com.indyoracle.api.dtos;

public class SmsMessage {

    private String to;
    private String messageSid;
    private String body;
    private boolean responded;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessageSid() {
        return messageSid;
    }

    public void setMessageSid(String messageSid) {
        this.messageSid = messageSid;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public boolean isResponded() {
        return responded;
    }

    public void setResponded(boolean responded) {
        this.responded = responded;
    }

    @Override
    public String toString() {
        return "SmsMessage{" +
                "to='" + to + '\'' +
                ", messageSid='" + messageSid + '\'' +
                ", body='" + body + '\'' +
                ", responded=" + responded +
                '}';
    }
}
