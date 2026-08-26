package com.iprtrustchain.dto;

import java.time.LocalDateTime;

public record AdminIPResponse(

        Long id,

        String ipIdentifier,

        String title,

        String description,

        String type,

        String status,

        Long creatorId,

        String creatorName,

        String creatorEmail,

        LocalDateTime createdAt

) {
}