package com.kokwai.movieticketingapplicationbe.constants;


public class SecurityConstants {

    private SecurityConstants() {}

    public static final String AUTHORITIES = "authorities";
    public static final long EXP_TIME = 604_800_000; //7days
    public static final String JWT_SECRET =
            "A410^Ey$y7T^tYGqpe!U@8G*V*SSSmXyYC4zWSRx+9*HyR)tvS#Xj#D#uzF)10G";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String TOKEN_IS_REQUIRED = "Token is required";
    public static final String SUBJECT_IS_REQUIRED = "Subject is required";
    public static final String OPTIONS_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = { "/auth/login", "/auth/register", "/error", "/movies", "/movies/{id}" };
    public static final String[] PRIVATE_ADMIN_GET_URLS = { "/users", "/bookings" };
    public static final String[] PRIVATE_ADMIN_POST_URLS = { "/movies" };
    public static final String[] PRIVATE_ADMIN_USER_DELETE_URLS = { "/users/**" };
    public static final String[] PRIVATE_USER_PUT_URLS = { "/users" };
    public static final String JWT_PREFIX = "Bearer ";
    public static final String JWT_HEADER = "JWT";
    public static final String REGISTRATION_SUCCESS = "Registration completed successfully";

}
