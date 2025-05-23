<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Blockchain Wallet Microservices

## Project Overview

This project implements a microservices-based architecture for a blockchain wallet system, designed for the Network Management course. The implementation showcases the use of container-based solutions (Docker) for service deployment and orchestration.

### System Architecture Diagram

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│                 │     │                     │     │                 │
│  Client/User    │────▶│  Auth Microservice  │◀───▶│    MongoDB     │
│                 │     │                     │     │                 │
└─────────────────┘     └──────────▲──────────┘     └────────▲────────┘
                                   │                         │
                                   ▼                         │
                        ┌─────────────────────┐              │
                        │                     │              │
                        │ Blockchain-Wallets  │──────────────┘
                        │   Microservice      │
                        │                     │
                        └─────────────────────┘
```

## Project Structure

```
WalletMicroservices/
├── apps/
│   ├── auth/                  # Authentication microservice
│   └── blockchain-wallets/    # Blockchain wallet operations microservice
├── libs/
│   └── common/                # Shared code and utilities
├── docker-compose.yml         # Main Docker Compose configuration
├── docker-compose-local.yml   # Development Docker Compose configuration
└── docker-compose-prod.yml    # Production Docker Compose configuration
```

## Technical Implementation

### NestJS Monorepo Setup

The project is implemented as a NestJS monorepo, which allows sharing code between microservices while maintaining separation of concerns:

- **apps/auth/**: Authentication microservice
  - User registration and login
  - JWT token generation and validation
  - Refresh token management
  - User profile management

- **apps/blockchain-wallets/**: Blockchain wallet operations microservice
  - Creation of Tron blockchain wallets (testnet and mainnet)
  - Association of wallets with user accounts
  - Storage of wallet information

- **libs/common/**: Shared code, models, and utilities
  - Database abstractions and models
  - Authentication guards
  - User DTOs and interfaces
  - Logging interceptors

### Containerization with Docker

Each component of the system is containerized using Docker:

- **MongoDB**: Uses the official MongoDB Docker image
- **Auth Microservice**: Custom Docker image based on Node.js Alpine
- **Blockchain-Wallets Microservice**: Custom Docker image based on Node.js Alpine

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

With the Docker-based approach:

1. **Simplicity**: Each service runs in its own container with all dependencies pre-configured
2. **Environment Consistency**: Identical environments across development, testing, and production
3. **Scaling**: Easy horizontal scaling of services
4. **Deployment**: Simple deployment with Docker Compose
5. **Resource Isolation**: Complete isolation between services
6. **Dependency Management**: Each service has its own dependencies without conflicts

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- pnpm (for local development)

### Running with Docker Compose

#### Development Environment

```bash
# Start the development environment
docker-compose -f docker-compose-local.yml up -d

# Check container status
docker-compose -f docker-compose-local.yml ps

# View logs
docker-compose -f docker-compose-local.yml logs -f
```

#### Production Environment

```bash
# Start the production environment
docker-compose -f docker-compose-prod.yml up -d

# Check container status
docker-compose -f docker-compose-prod.yml ps
```

#### Setting Up the Database User

After first run, execute this command to create the database user:
```bash
docker exec -it mongodb-blockchainwallets mongosh admin -u dbadmin -p dbpass --eval "db.getSiblingDB('blockchainwalletsdb').createUser({user: 'walletsDBUser', pwd: 'walletsDBPassword', roles: ['readWrite', 'dbAdmin', 'dbOwner']})"
```

### Local Development (without Docker)

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run start:dev

# Build for production
pnpm run build
```

## API Endpoints

### Auth Microservice (port 3001)

- **POST /authMicroservice/auth/signup**: Register a new user
- **POST /authMicroservice/auth/login**: Login with email and password
- **POST /authMicroservice/auth/refreshToken**: Refresh access token
- **GET /authMicroservice/users**: Get current user information
- **GET /authMicroservice/users/getAllUsers**: Get all users (admin)
- **PATCH /authMicroservice/users/updateProfile**: Update user profile

### Blockchain-Wallets Microservice (port 3003)

- **GET /blockchainWalletsMicroservice/wallets/createTestNetWallet**: Create a Tron testnet wallet
- **GET /blockchainWalletsMicroservice/wallets/createMainNetWallet**: Create a Tron mainnet wallet

## Swagger Documentation

- Auth Service: http://localhost:3001/authSwagger
- Blockchain Wallets Service: http://localhost:3003/walletsSwagger

## Docker Commands and Troubleshooting

### Managing Containers

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker logs auth-service
docker logs blockchain-wallets-service
docker logs mongodb-blockchainwallets

# Enter container shell
docker exec -it auth-service sh
docker exec -it blockchain-wallets-service sh
docker exec -it mongodb-blockchainwallets bash

# Check container status
docker ps -a

# Inspect container configuration
docker inspect [container_name]

# Network diagnostics
docker network inspect wallet-network

# Monitor resource usage
docker stats
```

### Database Commands

```bash
# Access MongoDB shell
docker exec -it mongodb-blockchainwallets mongosh admin -u dbadmin -p dbpass

# Create database user (if not using mongo-setup service)
db.getSiblingDB('blockchainwalletsdb').createUser({
  user: "walletsDBUser",
  pwd: "walletsDBPassword",
  roles: ["readWrite", "dbAdmin", "dbOwner"]
});
```

## Container Management Tools

Several tools can be used to manage and monitor Docker containers:

1. **Docker Desktop**: Provides a GUI for managing containers, images, volumes, and networks
2. **Portainer**: Web-based management UI for Docker environments
3. **cAdvisor**: Container resource usage and performance analysis
4. **Prometheus & Grafana**: Monitoring and visualization of container metrics

## Environment Variables

Each microservice uses environment variables for configuration. Sample values are included in the Docker Compose files.

### Auth Microservice

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token signing
- `JWT_EXPIRATION`: JWT token expiration time in seconds
- `JWT_REFRESH_TOKEN_SECRET`: Secret for refresh token signing
- `JWT_REFRESH_TOKEN_EXPIRATION`: Refresh token expiration time in seconds
- `HTTP_PORT`: HTTP port for the service
- `TCP_PORT`: TCP port for microservice communication
- `API_KEY_SECRET_KEY`: API key for securing communications

### Blockchain-Wallets Microservice

- `MONGODB_URI`: MongoDB connection string
- `HTTP_PORT`: HTTP port for the service
- `TCP_PORT`: TCP port for microservice communication
- `TRON_PRO_API_KEY`: API key for Tron blockchain operations
- `AUTH_HOST`: Hostname of the Auth service
- `AUTH_PORT`: TCP port of the Auth service

## Conclusion

This project successfully implements a container-based microservices architecture for a blockchain wallet system. The implementation demonstrates the advantages of using Docker for service deployment and orchestration, including environment consistency, simplified deployment, service isolation, and scalability.

## License

This project is [MIT licensed](LICENSE).
