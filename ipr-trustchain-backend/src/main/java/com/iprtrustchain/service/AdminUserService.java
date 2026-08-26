package com.iprtrustchain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iprtrustchain.dto.AdminUserResponse;
import com.iprtrustchain.entity.User;
import com.iprtrustchain.repository.UserRepository;

@Service
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public List<AdminUserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AdminUserResponse mapToResponse(
            User user) {

        return new AdminUserResponse(

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getMobile(),

                user.getOrganization(),

                user.getCountry(),

                user.getRole().name(),

                user.getCreatedAt()
        );
    }
}