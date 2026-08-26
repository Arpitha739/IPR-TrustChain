package com.iprtrustchain.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.iprtrustchain.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        return http

                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth


                        // =========================
                        // PUBLIC APIs
                        // =========================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/public/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/qr/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/verify/**"
                        ).permitAll()


                        // =========================
                        // ADMIN APIs
                        // =========================

                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")


                        // =========================
                        // CREATOR APIs
                        // =========================

                        .requestMatchers(
                                "/api/creator/**"
                        ).hasRole("CREATOR")


                        // =========================
                        // VERIFIER APIs
                        // =========================

                        .requestMatchers(
                                "/api/verifier/**"
                        ).hasAnyRole(
                                "VERIFIER",
                                "ADMIN"
                        )


                        // =========================
                        // IP MANAGEMENT
                        // Creator manages IP assets.
                        // Admin can inspect them.
                        // =========================

                        .requestMatchers(
                                "/api/ip/**"
                        ).hasAnyRole(
                                "CREATOR",
                                "ADMIN"
                        )


                        // =========================
                        // DOCUMENT MANAGEMENT
                        // =========================

                        .requestMatchers(
                                "/api/documents/**"
                        ).hasAnyRole(
                                "CREATOR",
                                "ADMIN"
                        )


                        // =========================
                        // BLOCKCHAIN DATA
                        // =========================

                        .requestMatchers(
                                "/api/blockchain/**"
                        ).hasAnyRole(
                                "CREATOR",
                                "ADMIN"
                        )
                        
                        .requestMatchers("/api/audit-logs/**")
                        .hasAnyRole("CREATOR", "ADMIN")


                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest()
                        .authenticated()

                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .build();
    }
}