package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DocumentResponse {

    private Long id;

    private Long ipId;

    private String fileName;

    private String fileType;

    private Long fileSize;

    private String fileHash;

    private LocalDateTime uploadedAt;
}