package com.shopwise.product.repository;

import com.shopwise.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    // Basic filter
    Page<Product> findByIsActiveTrue(Pageable pageable);
    Page<Product> findByCategoryIdAndIsActiveTrue(UUID categoryId, Pageable pageable);

    // Full-text search using PostgreSQL's built-in FTS
    // to_tsvector converts text to searchable tokens
    // to_tsquery converts search term to query
    // @@ is the match operator
    @Query(value = """
        SELECT * FROM products.products
        WHERE is_active = true
        AND to_tsvector('english', name || ' ' || COALESCE(description, ''))
            @@ plainto_tsquery('english', :query)
        """, nativeQuery = true)
    Page<Product> searchProducts(@Param("query") String query, Pageable pageable);

    // Price range filter
    Page<Product> findByIsActiveTrueAndPriceBetween(
            BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    boolean existsBySku(String sku);
}
