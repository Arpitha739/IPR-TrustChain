package com.iprtrustchain.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.BlockchainResponse;
import com.iprtrustchain.service.BlockchainService;

@RestController
@RequestMapping("/api/blockchain")
public class BlockchainController {

    private final BlockchainService blockchainService;

    public BlockchainController(
            BlockchainService blockchainService) {

        this.blockchainService = blockchainService;
    }

    @PostMapping("/register/{documentId}")
    public ResponseEntity<BlockchainResponse>
            registerDocument(

                    @PathVariable Long documentId) {

        return ResponseEntity.ok(
                blockchainService.registerDocument(
                        documentId
                )
        );
    }
}