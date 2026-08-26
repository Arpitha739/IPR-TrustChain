package com.iprtrustchain.dto;

import com.iprtrustchain.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private String message;

    private Long userId;

    private String name;

    private String email;

    private Role role;
}