# Technical Architecture Documentation

## System Architecture Overview

TARS is built as a microservices-based architecture with the following key components:

```mermaid
flowchart TD
    subgraph User
        Browser["Web Frontend (Next.js)"]
        Slack["Slack Client (Socket Mode)"]
    end

    subgraph Nginx
        Nginx["Nginx Reverse Proxy"]
    end

    subgraph Backend
        API["API Backend (FastAPI)"]
        Celery["Celery Workers"]
    end

    subgraph ML
        Inference["Inference Model Server"]
        Embedding["Embedding Model"]
    end

    subgraph Data
        Vespa["Vespa Search Engine"]
        Postgres["Postgres DB"]
        Redis["Redis Cache"]
    end

    Browser -->|HTTP| Nginx
    Slack -->|Socket Mode| API
    Nginx -->|/api/*| API
    Nginx -->|/| Browser
    Browser -->|API Calls| API

    API -->|Task Queue| Celery
    API -->|DB| Postgres
    API -->|Cache| Redis
    API -->|Search| Vespa
    API -->|Model| Inference
    API -->|Model| Embedding
    Celery -->|DB| Postgres
    Celery -->|Cache| Redis
    Celery -->|Search| Vespa
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with custom themes
- **State Management**: React hooks and context
- **UI Components**: Custom component library with shadcn/ui
- **Build Tool**: Vite (via Next.js)
- **Package Manager**: npm/yarn

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Async Support**: Full async/await implementation
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **Authentication**: FastAPI Users with OAuth2 support
- **Background Tasks**: Celery with Redis backend
- **Supervisor**: Process management for multiple services

### Database & Storage
- **Primary Database**: PostgreSQL 15.2
- **Caching**: Redis 7.4
- **Search Engine**: Vespa 8.526.15
- **File Storage**: Local filesystem with blob storage support
- **Migrations**: Alembic for database schema management

### AI/ML Services
- **Embedding Models**: HuggingFace Transformers (sentence-transformers/all-MiniLM-L6-v2)
- **Inference Engine**: Custom model server with GPU support
- **Text Processing**: Custom chunking and classification
- **Vector Search**: Vespa with custom ranking algorithms

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose (dev), Kubernetes (prod)
- **Reverse Proxy**: Nginx with custom routing
- **Load Balancing**: Nginx upstream configuration
- **Health Checks**: Built-in health endpoints

### External Integrations
- **40+ Connectors**: Slack, Confluence, Google Drive, GitHub, Notion, etc.
- **OAuth Providers**: Google, Microsoft, custom OIDC
- **File Processing**: PDF, DOCX, PPTX, image OCR
- **Email**: SMTP integration for notifications

## Repository Structure

```
onyx/
├── backend/                 # FastAPI backend application
│   ├── alembic/            # Database migrations
│   ├── onyx/               # Main application code
│   ├── model_server/       # AI/ML model serving
│   └── requirements/       # Python dependencies
├── web/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and configurations
│   └── public/            # Static assets
├── deployment/             # Infrastructure configurations
│   ├── docker_compose/    # Docker Compose files
│   ├── kubernetes/        # K8s manifests
│   └── helm/              # Helm charts
└── docs/                  # Documentation
```

## Environment Variables

### Required Environment Variables

#### Database Configuration
```bash
# PostgreSQL
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_HOST=relational_db
POSTGRES_PORT=5432
DATABASE_URL=postgresql+asyncpg://postgres:password@relational_db:5432/postgres

# Redis
REDIS_HOST=cache
REDIS_PORT=6379
```

#### AI/ML Configuration
```bash
# Embedding Model
EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
HUGGINGFACE_TOKEN=your_huggingface_token

# Gen AI
GEN_AI_API_KEY=your_openai_api_key
GEN_AI_MODEL_PROVIDER=openai
GEN_AI_MODEL_VERSION=gpt-3.5-turbo
USE_LLAMA_FALLBACK=true
```

#### Authentication
```bash
# OAuth Configuration
AUTH_TYPE=oauth
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
VALID_EMAIL_DOMAINS=yourcompany.com
```

#### Vespa Search Engine
```bash
VESPA_HOST=index
VESPA_PORT=8081
VESPA_CONFIG_SERVER_HOST=index
VESPA_TENANT_PORT=19071
```

### Optional Environment Variables
```bash
# Slack Bot Configuration
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_APP_TOKEN=your_slack_app_token

# Model Server Configuration
MODEL_SERVER_HOST=inference_model_server
MODEL_SERVER_PORT=8001
INDEXING_MODEL_SERVER_HOST=indexing_model_server
INDEXING_MODEL_SERVER_PORT=8002

# Feature Flags
DANSWER_BOT_DISABLE_DOCS_ONLY_ANSWER=false
DANSWER_BOT_FEEDBACK_VISIBILITY=true
DANSWER_BOT_DISPLAY_ERROR_MSGS=true
```

## Hosting & Deployment

### Local Development
- **Platform**: Docker Compose
- **Ports**: 
  - Web: 3000
  - API: 8080
  - Nginx: 80
  - Postgres: 5433
  - Redis: 6379
  - Vespa: 8081, 19071
  - Model Servers: 8001, 8002

### Production Deployment
- **Platform**: Kubernetes with Helm charts
- **Load Balancer**: Nginx ingress controller
- **SSL/TLS**: Cert-manager with Let's Encrypt
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK stack or similar

### Cloud Platforms
- **AWS**: EKS with Fargate
- **GCP**: GKE with Cloud SQL
- **Azure**: AKS with Azure Database
- **Self-hosted**: On-premise Kubernetes

## Scheduled Tasks & Cron Jobs

### Background Workers
1. **Indexing Worker** (`background`):
   - Connector content synchronization
   - Document processing and chunking
   - Vector embedding generation

2. **Primary Worker** (`background_primary`):
   - Chat response generation
   - User interaction processing
   - Analytics data collection

3. **Celery Primary Worker** (`celery_primary`):
   - High-priority task processing
   - Real-time notifications
   - System maintenance tasks

### Scheduled Tasks
- **Document Re-indexing**: Daily at 2 AM UTC
- **Analytics Processing**: Every 6 hours
- **Cache Cleanup**: Every 12 hours
- **Health Check Monitoring**: Every 5 minutes
- **Model Cache Management**: Weekly

## Performance & Scaling

### Resource Requirements
- **Minimum**: 4GB RAM, 2 CPU cores
- **Recommended**: 8GB RAM, 4 CPU cores
- **Production**: 16GB+ RAM, 8+ CPU cores

### Scaling Strategies
- **Horizontal**: Multiple API server instances
- **Vertical**: GPU acceleration for ML models
- **Database**: Read replicas and connection pooling
- **Cache**: Redis cluster for high availability

### Monitoring & Observability
- **Health Checks**: Built-in endpoints for all services
- **Metrics**: Prometheus metrics collection
- **Logging**: Structured logging with correlation IDs
- **Tracing**: Distributed tracing for request flows

## Security Considerations

### Authentication & Authorization
- OAuth2/OIDC integration
- Role-based access control (RBAC)
- API key management
- Session management

### Data Protection
- Encryption at rest and in transit
- Secure credential storage
- Data retention policies
- GDPR compliance features

### Network Security
- Reverse proxy with rate limiting
- CORS configuration
- Input validation and sanitization
- SQL injection prevention

## API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `POST /api/chat` - Chat interface
- `GET /api/search` - Search documents
- `POST /api/connectors` - Manage connectors

### Admin Endpoints
- `GET /api/admin/users` - User management
- `GET /api/admin/analytics` - Usage analytics
- `POST /api/admin/settings` - System configuration

### Model Server Endpoints
- `POST /encoder/bi-encoder-embed` - Text embedding
- `POST /encoder/cross-encoder-scores` - Document reranking

## Development Workflow

### Code Quality
- **Linting**: Black, isort, flake8 for Python
- **Type Checking**: mypy for Python, TypeScript for frontend
- **Testing**: pytest for backend, Jest for frontend
- **CI/CD**: GitHub Actions with automated testing

### Deployment Pipeline
1. Code commit to main branch
2. Automated testing and linting
3. Docker image building
4. Deployment to staging environment
5. Manual testing and approval
6. Production deployment with rollback capability 

## Additional Services in Docker Compose

Below are the additional services included in the `docker-compose.dev.yml` file, along with their purposes:

- **inference_model_server**: Hosts the local LLM or embedding model for inference. Handles all embedding and model inference requests from the API server. Required for semantic search and AI-powered features.
- **indexing_model_server**: Dedicated model server for document indexing and embedding. Separates indexing workloads from inference to improve performance and reliability.
- **background**: Celery worker for connector indexing tasks. Handles document ingestion, chunking, and embedding in the background.
- **background_primary**: Celery worker for primary background tasks, such as chat response generation, analytics, and user interaction processing.
- **celery_primary**: Celery worker for high-priority and real-time tasks, including notifications and system maintenance.
- **nginx**: Reverse proxy that routes traffic to the web frontend and API backend, provides SSL termination, and health checks.
- **index**: Vespa search engine container for vector search and document retrieval.
- **cache**: Redis cache for session storage, Celery backend, and application caching.
- **relational_db**: PostgreSQL database for all relational data.

Each service is essential for scalable, reliable, and performant operation of the TARS (Onyx) platform. 