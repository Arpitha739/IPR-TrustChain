package com.iprtrustchain.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.iprtrustchain.dto.VerificationResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.DocumentRepository;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class VerificationService {

    private final IntellectualPropertyRepository ipRepository;

    private final DocumentRepository documentRepository;

    private final BlockchainVerificationService blockchainVerificationService;

    private final HashService hashService;

    private final AuditLogService auditLogService;


    public VerificationService(

            IntellectualPropertyRepository ipRepository,

            DocumentRepository documentRepository,

            BlockchainVerificationService blockchainVerificationService,

            HashService hashService,

            AuditLogService auditLogService) {

        this.ipRepository = ipRepository;

        this.documentRepository = documentRepository;

        this.blockchainVerificationService =
                blockchainVerificationService;

        this.hashService = hashService;

        this.auditLogService = auditLogService;
    }


    // Existing IP verification
    public VerificationResponse verifyIP(
            String ipIdentifier) {

        IntellectualProperty ip =
                ipRepository
                        .findByIpIdentifier(ipIdentifier)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "IP not found"
                                )
                        );

        Document document =
                documentRepository
                        .findByIntellectualPropertyId(
                                ip.getId()
                        )
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No document found for this IP"
                                )
                        );

        if (document.getBlockchainTransactionId() == null) {

            return new VerificationResponse(

                    false,

                    "This document has not been registered on blockchain",

                    ip.getId(),

                    ip.getIpIdentifier(),

                    ip.getTitle(),

                    document.getFileName(),

                    document.getFileHash(),

                    null,

                    null
            );
        }

        boolean blockchainVerified =
                blockchainVerificationService.verifyHash(
                        document.getFileHash()
                );

        if (!blockchainVerified) {

            return new VerificationResponse(

                    false,

                    "Document hash was not verified on blockchain",

                    ip.getId(),

                    ip.getIpIdentifier(),

                    ip.getTitle(),

                    document.getFileName(),

                    document.getFileHash(),

                    document.getBlockchainTransactionId(),

                    document.getBlockchainRegisteredAt()
            );
        }

        return new VerificationResponse(

                true,

                "Intellectual Property successfully verified on blockchain",

                ip.getId(),

                ip.getIpIdentifier(),

                ip.getTitle(),

                document.getFileName(),

                document.getFileHash(),

                document.getBlockchainTransactionId(),

                document.getBlockchainRegisteredAt()
        );
    }


    // Verify uploaded evidence
    public VerificationResponse verifyEvidence(

            String ipIdentifier,

            MultipartFile file) {

        IntellectualProperty ip =
                ipRepository
                        .findByIpIdentifier(ipIdentifier)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "IP not found"
                                )
                        );

        Document document =
                documentRepository
                        .findByIntellectualPropertyId(
                                ip.getId()
                        )
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No registered evidence found for this IP"
                                )
                        );

        try {

            // Generate SHA-256 hash of uploaded file
            String uploadedFileHash =
                    hashService.generateSHA256(file);


            // Compare uploaded hash with registered hash
            boolean hashMatches =
                    uploadedFileHash.equals(
                            document.getFileHash()
                    );


            // CASE 1: HASH DOES NOT MATCH
            if (!hashMatches) {

            	auditLogService.logIPAction(

            	        ip.getUser().getId(),

            	        ip.getId(),

            	        AuditAction.EVIDENCE_VERIFIED,

            	        "FAILED verification performed for document ID: "
            	                + document.getId()
            	                + " | IP: "
            	                + ip.getIpIdentifier()
            	                + " | Reason: Uploaded document hash does not match"
            	);


                return new VerificationResponse(

                        false,

                        "VERIFICATION FAILED: Uploaded document does not match the registered evidence",

                        ip.getId(),

                        ip.getIpIdentifier(),

                        ip.getTitle(),

                        document.getFileName(),

                        document.getFileHash(),

                        document.getBlockchainTransactionId(),

                        document.getBlockchainRegisteredAt()
                );
            }


            // Check whether registered hash exists on blockchain
            boolean blockchainVerified =
                    blockchainVerificationService.verifyHash(
                            document.getFileHash()
                    );


            // CASE 2: HASH MATCHES BUT BLOCKCHAIN FAILS
            if (!blockchainVerified) {

            	auditLogService.logIPAction(

            	        ip.getUser().getId(),

            	        ip.getId(),

            	        AuditAction.EVIDENCE_VERIFIED,

            	        "FAILED verification performed for document ID: "
            	                + document.getId()
            	                + " | IP: "
            	                + ip.getIpIdentifier()
            	                + " | Reason: Blockchain proof could not be verified"
            	);


                return new VerificationResponse(

                        false,

                        "Evidence matches, but blockchain proof could not be verified",

                        ip.getId(),

                        ip.getIpIdentifier(),

                        ip.getTitle(),

                        document.getFileName(),

                        document.getFileHash(),

                        document.getBlockchainTransactionId(),

                        document.getBlockchainRegisteredAt()
                );
            }


            // CASE 3: FULL VERIFICATION SUCCESS

            auditLogService.logIPAction(

                    ip.getUser().getId(),

                    ip.getId(),

                    AuditAction.EVIDENCE_VERIFIED,

                    "SUCCESS verification performed for document ID: "
                            + document.getId()
                            + " | IP: "
                            + ip.getIpIdentifier()
                            + " | Blockchain transaction: "
                            + document.getBlockchainTransactionId()
            );


            return new VerificationResponse(

                    true,

                    "AUTHENTIC: Evidence integrity verified successfully against blockchain proof",

                    ip.getId(),

                    ip.getIpIdentifier(),

                    ip.getTitle(),

                    document.getFileName(),

                    document.getFileHash(),

                    document.getBlockchainTransactionId(),

                    document.getBlockchainRegisteredAt()
            );


        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to verify uploaded evidence: "
                            + e.getMessage(),
                    e
            );
        }
    }
}