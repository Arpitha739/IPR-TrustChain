package com.iprtrustchain.service;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BlockchainVerificationService {

    private final RestClient restClient;

    public BlockchainVerificationService() {

        this.restClient = RestClient.create();

    }

    public boolean verifyHash(
            String fileHash) {

        try {

            Map<String, Object> response =
                    restClient.get()

                    .uri(
                    	    "https://ipr-trustchain-blockchain.onrender.com/blockchain/verify/{hash}",
                    	    fileHash
                    	)

                            .retrieve()

                            .body(
                                    new ParameterizedTypeReference<
                                            Map<String, Object>>() {}
                            );

            if (response == null) {

                return false;

            }

            Object verified =
                    response.get("verified");

            return Boolean.TRUE.equals(
                    verified
            );

        } catch (Exception e) {

            return false;

        }

    }

}