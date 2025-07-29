# Debugging Guide

This guide lists common errors, their likely causes, and step-by-step instructions for debugging and resolving issues in the TARS (formerly Onyx) deployment.

---

## Common Errors & Fixes

| Error Message / Symptom                | Likely Cause                                 | Debugging Steps / Fix                        |
|----------------------------------------|----------------------------------------------|----------------------------------------------|
| `IndentationError` in Python           | Bad indentation in code (e.g., model server) | Check file, fix indentation, rebuild image   |
| 502 Bad Gateway from Nginx             | Backend container down or wrong IP           | Check `docker-compose ps`, restart services  |
| Slack bot not responding               | Socket Mode misconfigured, env vars missing  | Check Slack app config, logs, env vars       |
| Model server fails to start            | Model mismatch, OOM, or bad config           | Check logs, switch to supported model        |
| Database connection refused            | Postgres not running or wrong env vars       | Check `relational_db` logs, env vars         |
| Celery workers in restart loop         | Dependency on model server, bad config       | Ensure model server is healthy, check logs   |
| Frontend not showing new logo          | Browser cache, build not refreshed           | Clear cache, rebuild frontend                |
| OAuth login fails                      | Wrong client ID/secret, bad redirect URI     | Check env vars, Slack/Google app settings    |
| Vespa search not working               | Vespa container not healthy                  | Check Vespa logs, restart container          |
| Health check endpoint fails            | Service not running or port misconfigured    | Check logs, verify port mappings             |

---

## Debugging Steps & Useful Commands

### 1. **Check Container Logs**
```bash
docker-compose logs [service]
```
- Example: `docker-compose logs api_server`

### 2. **Check Service Health**
```bash
docker-compose ps
```
- Shows status of all containers

### 3. **Restart a Service**
```bash
docker-compose restart [service]
```
- Example: `docker-compose restart web_server`

### 4. **Rebuild Images**
```bash
docker-compose build --no-cache
```
- Use after code changes or fixing Dockerfile issues

### 5. **Check Environment Variables**
```bash
cat .env
# Or to see what Docker Compose is using:
docker-compose config
```

### 6. **Check Nginx Config & Logs**
```bash
docker-compose logs nginx
```
- Look for 502/504 errors or misrouted requests

### 7. **Check Database**
```bash
docker-compose exec relational_db psql -U postgres
```
- Use SQL commands to check DB health

### 8. **Enable Debug Logging**
- Set `LOG_LEVEL=DEBUG` in your `.env` file
- Restart affected services for changes to take effect

### 9. **Check Health Endpoints**
- API: `http://localhost:8080/api/health`
- Web: `http://localhost`
- Vespa: `http://localhost:8081/ApplicationStatus`

### 10. **Check Slack Bot**
- Review logs for background workers and Slack integration
- Confirm `SLACK_BOT_TOKEN` and `SLACK_APP_TOKEN` are set
- Test with Slack's "Send Test Event" feature

---

## Log File Locations
- **Docker Compose logs:** Use `docker-compose logs [service]`
- **Model server logs:** `/var/log` inside the model server container
- **Frontend logs:** Console output from `web_server` container
- **Nginx logs:** `/var/log/nginx/` inside the nginx container
- **Celery/Background workers:** `docker-compose logs background` or `background_primary`

---

## Environment Variables: What to Check & Change

- **Always update secrets and tokens for production**
- **Set correct OAuth credentials and valid email domains**
- **Set Slack tokens if using Slack integration**
- **Update model names if using a different embedding or LLM model**
- **If using HTTP event delivery for Slack, ensure your backend is publicly accessible and update any relevant URLs**
- **For dynamic branding, add variables like `PRODUCT_NAME`, `LOGO_URL`, etc. if needed**

See `.env.example` and `docs/TECHNICAL_ARCHITECTURE.md` for a full list and descriptions.

---

## When in Doubt
- **Check the logs first**
- **Restart the affected service**
- **Rebuild the Docker image if you changed code**
- **Check your environment variables**
- **Consult the documentation for setup and troubleshooting**

If you’re still stuck, reach out to the technical team or open an issue in your project tracker. 