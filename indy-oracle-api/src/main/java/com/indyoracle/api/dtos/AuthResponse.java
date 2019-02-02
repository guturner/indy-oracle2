package com.indyoracle.api.dtos;

public class AuthResponse {

    private String prefix;
    private String token;
    private int expiresIn;

    private AuthResponse() {

    }

    public static AuthResponse create() {
        return new AuthResponse();
    }

    public String getPrefix() {
        return prefix;
    }

    public AuthResponse setPrefix(String prefix) {
        this.prefix = prefix;
        return this;
    }

    public String getToken() {
        return token;
    }

    public AuthResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public AuthResponse setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    @Override
    public String toString() {
        return '{' +
                "\"prefix\":\"" + prefix + "\"," +
                "\"token\":\"" + token + "\"," +
                "\"expiresIn\":" + expiresIn +
                '}';
    }
}
