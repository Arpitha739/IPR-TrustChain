package com.iprtrustchain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iprtrustchain.entity.AuditLog;
import com.iprtrustchain.enums.AuditAction;

@Repository
public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByIpIdOrderByTimestampAsc(Long ipId);

    List<AuditLog> findByUserIdOrderByTimestampDesc(Long userId);
 
    long countByAction(AuditAction action);
    
    long countByActionAndDescriptionStartingWith(
            AuditAction action,
            String description
    );
    
    List<AuditLog> findAllByOrderByTimestampDesc();

}