package com.kokwai.movieticketingapplicationbe.filter;


import com.kokwai.movieticketingapplicationbe.utils.TokenVerifier;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.kokwai.movieticketingapplicationbe.constants.SecurityConstants.*;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final TokenVerifier tokenVerifier;
    public JWTAuthorizationFilter(TokenVerifier tokenVerifier) {
        this.tokenVerifier = tokenVerifier;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if( isOptionsMethod(request) ) {
            response.setStatus(HttpStatus.OK.value() );
        } else if( !isPublicUrl(request) ) {
            String token = getTokenFromHeader( request );
            tokenVerifier.verifyTokenAndBuildAuthentication( token, request );
        }
        filterChain.doFilter( request, response );
    }

    private String getTokenFromHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION );
        if( authorizationHeader == null || !authorizationHeader.startsWith(JWT_PREFIX) ) {
            return null;
        }
        return authorizationHeader.substring(JWT_PREFIX.length());
    }

    private boolean isPublicUrl(HttpServletRequest request) {
        for( String publicUrl : PUBLIC_URLS ) {
            if( request.getServletPath().equals(publicUrl)) {
                return true;
            }
        }
        return false;
    }

    private boolean isOptionsMethod(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase( OPTIONS_METHOD );
    }
}
