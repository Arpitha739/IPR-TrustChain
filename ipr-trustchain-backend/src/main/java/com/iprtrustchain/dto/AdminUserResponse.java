package com.iprtrustchain.dto;

import java.time.LocalDateTime;

public record AdminUserResponse(

        Long id,

        String name,

        String email,

        String mobile,

        String organization,

        String country,

        String role,

        LocalDateTime createdAt

) {
}