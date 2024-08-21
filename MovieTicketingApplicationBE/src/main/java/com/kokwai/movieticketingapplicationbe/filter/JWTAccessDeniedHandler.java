package com.kokwai.movieticketingapplicationbe.filter;

import com.kokwai.movieticketingapplicationbe.model.Response;
import com.kokwai.movieticketingapplicationbe.utils.JsonResponseHelper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JWTAccessDeniedHandler implements AccessDeniedHandler {

    public static final String MESSAGE = "Access Denied. You do not have sufficient permissions to access this resource";

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException
    {
        Response httpResponse = new Response(
                HttpStatus.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED.value(),
                MESSAGE);

        JsonResponseHelper.writeJsonResponse( response, httpResponse, HttpStatus.UNAUTHORIZED );
    }
}
