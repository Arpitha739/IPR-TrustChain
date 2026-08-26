package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PublicVerificationResponse {

    private String ipIdentifier;

    private String title;

    private String creatorDid;

    private String fileHash;

    private String blockchainTransactionId;

    private String verificationStatus;

    private LocalDateTime registeredAt;

    private String message;
}