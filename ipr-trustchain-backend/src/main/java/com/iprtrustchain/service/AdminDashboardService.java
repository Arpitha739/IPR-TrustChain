package com.iprtrustchain.service;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.AdminDashboardResponse;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.enums.IPStatus;
import com.iprtrustchain.repository.AuditLogRepository;
import com.iprtrustchain.repository.DocumentRepository;
import com.iprtrustchain.repository.IntellectualPropertyRepository;
import com.iprtrustchain.repository.UserRepository;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;

    private final IntellectualPropertyRepository
            intellectualPropertyRepository;

    private final DocumentRepository
            documentRepository;

    private final AuditLogRepository
            auditLogRepository;


    public AdminDashboardService(

            UserRepository userRepository,

            IntellectualPropertyRepository
                    intellectualPropertyRepository,

            DocumentRepository
                    documentRepository,

            AuditLogRepository
                    auditLogRepository
    ) {

        this.userRepository = userRepository;

        this.intellectualPropertyRepository =
                intellectualPropertyRepository;

        this.documentRepository =
                documentRepository;

        this.auditLogRepository =
                auditLogRepository;
    }


    public AdminDashboardResponse
            getDashboardStatistics() {


        long totalUsers =
                userRepository.count();


        long totalIPs =
                intellectualPropertyRepository.count();


        long verifiedIPs =
                intellectualPropertyRepository
                        .countByStatus(
                                IPStatus.REGISTERED
                        );


        long pendingIPs =
                totalIPs - verifiedIPs;


        long totalDocuments =
                documentRepository.count();


        long blockchainRegistered =
                auditLogRepository.countByAction(
                        AuditAction.BLOCKCHAIN_REGISTERED
                );


        long successfulVerifications =
                auditLogRepository
                        .countByActionAndDescriptionStartingWith(
                                AuditAction.EVIDENCE_VERIFIED,
                                "SUCCESS"
                        );


        long failedVerifications =
                auditLogRepository
                        .countByActionAndDescriptionStartingWith(
                                AuditAction.EVIDENCE_VERIFIED,
                                "FAILED"
                        );


        long totalVerifications =
                successfulVerifications
                        + failedVerifications;


        long totalAuditLogs =
                auditLogRepository.count();


        return new AdminDashboardResponse(

                totalUsers,

                totalIPs,

                verifiedIPs,

                pendingIPs,

                totalDocuments,

                blockchainRegistered,

                totalVerifications,

                successfulVerifications,

                failedVerifications,

                totalAuditLogs
        );
    }
}