package com.kokwai.movieticketingapplicationbe.model;

import com.kokwai.movieticketingapplicationbe.constants.SecurityConstants;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@NoArgsConstructor @Getter @Setter
public class JWT {

    private String jwt;
    private Instant expirationDate;

    public JWT(String jwt) {
        this.jwt = jwt;
        this.expirationDate = Instant.now().plusMillis(SecurityConstants.EXP_TIME);
    }
}
