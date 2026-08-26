package com.iprtrustchain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iprtrustchain.dto.AdminDashboardResponse;
import com.iprtrustchain.dto.AdminUserResponse;
import com.iprtrustchain.service.AdminDashboardService;
import com.iprtrustchain.service.AdminUserService;

import com.iprtrustchain.dto.AdminIPResponse;
import com.iprtrustchain.service.AdminIPService;

import com.iprtrustchain.dto.AdminAuditLogResponse;
import com.iprtrustchain.service.AdminAuditLogService;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService
            adminDashboardService;

    private final AdminUserService
            adminUserService;
    
    private final AdminIPService adminIPService;
    
    private final AdminAuditLogService
    adminAuditLogService;


    public AdminDashboardController(

            AdminDashboardService
                    adminDashboardService,

            AdminUserService
                    adminUserService,

            AdminIPService
                    adminIPService,

            AdminAuditLogService
                    adminAuditLogService
    ) {

        this.adminDashboardService =
                adminDashboardService;

        this.adminUserService =
                adminUserService;

        this.adminIPService =
                adminIPService;

        this.adminAuditLogService =
                adminAuditLogService;
    }


    @GetMapping("/statistics")
    public ResponseEntity<AdminDashboardResponse>
            getDashboardStatistics() {

        return ResponseEntity.ok(

                adminDashboardService
                        .getDashboardStatistics()
        );
    }


    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>>
            getAllUsers() {

        return ResponseEntity.ok(

                adminUserService
                        .getAllUsers()
        );
    }
    
    @GetMapping("/ip-assets")
    public ResponseEntity<List<AdminIPResponse>>
            getAllIPAssets() {

        return ResponseEntity.ok(

                adminIPService
                        .getAllIPAssets()
        );
    }
    
    @GetMapping("/audit-logs")
    public ResponseEntity<List<AdminAuditLogResponse>>
            getAllAuditLogs() {

        return ResponseEntity.ok(

                adminAuditLogService
                        .getAllAuditLogs()
        );
    }
}