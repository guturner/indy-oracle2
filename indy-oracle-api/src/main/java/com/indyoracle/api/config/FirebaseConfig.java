package com.indyoracle.api.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    private static final Logger LOGGER = LoggerFactory.getLogger(FirebaseConfig.class);

    @Autowired
    FirebaseConfigProperties firebaseConfigProperties;

    @Bean
    public FirebaseAuth firebaseAuth() {

        try {
            FileInputStream serviceAccount = new FileInputStream("./firebase-credentials.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(firebaseConfigProperties.getDatabaseUrl())
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (IOException ex) {
            LOGGER.error("Could not create FirebaseAuth bean: ", ex);
        }

        return FirebaseAuth.getInstance();
    }
}
