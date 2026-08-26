package com.iprtrustchain.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ip_id", nullable = false)
    private IntellectualProperty intellectualProperty;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private String filePath;

    private Long fileSize;

    @Column(length = 64, unique = true)
    private String fileHash;
    
    @Column(unique = true)
    private String blockchainTransactionId;

    private LocalDateTime blockchainRegisteredAt;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    public void prePersist() {

        if (uploadedAt == null) {
            uploadedAt = LocalDateTime.now();
        }
    }
}