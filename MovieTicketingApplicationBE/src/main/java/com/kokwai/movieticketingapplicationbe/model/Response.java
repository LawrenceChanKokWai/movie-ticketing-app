package com.kokwai.movieticketingapplicationbe.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Getter @Setter @NoArgsConstructor
public class Response {

    private HttpStatus status;
    private int statusCode;
    private String message;
    private Date timeStamp;

    public Response(HttpStatus status, int statusCode, String message) {
        this.timeStamp = new Date();
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
    }
}
