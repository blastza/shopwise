package com.shopwise.order.service;

import com.shopwise.order.client.ProductClient;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final ProductClient productClient;

    public OrderService(ProductClient productClient) {
        this.productClient = productClient;
    }
}
