CREATE SCHEMA IF NOT EXISTS orders;
-- Data table orders
CREATE TABLE orders.orders (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            user_id UUID NOT NULL,
                            status VARCHAR(30) NOT NULL
                                CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
                            total_amount NUMERIC(12,2) NOT NULL
                                CHECK (total_amount >= 0),
                            shipping_address TEXT,
                            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Data table items
CREATE TABLE orders.order_items (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            order_id UUID NOT NULL,
                            product_id UUID NOT NULL,
                            quantity INTEGER NOT NULL
                                CHECK (quantity > 0),
                            product_name VARCHAR(225) NOT NULL,
                            unit_price NUMERIC(12, 2) NOT NULL
                                CHECK (unit_price >= 0),
                            CONSTRAINT fk_order_items_order
                                FOREIGN KEY (order_id)
                                REFERENCES orders.orders(id)
                                ON DELETE CASCADE,
                            CONSTRAINT uq_order_product
                                UNIQUE (order_id, product_id)
);