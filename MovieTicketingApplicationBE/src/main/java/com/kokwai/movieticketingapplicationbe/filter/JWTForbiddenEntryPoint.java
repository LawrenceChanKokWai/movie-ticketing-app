package com.kokwai.movieticketingapplicationbe.filter;

import com.kokwai.movieticketingapplicationbe.model.Response;
import com.kokwai.movieticketingapplicationbe.utils.JsonResponseHelper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.http.HttpResponse;

@Component
public class JWTForbiddenEntryPoint extends Http403ForbiddenEntryPoint {

    private static final String MESSAGE = "Access denied. You are required to login to access this resource.";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2) throws IOException {
        Response httpResponse = new Response( HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.value(), MESSAGE );
        JsonResponseHelper.writeJsonResponse( response, httpResponse, HttpStatus.FORBIDDEN );
    }
}
