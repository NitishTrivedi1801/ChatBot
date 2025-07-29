# Setup & Installation Guide

## Prerequisites

### System Requirements
- **Operating System**: Linux, macOS, or Windows (with WSL2)
- **Docker**: Version 20.10+ with Docker Compose
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: At least 10GB free space
- **CPU**: 4+ cores recommended

### Required Software
- **Docker Desktop** or **Docker Engine** + **Docker Compose**
- **Git** (for cloning the repository)
- **Text Editor** (VS Code, Sublime Text, etc.)

### Optional Software
- **Node.js** (for frontend development)
- **Python 3.11+** (for backend development)
- **PostgreSQL** (for local database access)
- **Redis** (for local cache access)

## Local Development Setup

### Step 1: Clone the Repository
```bash
git clone [your-repository-url]
cd onyx
```

### Step 2: Environment Configuration
1. **Copy the environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Configure required environment variables**:
   ```bash
   # Edit .env file with your values
   nano .env
   ```

   **Required variables**:
   ```bash
   # Database
   POSTGRES_DB=postgres
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_secure_password
   
   # AI/ML
   EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
   HUGGINGFACE_TOKEN=your_huggingface_token
   GEN_AI_API_KEY=your_openai_api_key
   
   # Authentication
   AUTH_TYPE=oauth
   GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
   GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
   VALID_EMAIL_DOMAINS=yourcompany.com
   ```

### Step 3: Start the Development Environment
```bash
# Start all services
docker-compose -f deployment/docker_compose/docker-compose.dev.yml up -d

# Check service status
docker-compose -f deployment/docker_compose/docker-compose.dev.yml ps
```

### Step 4: Verify Installation
1. **Check all services are running**:
   ```bash
   docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs --tail=50
   ```

2. **Access the application**:
   - **Web Interface**: http://localhost
   - **API Documentation**: http://localhost:8080/docs
   - **Health Check**: http://localhost:8080/api/health

3. **Verify database connection**:
   ```bash
   docker-compose -f deployment/docker_compose/docker-compose.dev.yml exec api_server python -c "from onyx.db.database import get_db; print('Database connection successful')"
   ```

### Step 5: Initial Setup
1. **Create admin user** (if using OAuth):
   - Access http://localhost
   - Sign in with your Google account
   - First user becomes admin automatically

2. **Configure connectors**:
   - Navigate to Admin → Connectors
   - Add your first connector (e.g., Google Drive, Slack)
   - Follow the authentication flow

## Production Deployment

### Option 1: Docker Compose (Simple Production)

1. **Create production environment file**:
   ```bash
   cp .env.example .env.prod
   ```

2. **Configure production settings**:
   ```bash
   # Production-specific variables
   NODE_ENV=production
   DEBUG=false
   LOG_LEVEL=INFO
   
   # Use production database
   POSTGRES_PASSWORD=very_secure_production_password
   
   # Configure external URLs
   BASE_URL=https://your-domain.com
   API_BASE_URL=https://your-domain.com/api
   ```

3. **Start production services**:
   ```bash
   docker-compose -f deployment/docker_compose/docker-compose.prod.yml up -d
   ```

### Option 2: Kubernetes Deployment

1. **Prerequisites**:
   - Kubernetes cluster (1.20+)
   - Helm 3.0+
   - kubectl configured

2. **Deploy using Helm**:
   ```bash
   # Add the Helm repository
   helm repo add onyx https://charts.onyx.app
   
   # Install the chart
   helm install tars onyx/onyx \
     --namespace tars \
     --create-namespace \
     --values deployment/helm/values.yaml
   ```

3. **Configure ingress**:
   ```bash
   # Apply ingress configuration
   kubectl apply -f deployment/kubernetes/ingress.yaml
   ```

### Option 3: Cloud Platform Deployment

#### AWS ECS/Fargate
```bash
# Deploy using AWS CLI
aws cloudformation deploy \
  --template-file deployment/aws_ecs_fargate/template.yaml \
  --stack-name tars-stack \
  --capabilities CAPABILITY_IAM
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/your-project/tars
gcloud run deploy tars --image gcr.io/your-project/tars --platform managed
```

## Development Workflow

### Frontend Development
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/dev.txt

# Run development server
uvicorn onyx.main:app --reload --host 0.0.0.0 --port 8080
```

### Database Migrations
```bash
# Create new migration
docker-compose -f deployment/docker_compose/docker-compose.dev.yml exec api_server alembic revision --autogenerate -m "Description"

# Apply migrations
docker-compose -f deployment/docker_compose/docker-compose.dev.yml exec api_server alembic upgrade head
```

## Common Issues & Troubleshooting

### Issue 1: Port Already in Use
**Error**: `Port 80 is already in use`

**Solution**:
```bash
# Check what's using the port
sudo lsof -i :80

# Stop conflicting service or change port in docker-compose.yml
# Edit nginx port mapping: "8080:80" instead of "80:80"
```

### Issue 2: Database Connection Failed
**Error**: `Connection refused to postgres`

**Solution**:
```bash
# Check if postgres container is running
docker-compose -f deployment/docker_compose/docker-compose.dev.yml ps

# Restart postgres container
docker-compose -f deployment/docker_compose/docker-compose.dev.yml restart relational_db

# Check postgres logs
docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs relational_db
```

### Issue 3: Model Server Not Starting
**Error**: `Model loading failed`

**Solution**:
```bash
# Check available memory
free -h

# Increase Docker memory limit (Docker Desktop → Settings → Resources)

# Check model server logs
docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs inference_model_server
```

### Issue 4: OAuth Authentication Issues
**Error**: `Invalid OAuth credentials`

**Solution**:
1. Verify Google OAuth credentials in Google Cloud Console
2. Ensure redirect URIs are correct:
   - `http://localhost/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)
3. Check environment variables are set correctly

### Issue 5: Vespa Search Engine Issues
**Error**: `Vespa connection failed`

**Solution**:
```bash
# Check Vespa container status
docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs index

# Restart Vespa container
docker-compose -f deployment/docker_compose/docker-compose.dev.yml restart index

# Verify Vespa health
curl http://localhost:8081/ApplicationStatus
```

### Issue 6: Celery Workers Not Processing Tasks
**Error**: `Tasks stuck in queue`

**Solution**:
```bash
# Check worker logs
docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs background
docker-compose -f deployment/docker_compose/docker-compose.dev.yml logs background_primary

# Restart workers
docker-compose -f deployment/docker_compose/docker-compose.dev.yml restart background background_primary

# Check Redis connection
docker-compose -f deployment/docker_compose/docker-compose.dev.yml exec cache redis-cli ping
```

## Performance Optimization

### For Development
```bash
# Limit resource usage
docker-compose -f deployment/docker_compose/docker-compose.dev.yml up -d --scale background=1 --scale background_primary=1

# Use lighter models
export EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
```

### For Production
```bash
# Enable GPU support (if available)
export CUDA_VISIBLE_DEVICES=0

# Increase worker concurrency
export CELERY_CONCURRENCY=4

# Enable caching
export REDIS_CACHE_ENABLED=true
```

## Security Checklist

### Before Going Live
- [ ] Change default passwords
- [ ] Configure SSL/TLS certificates
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerting
- [ ] Review and update environment variables
- [ ] Test authentication flows
- [ ] Verify data encryption

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Monitor disk space usage
- [ ] Review access logs
- [ ] Backup database regularly
- [ ] Test disaster recovery procedures

## Support & Resources

### Documentation
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Community
- [GitHub Issues](https://github.com/your-org/tars/issues)
- [Discord Community](https://discord.gg/tars)
- [Slack Workspace](https://tars.slack.com)

### Monitoring
- **Health Dashboard**: http://localhost:8080/api/health
- **Metrics Endpoint**: http://localhost:8080/api/metrics
- **Logs**: `docker-compose logs -f [service-name]` 

## Important Pre-Setup Step: Build the Onyx ML Base Image

Before running any services, you must build the Onyx ML base image. This is required for the model server and ML-related services to build and run successfully.

```bash
# From the project root
docker build -f backend/Dockerfile.onyx-ml-base -t onyxdotapp/onyx-ml-base:latest backend
```

This ensures that all dependent images (such as the model server) can build successfully.

---

## Google OAuth Setup: Enable People API
- In your Google Cloud project, **enable the Google People API** in the API Library. This is required for user profile and email access during OAuth authentication.

---

## Slack Bot Setup: Required Scopes
- When setting up your Slack bot, ensure you add all required scopes in the Slack App configuration. Common scopes include:
  - `chat:write`
  - `channels:read`
  - `groups:read`
  - `im:read`
  - `mpim:read`
  - `users:read`
  - `users:read.email`
  - `app_mentions:read`
  - `commands`
  - `files:read`
- For the latest list and setup instructions, see the [Onyx Slack Bot Setup Guide](https://docs.onyx.app/introduction).

---

## Connector Setup & Further Documentation
- For detailed instructions on adding connectors, configuring authentication, and advanced features, refer to the [Onyx Documentation](https://docs.onyx.app/introduction). 