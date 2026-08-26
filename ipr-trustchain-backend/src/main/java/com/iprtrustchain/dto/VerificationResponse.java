package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerificationResponse {

    private boolean verified;

 

    private String message;

    private Long ipId;

    private String ipIdentifier;

    private String title;

    private String fileName;

    private String fileHash;

    private String blockchainTransactionId;

    private LocalDateTime blockchainRegisteredAt;
}