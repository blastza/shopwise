package com.shopwise.order.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.UUID;
import com.shopwise.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("""
    SELECT DISTINCT o
    FROM Order o
    LEFT JOIN FETCH o.items
    WHERE o.id = :orderId
    """)
    Optional<Order> findByIdWithItems(@Param("orderId") UUID userId);

}
