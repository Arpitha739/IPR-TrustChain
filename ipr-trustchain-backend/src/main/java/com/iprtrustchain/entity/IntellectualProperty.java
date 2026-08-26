package com.iprtrustchain.entity;

import java.time.LocalDateTime;

import com.iprtrustchain.enums.IPStatus;
import com.iprtrustchain.enums.IPType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "intellectual_properties")
@Getter
@Setter
public class IntellectualProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String ipIdentifier;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IPType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IPStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}