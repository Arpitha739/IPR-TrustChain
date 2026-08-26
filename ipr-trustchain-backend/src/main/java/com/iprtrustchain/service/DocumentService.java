package com.iprtrustchain.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.iprtrustchain.dto.DocumentResponse;
import com.iprtrustchain.entity.Document;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.DocumentRepository;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final IntellectualPropertyRepository intellectualPropertyRepository;
    private final AuditLogService auditLogService;
    private final HashService hashService;

    private static final String UPLOAD_DIR = "uploads/";

    public DocumentService(
            DocumentRepository documentRepository,
            IntellectualPropertyRepository intellectualPropertyRepository,
            AuditLogService auditLogService,
            HashService hashService) {

        this.documentRepository = documentRepository;
        this.intellectualPropertyRepository =
                intellectualPropertyRepository;
        this.auditLogService = auditLogService;
        this.hashService = hashService;
    }

    public DocumentResponse uploadDocument(
            Long ipId,
            MultipartFile file) throws IOException {

        IntellectualProperty intellectualProperty =
                intellectualPropertyRepository.findById(ipId)
                        .orElseThrow(() ->
                                new RuntimeException("IP not found")
                        );

        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName =
                file.getOriginalFilename();

        String uniqueFileName =
                UUID.randomUUID() + "_" + originalFileName;

        Path filePath =
                uploadPath.resolve(uniqueFileName);

        // Generate SHA-256 hash
        String fileHash;

        try {
            fileHash = hashService.generateSHA256(file);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to generate file hash",
                    e
            );
        }

        // Save physical file
        Files.copy(
                file.getInputStream(),
                filePath
        );

        // Create document entity
        Document document = new Document();

        document.setIntellectualProperty(
                intellectualProperty
        );

        document.setFileName(
                originalFileName
        );

        document.setFileType(
                file.getContentType()
        );

        document.setFilePath(
                filePath.toString()
        );

        document.setFileSize(
                file.getSize()
        );

        document.setFileHash(
                fileHash
        );

        // Save document metadata + hash
        Document savedDocument =
                documentRepository.save(document);

        // Create audit log
        auditLogService.logIPAction(
                intellectualProperty.getUser().getId(),
                intellectualProperty.getId(),
                AuditAction.DOCUMENT_UPLOADED,
                "Document uploaded: "
                        + originalFileName
                        + " | SHA-256 generated"
        );
        
        return new DocumentResponse(
                savedDocument.getId(),
                ipId,
                savedDocument.getFileName(),
                savedDocument.getFileType(),
                savedDocument.getFileSize(),
                savedDocument.getFileHash(),
                savedDocument.getUploadedAt()
        );
    }
}