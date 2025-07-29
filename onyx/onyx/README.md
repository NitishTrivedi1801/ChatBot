# TARS (formerly Onyx) - AI-Powered Knowledge Management Platform

## Overview
TARS is an enterprise-ready, AI-powered knowledge management and chatbot platform. It connects to 40+ data sources (Slack, Confluence, Google Drive, GitHub, Notion, and more), provides semantic search, and enables conversational AI over your company’s knowledge.

---

## Features
- **Multi-Platform Integration**: 40+ connectors
- **Conversational AI**: Natural language chat with context
- **Semantic Search**: AI-powered, cross-source search
- **Real-Time Indexing**: Automatic sync and updates
- **Customizable Branding**: Easy whitelabelling and logo updates
- **Analytics & Insights**: Usage and performance metrics
- **Enterprise Security**: SSO, RBAC, encryption

---

## Architecture
- **Frontend**: Next.js (TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python, async)
- **Database**: PostgreSQL, Redis
- **Search**: Vespa vector search
- **AI/ML**: HuggingFace models, custom inference server
- **Infra**: Docker Compose, Kubernetes-ready

---

## Quick Start

### 1. Clone the Repository
```bash
git clone [your-repo-url]
cd onyx
```

### 2. Build the Onyx ML Base Image (REQUIRED)
```bash
docker build -f backend/Dockerfile.onyx-ml-base -t onyxdotapp/onyx-ml-base:latest backend
```
*This is required for model server builds to succeed.*

### 3. Configure Environment Variables
- Copy `.env.example` to `.env` and fill in all required values (see below).

### 4. Enable Google People API
- In your Google Cloud project, enable the **Google People API** for OAuth to work.

### 5. Set Up Slack Bot (if used)
- Add all required scopes in the Slack App config:
  - `chat:write`, `channels:read`, `groups:read`, `im:read`, `mpim:read`, `users:read`, `users:read.email`, `app_mentions:read`, `commands`, `files:read`
- See [Onyx Slack Bot Setup Guide](https://docs.onyx.app/introduction) for details.

### 6. Start the Development Environment
```bash
docker-compose -f deployment/docker_compose/docker-compose.dev.yml up -d
```

### 7. Access the Application
- Web: http://localhost
- API: http://localhost:8080/docs

---

## Branding & Logo Customization
- Place your logo SVGs (e.g., `logo.svg`, `logotype.svg`) in `web/public/`.
- In React components, reference them with:
  - `<img src="/logo.svg" ... />`
  - `<img src="/logotype.svg" ... />`
- No import or preamble changes needed. Just update the SVG files to change the logo everywhere.
- See [Whitelabelling Guide](./docs/WHITELABELLING_GUIDE.md) for more.

---

## Connectors & Advanced Features
- For adding connectors, advanced configuration, and more, see the [Onyx Documentation](https://docs.onyx.app/introduction).

---

## Environment Variables
- All required variables are documented in `.env.example` and [Technical Architecture](./docs/TECHNICAL_ARCHITECTURE.md).
- Key variables: database, Redis, Vespa, model server, OAuth, Slack tokens, etc.
- Always update secrets and tokens for production.

---

## Deployment
- Local: Docker Compose (see above)
- Production: Kubernetes manifests and Helm charts available
- See [Deployment Guide](./docs/DEPLOYMENT.md)

---

## Troubleshooting & Support
- [Debugging Guide](./docs/DEBUGGING_GUIDE.md)
- [Whitelabelling Guide](./docs/WHITELABELLING_GUIDE.md)
- [Onyx Documentation](https://docs.onyx.app/introduction)

---

## Contributing
See [Contributing Guidelines](./CONTRIBUTING.md)

## License
[Add your license information here]

---

**Note:** This project was rebranded from "Onyx" to "TARS" and includes significant customizations for enterprise deployment and enhanced AI capabilities.

