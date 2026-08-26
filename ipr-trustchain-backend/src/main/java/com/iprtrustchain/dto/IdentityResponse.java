package com.iprtrustchain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IdentityResponse {

    private Long id;
    private Long userId;
    private String did;
}