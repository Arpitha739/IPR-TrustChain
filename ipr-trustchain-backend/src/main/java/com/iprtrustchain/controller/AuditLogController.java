package com.iprtrustchain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.AuditLogResponse;
import com.iprtrustchain.service.AuditLogService;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(
            AuditLogService auditLogService) {

        this.auditLogService = auditLogService;
    }

    @GetMapping("/ip/{ipId}")
    public ResponseEntity<List<AuditLogResponse>>
            getIPAuditLogs(
                    @PathVariable Long ipId) {

        return ResponseEntity.ok(
                auditLogService
                        .getAuditLogsByIPId(ipId)
        );
    }
}