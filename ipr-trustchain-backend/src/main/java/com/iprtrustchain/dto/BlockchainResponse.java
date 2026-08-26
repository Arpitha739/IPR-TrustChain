package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BlockchainResponse {

    private Long documentId;

    private String fileHash;

    private String blockchainTransactionId;

    private LocalDateTime blockchainRegisteredAt;
}