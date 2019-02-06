package com.indyoracle.api.services;

import com.indyoracle.api.config.ServiceAccountConfigProperties;
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
    ServiceAccountConfigProperties serviceAccountConfigProperties;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (serviceAccountConfigProperties.getUsername().equals(username)) {
            List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                    .commaSeparatedStringToAuthorityList("ROLE_" + serviceAccountConfigProperties.getRole());

            return new User(serviceAccountConfigProperties.getUsername(), encoder.encode(serviceAccountConfigProperties.getPassword()), grantedAuthorities);
        }

        throw new UsernameNotFoundException("username: " + username + " not found.");
    }
}
