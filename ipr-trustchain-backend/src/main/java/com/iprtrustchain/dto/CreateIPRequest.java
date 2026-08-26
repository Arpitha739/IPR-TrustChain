package com.iprtrustchain.dto;

import com.iprtrustchain.enums.IPType;

import lombok.Data;

@Data
public class CreateIPRequest {

    private String title;

    private String description;

    private IPType type;
}