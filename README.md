<img width="750" height="476" alt="Screenshot_2026-11-17_18-07-24" src="https://github.com/user-attachments/assets/b8d2b5ae-6d02-40b8-bf42-e484fcd151fc" />
<img width="750" height="476" alt="Screenshot_2026-11-17_18-07-24" src="https://github.com/user-attachments/assets/5f22dc6b-cfa9-4d84-940f-ccb9642c6c1c" />
# ShopWise

## Overview

ShopWise is a full-stack e-commerce application designed to demonstrate the development of a modern web-based shopping platform.

The application uses a microservices-oriented backend architecture, with separate services responsible for authentication and product management. It uses JWT-based authentication, PostgreSQL for persistent data storage, and Redis for caching.

The frontend is built with React and communicates with the backend services through REST APIs.

## Features

- User registration and login
- JWT-based authentication
- Product browsing and product detail pages
- Product search and category-based browsing
- RESTful API development
- PostgreSQL database integration
- Redis caching
- Docker containerization
- Multi-service orchestration using Docker Compose


## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA / Hibernate
- PostgreSQL
- Redis
- REST APIs

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS

### Infrastructure
- Docker
- Docker Compose
- AWS EC2
- GitHub Actions

## Project Structure
<img width="750" height="476" alt="Screenshot_2026-11-17_18-07-24" src="https://github.com/user-attachments/assets/820651ab-572c-4480-9e2f-c5c244243004" />

### Backend Services

  - Auth Service: Handles user registration, login, and JWT authentication.

  - Product Service: Handles product management, product retrieval, categories, and Redis caching.

### Frontend

  - The React frontend provides the user interface for browsing products, viewing product details, registering, and logging in.

### Infrastructure

  - Contains database initialization scripts and Docker configuration for running the application.
