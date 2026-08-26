package com.iprtrustchain.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.PublicVerificationResponse;
import com.iprtrustchain.service.PublicVerificationService;

@RestController
@RequestMapping("/api/public")
public class PublicVerificationController {

    private final PublicVerificationService publicVerificationService;

    public PublicVerificationController(
            PublicVerificationService publicVerificationService) {

        this.publicVerificationService =
                publicVerificationService;
    }

    @GetMapping("/verify/{ipIdentifier}")
    public ResponseEntity<PublicVerificationResponse> verifyIP(
            @PathVariable String ipIdentifier) {

        return ResponseEntity.ok(
                publicVerificationService.verifyIP(ipIdentifier)
        );
    }
}