package com.indyoracle.api.dtos;

public class User {

    private final String OBFUSCATE_CHARS = "********";

    private String uid;
    private String email;
    private String phoneNumber;
    private String codeWord;
    private boolean isAdmin;
    private boolean isVolunteer;
    private String sponsor;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCodeWord() {
        return codeWord;
    }

    public void setCodeWord(String codeWord) {
        this.codeWord = codeWord;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isVolunteer() {
        return isVolunteer;
    }

    public void setVolunteer(boolean volunteer) {
        isVolunteer = volunteer;
    }

    public String getSponsor() {
        return sponsor;
    }

    public void setSponsor(String sponsor) {
        this.sponsor = sponsor;
    }

    public User obfuscateData() {
        this.setEmail(this.email.substring(0, 2) + this.OBFUSCATE_CHARS);
        this.setPhoneNumber(this.phoneNumber.substring(0, 2) + this.OBFUSCATE_CHARS);

        return this;
    }

    @Override
    public String toString() {
        return "User{" +
                "uid='" + uid + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", codeWord='" + codeWord + '\'' +
                ", isAdmin=" + isAdmin +
                ", isVolunteer=" + isVolunteer +
                ", sponsor='" + sponsor + '\'' +
                '}';
    }
}
