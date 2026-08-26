package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import com.iprtrustchain.enums.AuditAction;

public record AdminAuditLogResponse(

        Long id,

        Long userId,

        Long ipId,

        AuditAction action,

        String description,

        LocalDateTime timestamp

) {
}