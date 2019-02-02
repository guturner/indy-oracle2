package com.indyoracle.api.services;

import com.indyoracle.api.config.ServiceAccountConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This service authenticates users of the API.
 */
@Service
public class ApiUserService implements UserDetailsService {

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    ServiceAccountConfig serviceAccountConfig;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (serviceAccountConfig.getUsername().equals(username)) {
            List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                    .commaSeparatedStringToAuthorityList("ROLE_" + serviceAccountConfig.getRole());

            return new User(serviceAccountConfig.getUsername(), encoder.encode(serviceAccountConfig.getPassword()), grantedAuthorities);
        }

        throw new UsernameNotFoundException("username: " + username + " not found.");
    }
}
