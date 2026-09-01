package com.iprtrustchain.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.AuthResponse;
import com.iprtrustchain.dto.ForgotPasswordRequest;
import com.iprtrustchain.dto.LoginRequest;
import com.iprtrustchain.dto.RegisterRequest;
import com.iprtrustchain.dto.ResetPasswordRequest;
import com.iprtrustchain.entity.User;
import com.iprtrustchain.enums.AuditAction;
import com.iprtrustchain.repository.UserRepository;
import com.iprtrustchain.security.JwtService;

@Service
public class AuthService {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;
    private final JwtService jwtService;
    private final IdentityService identityService;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuditLogService auditLogService,
            JwtService jwtService,
            IdentityService identityService,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.auditLogService = auditLogService;
        this.jwtService = jwtService;
        this.identityService = identityService;
        this.emailService = emailService;
    }

    public String register(RegisterRequest request) {

        logger.info(
                "Registration attempt for email: {}",
                request.getEmail()
        );

        if (userRepository.existsByEmail(request.getEmail())) {

            logger.warn(
                    "Registration failed. Email already exists: {}",
                    request.getEmail()
            );

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setOrganization(request.getOrganization());
        user.setCountry(request.getCountry());
        user.setRole(request.getRole());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        auditLogService.logAction(
                savedUser.getId(),
                AuditAction.USER_CREATED,
                "New user registered with email: "
                        + savedUser.getEmail()
        );

        if (savedUser.getRole().name().equals("CREATOR")) {

            identityService.createIdentity(
                    savedUser.getId()
            );
        }

        logger.info(
                "User registered successfully. User ID: {}",
                user.getId()
        );

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {

        logger.info(
                "Login attempt for email: {}",
                request.getEmail()
        );

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            logger.warn(
                    "Failed login attempt for email: {}",
                    request.getEmail()
            );

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(
                user.getEmail()
        );

        auditLogService.logAction(
                user.getId(),
                AuditAction.USER_LOGIN,
                "User logged in successfully"
        );

        logger.info(
                "Login successful for user ID: {}",
                user.getId()
        );

        return new AuthResponse(
                token,
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    public String forgotPassword(
            ForgotPasswordRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with this email"
                        )
                );

        String otp = String.format(
                "%06d",
                new Random().nextInt(999999)
        );

        user.setResetOtp(otp);

        user.setResetOtpExpiry(
                LocalDateTime.now().plusMinutes(10)
        );

        userRepository.save(user);

        // Send OTP using Resend
        emailService.sendOtpEmail(
                user.getEmail(),
                otp
        );

        logger.info(
                "Password reset OTP sent to user ID: {}",
                user.getId()
        );

        return "OTP sent successfully to your email";
    }

    // =========================
    // RESET PASSWORD
    // =========================

    public String resetPassword(
            ResetPasswordRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        if (user.getResetOtp() == null ||
                !user.getResetOtp()
                        .equals(request.getOtp())) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        if (user.getResetOtpExpiry() == null ||
                LocalDateTime.now()
                        .isAfter(
                                user.getResetOtpExpiry()
                        )) {

            throw new RuntimeException(
                    "OTP has expired"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        user.setResetOtp(null);
        user.setResetOtpExpiry(null);

        userRepository.save(user);

        auditLogService.logAction(
                user.getId(),
                AuditAction.USER_LOGIN,
                "Password reset successfully"
        );

        logger.info(
                "Password reset successful for user ID: {}",
                user.getId()
        );

        return "Password reset successfully";
    }
}