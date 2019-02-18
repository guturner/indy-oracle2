package com.indyoracle.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "security.twilio")
public class TwilioConfigProperties {

    private String url;
    private String callback;
    private String sid;
    private String authToken;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCallback() {
        return callback;
    }

    public void setCallback(String callback) {
        this.callback = callback;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    @Override
    public String toString() {
        return "TwilioConfigProperties{" +
                "url='" + url + '\'' +
                ", callback='" + callback + '\'' +
                ", sid='" + sid + '\'' +
                ", authToken='" + authToken + '\'' +
                '}';
    }
}
