package com.shopwise.order.dto;

import jakarta.persistence.Column;

import java.util.UUID;

public class OrderRequest {
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    private UUID id;
    private String orderNumber;
}
