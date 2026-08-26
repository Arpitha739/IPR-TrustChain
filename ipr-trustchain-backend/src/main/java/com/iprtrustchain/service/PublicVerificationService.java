package com.iprtrustchain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.PublicVerificationResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.entity.Identity;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.repository.DocumentRepository;
import com.iprtrustchain.repository.IdentityRepository;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class PublicVerificationService {

    private final IntellectualPropertyRepository intellectualPropertyRepository;

    private final DocumentRepository documentRepository;

    private final IdentityRepository identityRepository;

    private final BlockchainVerificationService blockchainVerificationService;


    public PublicVerificationService(

            IntellectualPropertyRepository intellectualPropertyRepository,

            DocumentRepository documentRepository,

            IdentityRepository identityRepository,

            BlockchainVerificationService blockchainVerificationService) {

        this.intellectualPropertyRepository =
                intellectualPropertyRepository;

        this.documentRepository =
                documentRepository;

        this.identityRepository =
                identityRepository;

        this.blockchainVerificationService =
                blockchainVerificationService;
    }


    public PublicVerificationResponse verifyIP(
            String ipIdentifier) {

        IntellectualProperty intellectualProperty =

                intellectualPropertyRepository
                        .findByIpIdentifier(ipIdentifier)
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Intellectual Property not found"
                                )
                        );


        Identity identity =

                identityRepository
                        .findByUserId(

                                intellectualProperty
                                        .getUser()
                                        .getId()

                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Digital identity not found"
                                )
                        );


        List<Document> documents =

                documentRepository
                        .findByIntellectualPropertyId(
                                intellectualProperty.getId()
                        );


        if (documents.isEmpty()) {

            return new PublicVerificationResponse(

                    intellectualProperty.getIpIdentifier(),

                    intellectualProperty.getTitle(),

                    identity.getDid(),

                    null,

                    null,

                    "PENDING",

                    intellectualProperty.getCreatedAt(),

                    "IP exists, but no document is available for verification"
            );
        }


        Document document = documents.get(0);


        String verificationStatus;

        String message;


        if (document.getFileHash() == null) {

            verificationStatus = "PENDING";

            message =
                    "Document exists, but file hash is not available";

        } else {

            boolean verifiedOnBlockchain =
                    blockchainVerificationService.verifyHash(
                            document.getFileHash()
                    );


            if (verifiedOnBlockchain) {

                verificationStatus = "VERIFIED";

                message =
                        "IP ownership and document integrity verified successfully on blockchain";

            } else {

                verificationStatus = "NOT_VERIFIED";

                message =
                        "Document hash was not found on the blockchain";
            }
        }


        return new PublicVerificationResponse(

                intellectualProperty.getIpIdentifier(),

                intellectualProperty.getTitle(),

                identity.getDid(),

                document.getFileHash(),

                document.getBlockchainTransactionId(),

                verificationStatus,

                intellectualProperty.getCreatedAt(),

                message
        );
    }
}