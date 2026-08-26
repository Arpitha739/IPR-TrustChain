package com.iprtrustchain.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iprtrustchain.dto.VerificationResponse;
import com.iprtrustchain.service.VerificationService;

@RestController
@RequestMapping("/api/verify")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(
            VerificationService verificationService) {

        this.verificationService =
                verificationService;
    }

    // Get public IP verification details
    @GetMapping("/{ipIdentifier}")
    public ResponseEntity<VerificationResponse>
            verifyIP(
                    @PathVariable
                    String ipIdentifier) {

        return ResponseEntity.ok(
                verificationService.verifyIP(
                        ipIdentifier
                )
        );
    }

    // Verify uploaded evidence file
    @PostMapping("/{ipIdentifier}/evidence")
    public ResponseEntity<VerificationResponse>
            verifyEvidence(

                    @PathVariable
                    String ipIdentifier,

                    @RequestParam("file")
                    MultipartFile file
            ) throws IOException {

        return ResponseEntity.ok(
                verificationService.verifyEvidence(
                        ipIdentifier,
                        file
                )
        );
    }
}