# Blockchain Wallet Microservices Project

## Project Overview

This project implements a microservices-based architecture for a blockchain wallet system, designed for the Network Management course. The implementation showcases the use of container-based solutions (Docker) for service deployment and orchestration, addressing the project requirements to design a microservice scenario using container-based solutions.

## Project Requirements

According to the project description, we were asked to:

1. Design a microservice scenario (web service, database, etc.) using container-based solutions like Docker or Podman.
2. Showcase the difference between traditional setup vs container-based solutions.
3. Create proper Docker images and configure setup via Docker Compose.
4. Implement visual tools for managing containers and editing them.
5. Research about troubleshooting in Docker via common tools.

## Architecture Overview

The project implements a wallet microservices architecture with the following components:

1. **Auth Microservice**: Handles user authentication, registration, and token management
2. **Blockchain-Wallets Microservice**: Manages blockchain wallet operations
3. **MongoDB Database**: Stores user and wallet information
4. **Common Library**: Shared code between microservices

### System Architecture Diagram

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│                 │     │                     │     │                 │
│  Client/User    │────▶│  Auth Microservice  │◀───▶│    MongoDB      │
│                 │     │                     │     │                 │
└─────────────────┘     └──────────┬──────────┘     └────────▲────────┘
                                   │                         │
                                   ▼                         │
                        ┌─────────────────────┐              │
                        │                     │              │
                        │ Blockchain-Wallets  │──────────────┘
                        │   Microservice      │
                        │                     │
                        └─────────────────────┘
```

## Technical Implementation

### 1. NestJS Monorepo Setup

The project is implemented as a NestJS monorepo, which allows us to share code between microservices while maintaining separation of concerns. The monorepo structure includes:

- **apps/**: Contains the microservices applications
  - **auth/**: Authentication microservice
  - **blockchain-wallets/**: Blockchain wallet operations microservice
- **libs/**: Contains shared libraries
  - **common/**: Shared code, models, and utilities

### 2. Auth Microservice

The Authentication microservice is responsible for:

- User registration and login
- JWT token generation and validation
- Refresh token management
- User profile management

Key components:
- JWT-based authentication
- Passport strategies for local and JWT authentication
- Refresh token rotation for enhanced security
- MongoDB for user data storage
- TCP microservice endpoint for internal service validation

### 3. Blockchain-Wallets Microservice

The Blockchain-Wallets microservice handles:

- Creation of Tron blockchain wallets (testnet and mainnet)
- Association of wallets with user accounts
- Storage of wallet information

Key components:
- TronWeb integration for blockchain operations
- Communication with Auth microservice for user validation
- MongoDB for wallet data storage

### 4. Common Library

The common library provides shared functionality:

- Database abstractions and models
- Authentication guards
- User DTOs and interfaces
- Logging interceptors

### 5. Containerization with Docker

Each component of the system is containerized using Docker:

- **MongoDB**: Uses the official MongoDB Docker image
- **Auth Microservice**: Custom Docker image based on Node.js Alpine
- **Blockchain-Wallets Microservice**: Custom Docker image based on Node.js Alpine

The Docker setup enables:
- Isolated execution environments
- Consistent deployment across different platforms
- Scalable architecture
- Easy configuration through environment variables

## Traditional Setup vs. Container-Based Solutions

### Traditional Setup

In a traditional setup, services would be deployed directly on the host system:

1. **Complexity**: Need to install and configure MongoDB, Node.js, and dependencies directly on the host
2. **Environment Consistency**: Difficult to maintain consistent environments across development and production
3. **Scaling**: Manual scaling and load balancing
4. **Deployment**: Complex deployment processes with potential for configuration drift
5. **Resource Isolation**: Limited isolation between services
6. **Dependency Management**: Potential for dependency conflicts between services

### Container-Based Solution (Current Implementation)

With our Docker-based approach:

1. **Simplicity**: Each service runs in its own container with all dependencies pre-configured
2. **Environment Consistency**: Identical environments across development, testing, and production
3. **Scaling**: Easy horizontal scaling of services
4. **Deployment**: Simple deployment with Docker Compose
5. **Resource Isolation**: Complete isolation between services
6. **Dependency Management**: Each service has its own dependencies without conflicts

## Docker Implementation Details

### Docker Images

1. **Auth Microservice Dockerfile**:
   - Multi-stage build for optimized image size
   - Development stage for building the application
   - Production stage with only the necessary runtime dependencies

2. **Blockchain-Wallets Microservice Dockerfile**:
   - Similar multi-stage build approach
   - Optimized for production use

### Docker Compose Configuration

The `docker-compose.yml` file orchestrates all services:

- **MongoDB**: Configuration for the database container
- **Auth Microservice**: Configuration including environment variables and network settings
- **Blockchain-Wallets Microservice**: Configuration with dependencies on the Auth service

Benefits of using Docker Compose:
- Single command to start the entire system
- Declarative configuration
- Network isolation
- Volume management for persistent data
- Health checks for service dependencies

## Managing and Monitoring Containers

Several tools can be used to manage and monitor the Docker containers:

1. **Docker Desktop**: Provides a GUI for managing containers, images, volumes, and networks
2. **Portainer**: Web-based management UI for Docker environments
3. **cAdvisor**: Container resource usage and performance analysis
4. **Prometheus & Grafana**: Monitoring and visualization of container metrics

## Troubleshooting Docker Containers

Common troubleshooting techniques for Docker:

1. **Container Logs**: 
   ```bash
   docker logs [container_name]
   ```

2. **Checking Container Status**:
   ```bash
   docker ps -a
   ```

3. **Inspecting Container Configuration**:
   ```bash
   docker inspect [container_name]
   ```

4. **Accessing Container Shell**:
   ```bash
   docker exec -it [container_name] sh
   ```

5. **Network Diagnostics**:
   ```bash
   docker network inspect wallet-network
   ```

6. **Monitoring Resource Usage**:
   ```bash
   docker stats
   ```

## Running the Project

To run the project on a Windows machine:

1. Install Docker Desktop for Windows
2. Clone the repository
3. Navigate to the project root directory
4. Run `docker-compose up -d`
5. Set up the database user:
   ```bash
   docker exec -it mongodb-blockchainwallets mongosh admin -u dbadmin -p dbpass --eval "db.getSiblingDB('blockchainwalletsdb').createUser({user: 'walletsDBUser', pwd: 'walletsDBPassword', roles: ['readWrite', 'dbAdmin', 'dbOwner']})"
   ```
6. Access the services:
   - Auth Microservice: http://localhost:3001
   - Auth Swagger Documentation: http://localhost:3001/authSwagger
   - Blockchain-Wallets Microservice: http://localhost:3003
   - Blockchain-Wallets Swagger Documentation: http://localhost:3003/walletsSwagger

## API Endpoints

### Auth Microservice

1. **POST /authMicroservice/auth/signup**: Register a new user
2. **POST /authMicroservice/auth/login**: Login with email and password
3. **POST /authMicroservice/auth/refreshToken**: Refresh access token
4. **GET /authMicroservice/users**: Get current user information
5. **GET /authMicroservice/users/getAllUsers**: Get all users (admin)
6. **PATCH /authMicroservice/users/updateProfile**: Update user profile

### Blockchain-Wallets Microservice

1. **GET /blockchainWalletsMicroservice/wallets/createTestNetWallet**: Create a Tron testnet wallet
2. **GET /blockchainWalletsMicroservice/wallets/createMainNetWallet**: Create a Tron mainnet wallet

## Conclusion

This project successfully implements a container-based microservices architecture for a blockchain wallet system. The implementation demonstrates the advantages of using Docker for service deployment and orchestration, including environment consistency, simplified deployment, service isolation, and scalability.

The project fulfills all the requirements specified in the project description:
1. ✅ Design of a microservice scenario using container-based solutions
2. ✅ Demonstration of differences between traditional and container-based approaches
3. ✅ Creation of proper Docker images and configuration with Docker Compose
4. ✅ Implementation of tools for managing and monitoring containers
5. ✅ Documentation of Docker troubleshooting techniques 