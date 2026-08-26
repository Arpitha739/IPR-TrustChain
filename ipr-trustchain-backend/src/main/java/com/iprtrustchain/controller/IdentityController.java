package com.iprtrustchain.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.IdentityResponse;
import com.iprtrustchain.service.IdentityService;

@RestController
@RequestMapping("/api/identities")
public class IdentityController {

    private final IdentityService identityService;

    public IdentityController(IdentityService identityService) {
        this.identityService = identityService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<IdentityResponse> createIdentity(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                identityService.createIdentity(userId)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<IdentityResponse> getIdentity(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                identityService.getIdentityByUserId(userId)
        );
    }
}