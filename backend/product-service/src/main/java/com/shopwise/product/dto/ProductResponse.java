package com.shopwise.product.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ProductResponse {
    private UUID id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String categoryName;
    private UUID categoryId;
    private String imageUrl;
    private String sku;
    private Boolean isActive;
    private Double averageRating;
    private Integer reviewCount;
    private LocalDateTime createdAt;
}
