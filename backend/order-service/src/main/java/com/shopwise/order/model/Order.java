package com.shopwise.order.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders", schema = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "user_id", nullable = false)
    private UUID user_id;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;
    @Column(name = "total_amount", nullable = false)
    private BigDecimal total_amount;
    @Column(name = "shipping_address")
    private String shipping_address;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime created_at;
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updated_at;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}
