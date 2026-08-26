package com.iprtrustchain.dto;

public record AdminDashboardResponse(

        long totalUsers,

        long totalIPs,

        long verifiedIPs,

        long pendingIPs,

        long totalDocuments,

        long blockchainRegistered,

        long totalVerifications,

        long successfulVerifications,

        long failedVerifications,

        long totalAuditLogs

) {
}