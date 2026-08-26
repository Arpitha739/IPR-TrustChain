package com.iprtrustchain.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class QRCodeService {

    private final IntellectualPropertyRepository
            intellectualPropertyRepository;

    public QRCodeService(
            IntellectualPropertyRepository
                    intellectualPropertyRepository) {

        this.intellectualPropertyRepository =
                intellectualPropertyRepository;
    }

    public byte[] generateQRCode(
            String ipIdentifier
    ) throws Exception {

        IntellectualProperty intellectualProperty =
                intellectualPropertyRepository
                        .findByIpIdentifier(ipIdentifier)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Intellectual Property not found"
                                )
                        );

        String verificationUrl =
                "http://localhost:5173/verify/"
                + intellectualProperty.getIpIdentifier();

        QRCodeWriter qrCodeWriter =
                new QRCodeWriter();

        BitMatrix bitMatrix =
                qrCodeWriter.encode(
                        verificationUrl,
                        BarcodeFormat.QR_CODE,
                        300,
                        300
                );

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        MatrixToImageWriter.writeToStream(
                bitMatrix,
                "PNG",
                outputStream
        );

        return outputStream.toByteArray();
    }
}