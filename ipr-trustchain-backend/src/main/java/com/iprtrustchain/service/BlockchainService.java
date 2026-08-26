package com.iprtrustchain.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iprtrustchain.dto.BlockchainResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.DocumentRepository;

@Service
public class BlockchainService {

    private final DocumentRepository documentRepository;

    private final AuditLogService auditLogService;

    private final RestTemplate restTemplate;


    public BlockchainService(

            DocumentRepository documentRepository,

            AuditLogService auditLogService,

            RestTemplate restTemplate) {

        this.documentRepository =
                documentRepository;

        this.auditLogService =
                auditLogService;

        this.restTemplate =
                restTemplate;
    }


    public BlockchainResponse registerDocument(
            Long documentId) {

        Document document = documentRepository
                .findById(documentId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document not found"
                        )
                );


        if (document.getFileHash() == null) {

            throw new RuntimeException(
                    "Document hash not found"
            );
        }


        if (document.getBlockchainTransactionId() != null) {

            throw new RuntimeException(
                    "Document already registered on blockchain"
            );
        }


        // Node.js blockchain API URL

        String blockchainApiUrl =
                "http://localhost:3001/blockchain/register";


        // Request body

        Map<String, String> requestBody =
                Map.of(
                        "documentHash",
                        document.getFileHash()
                );


        try {

            // Call Node.js blockchain API

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(

                            blockchainApiUrl,

                            requestBody,

                            Map.class
                    );


            Map<String, Object> responseBody =
                    response.getBody();


            if (responseBody == null ||
                    !Boolean.TRUE.equals(
                            responseBody.get("success")
                    )) {

                throw new RuntimeException(
                        "Blockchain registration failed"
                );
            }


            // Get REAL blockchain transaction hash

            String transactionHash =
                    (String) responseBody.get(
                            "transactionHash"
                    );


            if (transactionHash == null) {

                throw new RuntimeException(
                        "Blockchain transaction hash not received"
                );
            }


            // Save real transaction hash

            document.setBlockchainTransactionId(
                    transactionHash
            );


            document.setBlockchainRegisteredAt(
                    LocalDateTime.now()
            );


            Document savedDocument =
                    documentRepository.save(
                            document
                    );


            Long userId =
                    savedDocument
                            .getIntellectualProperty()
                            .getUser()
                            .getId();


            auditLogService.logIPAction(
                    userId,
                    savedDocument
                            .getIntellectualProperty()
                            .getId(),
                    AuditAction.BLOCKCHAIN_REGISTERED,
                    "Document evidence registered on blockchain. Transaction: "
                            + transactionHash
            );


            return new BlockchainResponse(

                    savedDocument.getId(),

                    savedDocument.getFileHash(),

                    savedDocument
                            .getBlockchainTransactionId(),

                    savedDocument
                            .getBlockchainRegisteredAt()
            );

        } catch (Exception e) {

            throw new RuntimeException(

                    "Failed to register document on blockchain: "
                            + e.getMessage()
            );
        }
    }
}