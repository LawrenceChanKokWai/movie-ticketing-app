package com.kokwai.movieticketingapplicationbe.utils;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.kokwai.movieticketingapplicationbe.model.UserPrincipal;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Instant;

import static com.kokwai.movieticketingapplicationbe.constants.SecurityConstants.*;


@Component
public class TokenProvider {

    public String generateJWT(UserPrincipal userPrincipal ) {
        String[] claims = getClaims( userPrincipal );
        return createToken( userPrincipal, claims );
    }

    private String createToken(UserPrincipal userPrincipal, String[] claims) {
        return JWT.create()
                .withSubject( userPrincipal.getUsername() )
                .withArrayClaim(AUTHORITIES, claims)
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plusMillis(EXP_TIME))
                .sign(Algorithm.HMAC512(JWT_SECRET));
    }

    private String[] getClaims(UserPrincipal userPrincipal) {
        return userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);
    }

}
