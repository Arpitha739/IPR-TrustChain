package com.iprtrustchain.dto;

import java.time.LocalDateTime;

import com.iprtrustchain.enums.IPStatus;
import com.iprtrustchain.enums.IPType;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IPResponse {

    private Long id;

    private Long userId;

    private String ipIdentifier;

    private String title;

    private String description;

    private IPType type;

    private IPStatus status;

    private LocalDateTime createdAt;
}