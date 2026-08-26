package com.iprtrustchain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.CreateIPRequest;
import com.iprtrustchain.dto.IPPassportResponse;
import com.iprtrustchain.dto.IPResponse;
import com.iprtrustchain.dto.IPWorkflowResponse;
import com.iprtrustchain.service.IPPassportService;
import com.iprtrustchain.service.IntellectualPropertyService;

@RestController
@RequestMapping("/api/ip")
public class IntellectualPropertyController {

    private final IntellectualPropertyService ipService;

    private final IPPassportService ipPassportService;

    public IntellectualPropertyController(
            IntellectualPropertyService ipService,
            IPPassportService ipPassportService) {

        this.ipService = ipService;
        this.ipPassportService = ipPassportService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<IPResponse> createIP(
            @PathVariable Long userId,
            @RequestBody CreateIPRequest request) {

        return ResponseEntity.ok(
                ipService.createIP(userId, request)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<IPResponse>> getIPsByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                ipService.getIPsByUserId(userId)
        );
    }

    @GetMapping("/{ipId}")
    public ResponseEntity<IPResponse> getIPById(
            @PathVariable Long ipId) {

        return ResponseEntity.ok(
                ipService.getIPById(ipId)
        );
    }

    @GetMapping("/{ipId}/passport")
    public ResponseEntity<IPPassportResponse> getIPPassport(
            @PathVariable Long ipId) {

        return ResponseEntity.ok(
                ipPassportService.getIPPassport(ipId)
        );
    }
    
    @GetMapping("/{ipId}/workflow")
    public ResponseEntity<IPWorkflowResponse>
            getIPWorkflowDetails(
                    @PathVariable Long ipId
            ) {

        return ResponseEntity.ok(
        		ipService
                        .getIPWorkflowDetails(
                                ipId
                        )
        );

    }
}