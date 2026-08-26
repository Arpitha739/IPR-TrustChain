package com.iprtrustchain.dto;

import com.iprtrustchain.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import jakarta.validation.constraints.Size;
@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String mobile;

    private String organization;

    private String country;

    @NotNull(message = "Role is required")
    private Role role;

    @NotBlank(message = "Password is required")
    @Size(
            min = 6,
            message = "Password must be at least 6 characters"
        )
    private String password;
}