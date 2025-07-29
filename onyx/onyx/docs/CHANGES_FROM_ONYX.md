# Changes from Onyx Core Model

This document summarizes all major changes, enhancements, and deviations made in this project compared to the original Onyx core model.

---

## 1. Rebranding & Whitelabelling
- All references to **Onyx** have been changed to **TARS** (or your chosen brand).
- New logos, favicons, and SVGs have replaced the original Onyx branding.
- Whitelabelling support: clear guide and code locations for rebranding (see `docs/WHITELABELLING_GUIDE.md`).

## 2. Model Server & Embedding Model
- **Default embedding model** switched from `nomic-ai/nomic-embed-text-v1` to `sentence-transformers/all-MiniLM-L6-v2` for improved stability and compatibility.
- Model server health checks and error handling improved.
- Environment variables updated to reflect new model defaults (see below).

## 3. Slack Integration
- Documented that **Socket Mode** is currently not working; provided a migration path to HTTP event delivery (see `docs/SLACK_BOT_STATUS.md`).
- Slack bot troubleshooting and configuration clarified.

## 4. New & Modified Services (Docker Compose)
- Added/updated services:
  - `inference_model_server` and `indexing_model_server` for local LLM/embedding inference
  - Multiple Celery workers: `background`, `background_primary`, `celery_primary`
  - Improved Nginx config for routing and health checks
- Health checks and restart policies improved for all containers

## 5. Frontend Changes
- Logo SVGs and branding are now hardcoded in `web/src/components/icons/icons.tsx`.
- UI theme and color changes supported via Tailwind config.
- All product names, logos, and favicons updated for whitelabelling.

## 6. Documentation
- Comprehensive new documentation suite:
  - Product overview, technical architecture, setup, dependencies, features, open items, ownership, whitelabelling, Slack bot status, debugging, and this changelog.
- All docs updated to reflect new branding and architecture.

## 7. Bug Fixes & Improvements
- Fixed Python indentation errors in model server code.
- Resolved container restart loops by improving dependency management.
- Improved error handling for model server and background workers.
- Updated Nginx config to prevent 502 errors.

## 8. Environment Variable Changes
- **Model-related:**
  - `EMBEDDING_MODEL_NAME` now defaults to `sentence-transformers/all-MiniLM-L6-v2`.
  - `GEN_AI_MODEL_VERSION` and `FAST_GEN_AI_MODEL_VERSION` set to `gpt-3.5-turbo`.
- **Slack-related:**
  - `SLACK_BOT_TOKEN` and `SLACK_APP_TOKEN` required for Slack integration.
  - If switching from Socket Mode to HTTP, ensure your public endpoint is set and accessible.
- **Branding-related:**
  - No direct env vars for branding, but consider adding `PRODUCT_NAME`, `LOGO_URL`, etc. for dynamic whitelabelling.
- **Database/Infra:**
  - Standard Postgres, Redis, Vespa, and model server variables retained (see `docs/TECHNICAL_ARCHITECTURE.md`).
- **OAuth/SSO:**
  - `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `AUTH_TYPE`, `VALID_EMAIL_DOMAINS` for authentication.

## 9. What Needs to Be Changed in Environment Variables?
- **Set all required variables in your `.env` file** (see `.env.example`):
  - Update all secrets (do not use defaults in production)
  - Set correct OAuth credentials and valid email domains
  - Set Slack tokens if using Slack integration
  - Update model names if you want to use a different embedding or LLM model
  - If using HTTP event delivery for Slack, ensure your backend is publicly accessible and update any relevant URLs
- **Recommended:**
  - Add new variables for dynamic branding if you want to support multi-tenant whitelabelling

---

**For a full list of environment variables and their usage, see `docs/TECHNICAL_ARCHITECTURE.md` and the `.env.example` file.** 