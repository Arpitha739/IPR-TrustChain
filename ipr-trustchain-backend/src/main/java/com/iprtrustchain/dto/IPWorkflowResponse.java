package com.iprtrustchain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IPWorkflowResponse {

    private Long id;

    private String ipIdentifier;

    private String title;

    private String description;

    private String type;

    private String status;

    private DocumentResponse document;

    private BlockchainResponse blockchain;
}