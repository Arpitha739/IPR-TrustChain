package com.iprtrustchain.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.IdentityResponse;
import com.iprtrustchain.entity.Identity;
import com.iprtrustchain.entity.User;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.IdentityRepository;
import com.iprtrustchain.repository.UserRepository;

@Service
public class IdentityService {

    private static final Logger logger =
            LoggerFactory.getLogger(IdentityService.class);

    private final IdentityRepository identityRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public IdentityService(
            IdentityRepository identityRepository,
            UserRepository userRepository,
            AuditLogService auditLogService) {

        this.identityRepository = identityRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    public IdentityResponse createIdentity(Long userId) {

        logger.info(
                "Creating digital identity for user ID: {}",
                userId
        );

        if (identityRepository.existsByUserId(userId)) {

            logger.warn(
                    "Identity already exists for user ID: {}",
                    userId
            );

            throw new RuntimeException(
                    "Digital identity already exists for this user"
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        String did = "did:iprtrustchain:"
                + UUID.randomUUID();

        Identity identity = new Identity();

        identity.setUser(user);
        identity.setDid(did);

        Identity savedIdentity =
                identityRepository.save(identity);

        auditLogService.logAction(
                userId,
                AuditAction.IDENTITY_CREATED,
                "Digital identity created: " + did
        );

        logger.info(
                "Digital identity created successfully for user ID: {}",
                userId
        );

        return new IdentityResponse(
                savedIdentity.getId(),
                userId,
                savedIdentity.getDid()
        );
    }

    public IdentityResponse getIdentityByUserId(Long userId) {

        Identity identity = identityRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Digital identity not found"
                        )
                );

        return new IdentityResponse(
                identity.getId(),
                identity.getUser().getId(),
                identity.getDid()
        );
    }
}