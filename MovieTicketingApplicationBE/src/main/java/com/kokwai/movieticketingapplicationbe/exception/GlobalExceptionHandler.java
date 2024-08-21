package com.kokwai.movieticketingapplicationbe.exception;

import com.kokwai.movieticketingapplicationbe.model.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<Response> handleDuplicateEmailException( DuplicateEmailException exception ) {
        Response response = new Response(
                HttpStatus.BAD_REQUEST,
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<Response> handleBadCredentialsException(BadCredentialsException exception) {
        Response response = new Response(
                HttpStatus.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage()
        );
        return new ResponseEntity<>( response, HttpStatus.UNAUTHORIZED );
    }

    @ExceptionHandler
    public ResponseEntity<Response> handleResourceNotFoundException( ResourceNotFoundException exception ) {
        Response response = new Response(
                HttpStatus.NOT_FOUND,
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request
    ) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        List<String> listErrors = fieldErrors.stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", status);
        response.put("statusCode", status.value());
        response.put("message", listErrors);
        response.put("timeStamp", new Date());

        return ResponseEntity.status(status).headers(headers).body(response);
    }
}
