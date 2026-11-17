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

## Running ShopWise Locally

### Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the Repository

```bash
git clone https://github.com/blastza/shopwise.git
cd shopwise
```

### 2. Configure Environment Variables

Create your local environment file:

```bash
cp .env.example .env
```

Generate a secure JWT secret:

```bash
openssl rand -hex 32
```

Open the `.env` file and replace the placeholder values with your database credentials and generated JWT secret.

### 3. Build and Start the Application

Run the following command from the project root directory:

```bash
docker compose up --build -d
```

Docker Compose will build and start the following services:

| Service | URL / Port |
|---|---|
| Frontend | http://localhost:8080 |
| Auth Service | http://localhost:8081 |
| Product Service | http://localhost:8082 |
| PostgreSQL | localhost:5433 |
| Redis | localhost:6380 |

### 4. Verify the Services

Check that all containers are running:

```bash
docker compose ps
```

### 5. View Application Logs

To view logs from all services:

```bash
docker compose logs -f
```

To view logs for a specific service:

```bash
docker compose logs -f auth-service
```

### 6. Stop the Application

Stop and remove the running containers:

```bash
docker compose down
```

Docker volumes are retained, so persistent database and Redis data remain available when the application is started again.

### Accessing the Application
Once all service are running, open the frontend:
```bash
http://localhost:8080
```
