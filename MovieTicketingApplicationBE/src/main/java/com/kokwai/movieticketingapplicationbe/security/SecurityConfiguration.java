package com.kokwai.movieticketingapplicationbe.security;

import com.kokwai.movieticketingapplicationbe.filter.JWTAccessDeniedHandler;
import com.kokwai.movieticketingapplicationbe.filter.JWTAuthorizationFilter;
import com.kokwai.movieticketingapplicationbe.filter.JWTForbiddenEntryPoint;
import com.kokwai.movieticketingapplicationbe.service.DetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

import static com.kokwai.movieticketingapplicationbe.constants.SecurityConstants.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final DetailsService detailsService;
    private final JWTAuthorizationFilter jwtAuthorizationFilter;
    private final JWTForbiddenEntryPoint jwtForbiddenEntryPoint;
    private final JWTAccessDeniedHandler jwtAccessDeniedHandler;
    private final PasswordEncoder passwordEncoder;
    public SecurityConfiguration(DetailsService detailsService, JWTAuthorizationFilter jwtAuthorizationFilter,
                                 JWTForbiddenEntryPoint jwtForbiddenEntryPoint, JWTAccessDeniedHandler jwtAccessDeniedHandler, PasswordEncoder passwordEncoder) {
        this.detailsService = detailsService;
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
        this.jwtForbiddenEntryPoint = jwtForbiddenEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService( detailsService );
        authenticationProvider.setPasswordEncoder( passwordEncoder );
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(authenticationProvider()));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorizeHttpRequests) ->
                        authorizeHttpRequests
                                .requestMatchers(PUBLIC_URLS).permitAll()
                                .requestMatchers(HttpMethod.GET, PRIVATE_ADMIN_POST_URLS).hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET, PRIVATE_ADMIN_GET_URLS).hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, PRIVATE_ADMIN_USER_DELETE_URLS).hasAnyAuthority("ADMIN", "USER")
                                .requestMatchers(HttpMethod.PUT, PRIVATE_USER_PUT_URLS).hasAuthority("USER")
                                .anyRequest().authenticated())
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling
                                .authenticationEntryPoint(jwtForbiddenEntryPoint)
                                .accessDeniedHandler(jwtAccessDeniedHandler))
                .authenticationProvider(authenticationProvider())
                .authenticationManager(authenticationManager())
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}


