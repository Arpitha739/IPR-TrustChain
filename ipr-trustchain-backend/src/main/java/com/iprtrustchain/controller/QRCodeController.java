package com.iprtrustchain.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.service.QRCodeService;

@RestController
@RequestMapping("/api/qr")
public class QRCodeController {

    private final QRCodeService qrCodeService;

    public QRCodeController(QRCodeService qrCodeService) {

        this.qrCodeService = qrCodeService;
    }

    @GetMapping(
            value = "/{ipIdentifier}",
            produces = MediaType.IMAGE_PNG_VALUE
    )
    public ResponseEntity<byte[]> generateQRCode(
            @PathVariable String ipIdentifier)
            throws Exception {

        byte[] qrCode =
                qrCodeService.generateQRCode(ipIdentifier);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(qrCode);
    }
}