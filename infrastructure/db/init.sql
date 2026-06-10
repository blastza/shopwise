-- Create separate schemas per service (microservice-ready)
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS products;
CREATE SCHEMA IF NOT EXISTS orders;

-- Auth schema
CREATE TABLE auth.users (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            email VARCHAR(255) UNIQUE NOT NULL,
                            password_hash VARCHAR(255) NOT NULL,
                            role VARCHAR(50) DEFAULT 'CUSTOMER',
                            first_name VARCHAR(100),
                            last_name VARCHAR(100),
                            created_at TIMESTAMP DEFAULT NOW(),
                            updated_at TIMESTAMP DEFAULT NOW()
);

-- Products schema
CREATE TABLE products.categories (
                                     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                     name VARCHAR(100) NOT NULL,
                                     slug VARCHAR(100) UNIQUE NOT NULL,
                                     description TEXT
);

CREATE TABLE products.products (
                                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                   name VARCHAR(255) NOT NULL,
                                   description TEXT,
                                   price DECIMAL(10,2) NOT NULL,
                                   stock_quantity INTEGER DEFAULT 0,
                                   category_id UUID REFERENCES products.categories(id),
                                   image_url VARCHAR(500),
                                   sku VARCHAR(100) UNIQUE,
                                   is_active BOOLEAN DEFAULT true,
                                   created_at TIMESTAMP DEFAULT NOW(),
                                   updated_at TIMESTAMP DEFAULT NOW()
);

-- Full-text search index (PostgreSQL FTS)
CREATE INDEX idx_products_fts ON products.products
    USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Orders schema
CREATE TABLE orders.orders (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               user_id UUID NOT NULL,
                               status VARCHAR(50) DEFAULT 'PENDING',
                               total_amount DECIMAL(10,2) NOT NULL,
                               shipping_address JSONB,
                               created_at TIMESTAMP DEFAULT NOW(),
                               updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders.order_items (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    order_id UUID REFERENCES orders.orders(id),
                                    product_id UUID NOT NULL,
                                    quantity INTEGER NOT NULL,
                                    unit_price DECIMAL(10,2) NOT NULL
);

-- Reviews
CREATE TABLE products.reviews (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  product_id UUID REFERENCES products.products(id),
                                  user_id UUID NOT NULL,
                                  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                                  comment TEXT,
                                  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed categories
INSERT INTO products.categories (name, slug, description) VALUES
                                                              ('Electronics', 'electronics', 'Phones, laptops, gadgets'),
                                                              ('Clothing', 'clothing', 'Fashion and apparel'),
                                                              ('Books', 'books', 'Physical and digital books'),
                                                              ('Home & Garden', 'home-garden', 'Furniture, tools, decor');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA auth TO shopwise;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA products TO shopwise;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA orders TO shopwise;