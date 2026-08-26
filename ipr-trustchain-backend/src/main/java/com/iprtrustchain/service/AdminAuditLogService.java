package com.iprtrustchain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.AdminAuditLogResponse;
import com.iprtrustchain.entity.AuditLog;
import com.iprtrustchain.repository.AuditLogRepository;

@Service
public class AdminAuditLogService {

    private final AuditLogRepository
            auditLogRepository;

    public AdminAuditLogService(

            AuditLogRepository
                    auditLogRepository
    ) {

        this.auditLogRepository =
                auditLogRepository;
    }


    public List<AdminAuditLogResponse>
            getAllAuditLogs() {

        return auditLogRepository
                .findAllByOrderByTimestampDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    private AdminAuditLogResponse
            mapToResponse(AuditLog auditLog) {

        return new AdminAuditLogResponse(

                auditLog.getId(),

                auditLog.getUserId(),

                auditLog.getIpId(),

                auditLog.getAction(),

                auditLog.getDescription(),

                auditLog.getTimestamp()
        );
    }
}