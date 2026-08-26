package com.iprtrustchain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.AdminIPResponse;
import com.iprtrustchain.entity.IntellectualProperty;
import com.iprtrustchain.repository.IntellectualPropertyRepository;

@Service
public class AdminIPService {

    private final IntellectualPropertyRepository
            intellectualPropertyRepository;

    public AdminIPService(

            IntellectualPropertyRepository
                    intellectualPropertyRepository
    ) {

        this.intellectualPropertyRepository =
                intellectualPropertyRepository;
    }


    public List<AdminIPResponse> getAllIPAssets() {

        return intellectualPropertyRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    private AdminIPResponse mapToResponse(

            IntellectualProperty ip
    ) {

        return new AdminIPResponse(

                ip.getId(),

                ip.getIpIdentifier(),

                ip.getTitle(),

                ip.getDescription(),

                ip.getType().name(),

                ip.getStatus().name(),

                ip.getUser().getId(),

                ip.getUser().getName(),

                ip.getUser().getEmail(),

                ip.getCreatedAt()
        );
    }
}