FROM openjdk:8-jdk-alpine

COPY build/libs/api-0.0.1-SNAPSHOT.jar .
COPY firebase-credentials.json .

ENTRYPOINT ["java","-jar","api-0.0.1-SNAPSHOT.jar"]