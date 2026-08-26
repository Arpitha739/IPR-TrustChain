package com.iprtrustchain.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iprtrustchain.dto.DocumentResponse;
import com.iprtrustchain.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(
            DocumentService documentService) {

        this.documentService =
                documentService;
    }


    @PostMapping("/upload")
    public ResponseEntity<DocumentResponse> uploadDocument(

            @RequestParam("ipId")
            Long ipId,

            @RequestParam("file")
            MultipartFile file

    ) throws IOException {

        return ResponseEntity.ok(

                documentService.uploadDocument(
                        ipId,
                        file
                )

        );

    }

}