package com.indyoracle.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "security.firebase")
public class FirebaseConfigProperties {

    private String databaseUrl;

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    public void setDatabaseUrl(String databaseUrl) {
        this.databaseUrl = databaseUrl;
    }

    @Override
    public String toString() {
        return "FirebaseConfigProperties{" +
                "databaseUrl='" + databaseUrl + '\'' +
                '}';
    }
}
