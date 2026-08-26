package com.iprtrustchain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.IPPassportResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.entity.Identity;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.repository.DocumentRepository;
import com.iprtrustchain.repository.IdentityRepository;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class IPPassportService {

    private final IntellectualPropertyRepository intellectualPropertyRepository;
    private final DocumentRepository documentRepository;
    private final IdentityRepository identityRepository;

    public IPPassportService(
            IntellectualPropertyRepository intellectualPropertyRepository,
            DocumentRepository documentRepository,
            IdentityRepository identityRepository) {

        this.intellectualPropertyRepository =
                intellectualPropertyRepository;

        this.documentRepository =
                documentRepository;

        this.identityRepository =
                identityRepository;
    }

    public IPPassportResponse getIPPassport(Long ipId) {

        // Get IP details
        IntellectualProperty intellectualProperty =
                intellectualPropertyRepository
                        .findById(ipId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Intellectual Property not found"
                                )
                        );

        // Get creator's digital identity
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

        // Get documents belonging to this IP
        List<Document> documents =
                documentRepository
                        .findByIntellectualPropertyId(ipId);

        if (documents.isEmpty()) {
            throw new RuntimeException(
                    "No documents found for this Intellectual Property"
            );
        }

        // Currently using the first document
        Document document = documents.get(0);

        String verificationStatus;

        if (document.getBlockchainTransactionId() != null
                && document.getFileHash() != null) {

            verificationStatus = "VERIFIED";

        } else {

            verificationStatus = "PENDING";
        }

        return new IPPassportResponse(

                intellectualProperty.getIpIdentifier(),

                intellectualProperty.getTitle(),

                intellectualProperty.getDescription(),

                intellectualProperty.getType().name(),

                intellectualProperty.getStatus().name(),

                identity.getDid(),

                document.getId(),

                document.getFileName(),

                document.getFileHash(),

                document.getBlockchainTransactionId(),

                document.getBlockchainRegisteredAt(),

                verificationStatus,

                intellectualProperty.getCreatedAt()
        );
    }
}