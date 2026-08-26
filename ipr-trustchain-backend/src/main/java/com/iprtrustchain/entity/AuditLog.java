package com.iprtrustchain.entity;

import java.time.LocalDateTime;

import com.iprtrustchain.enums.AuditAction;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long ipId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuditAction action;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist() {

        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }

    }

}