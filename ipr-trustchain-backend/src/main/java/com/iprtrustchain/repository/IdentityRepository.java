package com.iprtrustchain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iprtrustchain.entity.Identity;

@Repository
public interface IdentityRepository
        extends JpaRepository<Identity, Long> {

    Optional<Identity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}