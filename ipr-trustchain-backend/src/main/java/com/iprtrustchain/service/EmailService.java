package com.iprtrustchain.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

@Service
public class EmailService {

    private final Resend resend;

    public EmailService(
            @Value("${RESEND_API_KEY}") String apiKey) {

        this.resend = new Resend(apiKey);
    }

    public void sendOtpEmail(String to, String otp) {

        try {

            CreateEmailOptions params =
                    CreateEmailOptions.builder()

                            .from("IPR TrustChain <onboarding@resend.dev>")

                            .to(to)

                            .subject(
                                    "IPR TrustChain - Password Reset OTP"
                            )

                            .html(
                                    "<h2>IPR TrustChain</h2>" +

                                    "<p>Your password reset OTP is:</p>" +

                                    "<h1>" + otp + "</h1>" +

                                    "<p>This OTP will expire in 10 minutes.</p>" +

                                    "<p>If you did not request this, please ignore this email.</p>"
                            )

                            .build();

            CreateEmailResponse response =
                    resend.emails().send(params);

            System.out.println(
                    "OTP email sent successfully: "
                            + response.getId()
            );

        } catch (ResendException e) {

            throw new RuntimeException(
                    "Failed to send OTP email: "
                            + e.getMessage()
            );
        }
    }
}