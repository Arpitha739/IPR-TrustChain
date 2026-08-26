package com.iprtrustchain.entity;

import java.time.LocalDateTime;

import com.iprtrustchain.enums.Role;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String mobile;

    private String organization;

    private String country;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private String resetOtp;

    private LocalDateTime resetOtpExpiry;

    @PrePersist
    public void prePersist() {

        this.createdAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = "ACTIVE";
        }
    }
}