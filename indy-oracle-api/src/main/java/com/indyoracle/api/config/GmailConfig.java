package com.indyoracle.api.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Configuration
public class GmailConfig {
    private static final String APPLICATION_NAME = "The Indy Oracle";

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private static final List<String> SCOPES = Collections.singletonList(GmailScopes.MAIL_GOOGLE_COM);
    private static final String CREDENTIALS_FILE_PATH = "./credentials.json";

    @Bean
    public Gmail gmail() throws Exception {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        return new Gmail.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private static Credential getCredentials(final NetHttpTransport httpTransport) throws IOException {
        return GoogleCredential.fromStream(new FileInputStream(CREDENTIALS_FILE_PATH))
                .createScoped(SCOPES);
    }
}
