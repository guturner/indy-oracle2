package com.indyoracle.api.filters;

import com.indyoracle.api.config.JwtConfigProperties;
import com.indyoracle.api.dtos.UserCredentials;
import com.indyoracle.api.exceptions.BasicAuthException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtConfigProperties jwtConfigProperties;

    public JwtUsernameAndPasswordAuthenticationFilter(
            AuthenticationManager authenticationManager,
            JwtConfigProperties jwtConfigProperties) {
        this.authenticationManager = authenticationManager;
        this.jwtConfigProperties = jwtConfigProperties;

        this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfigProperties.getUrl(), "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {

        final String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.toLowerCase().startsWith("basic")) {
            try {
                String[] rawCreds = getRawCredentials(authorization.substring("Basic".length()).trim());

                UserCredentials creds = new UserCredentials();
                creds.setUsername(rawCreds[0]);
                creds.setPassword(rawCreds[1]);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        creds.getUsername(), creds.getPassword(), Collections.emptyList());

                return authenticationManager.authenticate(authToken);
            } catch (Exception ex) {
                throw new RuntimeException(ex);
            }
        } else {
            throw new BasicAuthException("Unauthenticated.");
        }
    }

    String[] getRawCredentials(String basicAuthHeader) {
        byte[] headerDecoded = Base64.getDecoder().decode(basicAuthHeader);
        String credentialString = new String(headerDecoded, StandardCharsets.UTF_8);

        return credentialString.split(":", 2);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth)
        throws IOException, ServletException {
        Long now = System.currentTimeMillis();

        String token = Jwts.builder()
                .setSubject(auth.getName())
                .claim("authorities", auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtConfigProperties.getExpiration() * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtConfigProperties.getSecret().getBytes())
                .compact();

        response.addHeader(jwtConfigProperties.getHeader(), jwtConfigProperties.getPrefix() + token);
    }
}
