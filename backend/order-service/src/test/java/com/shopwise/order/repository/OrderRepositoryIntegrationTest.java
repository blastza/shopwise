package com.shopwise.order.repository;

import com.shopwise.order.model.Order;
import com.shopwise.order.model.OrderItem;
import com.shopwise.order.model.OrderStatus;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.util.UUID;
import com.shopwise.order.repository.OrderItemRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
class OrderRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>("postgres:16-alpine")
                    .withDatabaseName("shopwise_test")
                    .withUsername("test")
                    .withPassword("test");

    @DynamicPropertySource
    static void configureDatabase(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Test
    void shouldSaveOrderWithThreeItems() {
        // We'll implement this next.
        // Arrange: Create an order
        Order order = new Order();

        order.setUserId(UUID.randomUUID());
        order.setStatus(OrderStatus.PENDING);
        order.setTotalAmount(new BigDecimal("350.00"));
        order.setShippingAddress("123 Main Street, Johannesburg");

        // Arrange: Create the first item
        OrderItem item1 = new OrderItem();
        item1.setProductId(UUID.randomUUID());
        item1.setProductName("Keyboard");
        item1.setQuantity(1);
        item1.setUnitPrice(new BigDecimal("150.00"));

        // Arrange: Create the second item
        OrderItem item2 = new OrderItem();
        item2.setProductId(UUID.randomUUID());
        item2.setProductName("Mouse");
        item2.setQuantity(1);
        item2.setUnitPrice(new BigDecimal("100.00"));

        // Arrange: Create the third item
        OrderItem item3 = new OrderItem();
        item3.setProductId(UUID.randomUUID());
        item3.setProductName("Mouse Pad");
        item3.setQuantity(1);
        item3.setUnitPrice(new BigDecimal("100.00"));

        // Connect items to their parent order
        order.addItem(item1);
        order.addItem(item2);
        order.addItem(item3);

        // Act: Save the order
        Order savedOrder = orderRepository.saveAndFlush(order);

        Order retrievedOrder = orderRepository
                .findByIdWithItems(savedOrder.getId())
                .orElseThrow();

        // Assert: Verify the order
        assertNotNull(retrievedOrder.getId());
        assertEquals(OrderStatus.PENDING, retrievedOrder.getStatus());
        assertEquals(new BigDecimal("350.00"), retrievedOrder.getTotalAmount());

        // Assert: Verify the three items
        assertEquals(3, retrievedOrder.getItems().size());

        // Assert: Verify item relationships
        for (OrderItem item : retrievedOrder.getItems()) {
            assertNotNull(item.getId());
            assertNotNull(item.getOrder());
            assertEquals(retrievedOrder.getId(), item.getOrder().getId());
        }

        orderRepository.delete(retrievedOrder);
        orderRepository.flush();

        assertFalse(orderRepository.existsById(savedOrder.getId()));
        assertTrue(orderItemRepository.findByOrderId(savedOrder.getId()).isEmpty());
    }


    @Test
    void shouldDeleteOrderItemWhenRemovedFromOrder() {
        // Arrange: Create an order
        Order order = new Order();
        order.setUserId(UUID.randomUUID());
        order.setStatus(OrderStatus.PENDING);
        order.setTotalAmount(new BigDecimal("350.00"));
        order.setShippingAddress("123 Main Street, Johannesburg");

        // Arrange: Create three items
        OrderItem keyboard = new OrderItem();
        keyboard.setProductId(UUID.randomUUID());
        keyboard.setProductName("Keyboard");
        keyboard.setQuantity(1);
        keyboard.setUnitPrice(new BigDecimal("150.00"));

        OrderItem mouse = new OrderItem();
        mouse.setProductId(UUID.randomUUID());
        mouse.setProductName("Mouse");
        mouse.setQuantity(1);
        mouse.setUnitPrice(new BigDecimal("100.00"));

        OrderItem mousePad = new OrderItem();
        mousePad.setProductId(UUID.randomUUID());
        mousePad.setProductName("Mouse Pad");
        mousePad.setQuantity(1);
        mousePad.setUnitPrice(new BigDecimal("100.00"));

        order.addItem(keyboard);
        order.addItem(mouse);
        order.addItem(mousePad);

        // Act: Save the order
        Order savedOrder = orderRepository.saveAndFlush(order);

        // Act: Remove the keyboard
        savedOrder.getItems().remove(keyboard);

        orderRepository.saveAndFlush(savedOrder);

        // Assert: Verify only two items remain
        assertEquals(2, orderItemRepository.findByOrderId(savedOrder.getId()).size());
    }
}