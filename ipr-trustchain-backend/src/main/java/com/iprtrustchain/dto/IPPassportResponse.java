package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IPPassportResponse {

    private String ipIdentifier;

    private String title;

    private String description;

    private String type;

    private String status;

    private String creatorDid;

    private Long documentId;

    private String fileName;

    private String fileHash;

    private String blockchainTransactionId;

    private LocalDateTime blockchainRegisteredAt;

    private String verificationStatus;

    private LocalDateTime createdAt;
}