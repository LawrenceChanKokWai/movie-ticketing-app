package com.kokwai.movieticketingapplicationbe.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kokwai.movieticketingapplicationbe.model.Response;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;

public class JsonResponseHelper {

    public static void writeJsonResponse(
            HttpServletResponse response,
            Response httpResponse,
            HttpStatus httpStatus) throws IOException {
        setResponseHeader(response, httpStatus);
        writeResponse( response, httpResponse);
    }

    private static void writeResponse(HttpServletResponse response, Response httpResponse) throws IOException {
        ServletOutputStream outputStream = response.getOutputStream();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(outputStream, httpResponse);

        outputStream.flush();
    }

    private static void setResponseHeader(HttpServletResponse response, HttpStatus httpStatus) {
        response.setContentType("APPLICATION_JSON_VALUE");
        response.setStatus( httpStatus.value() );
    }

}
