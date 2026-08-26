package com.iprtrustchain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.enums.IPStatus;

import java.util.Optional;

@Repository
public interface IntellectualPropertyRepository
        extends JpaRepository<IntellectualProperty, Long> {

    List<IntellectualProperty> findByUserId(Long userId);

    boolean existsByIpIdentifier(String ipIdentifier);
    
    Optional<IntellectualProperty> findByIpIdentifier(
            String ipIdentifier
    );
    
    long countByStatus(IPStatus status);
}