package com.shopwise.order.client;

import com.shopwise.order.dto.ProductResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Component
public class ProductClient {

    private final RestTemplate restTemplate;

    public ProductClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ProductResponse getProductById(UUID productId) {
        String url = "http://localhost:8082//products/" + productId;

        return restTemplate.getForObject(url, ProductResponse.class);
    }
}
