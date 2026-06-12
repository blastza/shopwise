package com.shopwise.product.service;

import com.shopwise.product.dto.ProductRequest;
import com.shopwise.product.dto.ProductResponse;
import com.shopwise.product.model.Category;
import com.shopwise.product.model.Product;
import com.shopwise.product.repository.CategoryRepository;
import com.shopwise.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j  // Lombok: gives us a log object for free
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // @Cacheable — before hitting DB, check Redis first
    // If found in Redis → return immediately (no DB call)
    // If not found → call DB, store result in Redis, return
    // Key = "products::{page}-{size}-{sort}"
    @Cacheable(value = "products", key = "#page + '-' + #size + '-' + #sortBy")
    public Page<ProductResponse> getAllProducts(int page, int size, String sortBy) {
        log.info("Fetching products from DB — page:{} size:{} sort:{}", page, size, sortBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return productRepository.findByIsActiveTrue(pageable).map(this::toResponse);
    }

    // @Cacheable with product ID as key
    @Cacheable(value = "product", key = "#id")
    public ProductResponse getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return toResponse(product);
    }

    // Search uses PostgreSQL full-text search — not cached (dynamic queries)
    public Page<ProductResponse> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.searchProducts(query, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> getProductsByCategory(UUID categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable)
                .map(this::toResponse);
    }

    public Page<ProductResponse> getProductsByPriceRange(
            BigDecimal min, BigDecimal max, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByIsActiveTrueAndPriceBetween(min, max, pageable)
                .map(this::toResponse);
    }

    // @CacheEvict — when a product is created, clear the products cache
    // so the next getAllProducts call fetches fresh data
    @Transactional
    @CacheEvict(value = "products", allEntries = true)
    public ProductResponse createProduct(ProductRequest request) {
        if (request.getSku() != null && productRepository.existsBySku(request.getSku())) {
            throw new RuntimeException("SKU already exists: " + request.getSku());
        }

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .category(category)
                .imageUrl(request.getImageUrl())
                .sku(request.getSku())
                .isActive(true)
                .build();

        return toResponse(productRepository.save(product));
    }

    @Transactional
    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public ProductResponse updateProduct(UUID id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        return toResponse(productRepository.save(product));
    }

    @Transactional
    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void deleteProduct(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Soft delete — set isActive = false instead of deleting from DB
        // This preserves order history
        product.setIsActive(false);
        productRepository.save(product);
    }

    // Private helper — converts Product entity to ProductResponse DTO
    private ProductResponse toResponse(Product product) {
        double avgRating = 0.0;
        int reviewCount = 0;

        if (product.getReviews() != null && !product.getReviews().isEmpty()) {
            reviewCount = product.getReviews().size();
            avgRating = product.getReviews().stream()
                    .mapToInt(r -> r.getRating())
                    .average()
                    .orElse(0.0);
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .imageUrl(product.getImageUrl())
                .sku(product.getSku())
                .isActive(product.getIsActive())
                .averageRating(avgRating)
                .reviewCount(reviewCount)
                .createdAt(product.getCreatedAt())
                .build();
    }
}
