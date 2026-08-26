package com.iprtrustchain.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.iprtrustchain.entity.AuditLog;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.AuditLogRepository;

import java.util.List;

import com.iprtrustchain.dto.AuditLogResponse;

@Service
public class AuditLogService {

    private static final Logger logger =
            LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(
            AuditLogRepository auditLogRepository) {

        this.auditLogRepository = auditLogRepository;
    }

    // Existing user-level audit log
    public void logAction(
            Long userId,
            AuditAction action,
            String description) {

        AuditLog auditLog = new AuditLog();

        auditLog.setUserId(userId);
        auditLog.setAction(action);
        auditLog.setDescription(description);

        auditLogRepository.save(auditLog);

        logger.info(
                "Audit log created - User ID: {}, Action: {}",
                userId,
                action
        );
    }

    // NEW: IP-specific audit log
    public void logIPAction(
            Long userId,
            Long ipId,
            AuditAction action,
            String description) {

        AuditLog auditLog = new AuditLog();

        auditLog.setUserId(userId);
        auditLog.setIpId(ipId);
        auditLog.setAction(action);
        auditLog.setDescription(description);

        auditLogRepository.save(auditLog);

        logger.info(
                "IP Audit log created - IP ID: {}, Action: {}",
                ipId,
                action
        );
    }
    
    public List<AuditLogResponse> getAuditLogsByIPId(
            Long ipId) {

        return auditLogRepository
                .findByIpIdOrderByTimestampAsc(ipId)
                .stream()
                .map(auditLog ->
                        new AuditLogResponse(

                                auditLog.getId(),

                                auditLog.getUserId(),

                                auditLog.getIpId(),

                                auditLog.getAction(),

                                auditLog.getDescription(),

                                auditLog.getTimestamp()
                        )
                )
                .toList();
    }
}