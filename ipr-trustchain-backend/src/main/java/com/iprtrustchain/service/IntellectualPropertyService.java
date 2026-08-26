package com.iprtrustchain.service;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.IPResponse;
import com.iprtrustchain.dto.IPWorkflowResponse;
import com.iprtrustchain.dto.BlockchainResponse;
import com.iprtrustchain.dto.CreateIPRequest;
import com.iprtrustchain.dto.DocumentResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.entity.User;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.enums.IPStatus;
import com.iprtrustchain.repository.IntellectualPropertyRepository;
import com.iprtrustchain.repository.UserRepository;
import com.iprtrustchain.repository.DocumentRepository;

@Service
public class IntellectualPropertyService {

    private static final Logger logger =
            LoggerFactory.getLogger(
                    IntellectualPropertyService.class
            );

    private final IntellectualPropertyRepository ipRepository;

    private final UserRepository userRepository;

    private final AuditLogService auditLogService;
    
    private final DocumentRepository documentRepository;

    public IntellectualPropertyService(
            IntellectualPropertyRepository ipRepository,
            UserRepository userRepository,
            DocumentRepository documentRepository,
            AuditLogService auditLogService) {

        this.ipRepository = ipRepository;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.auditLogService = auditLogService;
    }

    public IPResponse createIP(
            Long userId,
            CreateIPRequest request) {

        logger.info(
                "Creating IP for user ID: {}",
                userId
        );

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        String ipIdentifier =
                "IPR-" + UUID.randomUUID();

        IntellectualProperty intellectualProperty =
                new IntellectualProperty();

        intellectualProperty.setUser(user);
        intellectualProperty.setIpIdentifier(ipIdentifier);
        intellectualProperty.setTitle(request.getTitle());
        intellectualProperty.setDescription(
                request.getDescription()
        );
        intellectualProperty.setType(request.getType());
        intellectualProperty.setStatus(IPStatus.REGISTERED);

        IntellectualProperty savedIP =
                ipRepository.save(intellectualProperty);

        auditLogService.logIPAction(
                userId,
                savedIP.getId(),
                AuditAction.IP_CREATED,
                "Intellectual Property created: "
                        + savedIP.getIpIdentifier()
        );

        logger.info(
                "IP created successfully: {}",
                savedIP.getIpIdentifier()
        );

        return mapToResponse(savedIP);
    }
    
    public List<IPResponse> getIPsByUserId(Long userId) {

        logger.info(
                "Fetching all IPs for user ID: {}",
                userId
        );

        if (!userRepository.existsById(userId)) {

            throw new RuntimeException("User not found");
        }

        return ipRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    
    public IPResponse getIPById(Long ipId) {

        logger.info(
                "Fetching IP with ID: {}",
                ipId
        );

        IntellectualProperty intellectualProperty =
                ipRepository.findById(ipId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Intellectual Property not found"
                                )
                        );

        return mapToResponse(intellectualProperty);
    }
    
    

    private IPResponse mapToResponse(
            IntellectualProperty ip) {

        return new IPResponse(
                ip.getId(),
                ip.getUser().getId(),
                ip.getIpIdentifier(),
                ip.getTitle(),
                ip.getDescription(),
                ip.getType(),
                ip.getStatus(),
                ip.getCreatedAt()
        );
    }
    
    public IPWorkflowResponse getIPWorkflowDetails(
            Long ipId
    ) {

        IntellectualProperty ip =
                ipRepository
                        .findById(ipId)
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
                        .orElse(null);

        DocumentResponse documentResponse = null;

        BlockchainResponse blockchainResponse = null;

        if (document != null) {

            documentResponse =
                    new DocumentResponse(

                            document.getId(),

                            ip.getId(),

                            document.getFileName(),

                            document.getFileType(),

                            document.getFileSize(),

                            document.getFileHash(),

                            document.getUploadedAt()

                    );


            if (document.getBlockchainTransactionId()
                    != null) {

                blockchainResponse =
                        new BlockchainResponse(

                                document.getId(),

                                document.getFileHash(),

                                document.getBlockchainTransactionId(),

                                document.getBlockchainRegisteredAt()

                        );
            }
        }


        return new IPWorkflowResponse(

                ip.getId(),

                ip.getIpIdentifier(),

                ip.getTitle(),

                ip.getDescription(),

                ip.getType().name(),

                ip.getStatus().name(),

                documentResponse,

                blockchainResponse

        );
    }
}