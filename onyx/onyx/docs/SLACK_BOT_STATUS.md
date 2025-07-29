# Slack Bot Status & Workaround

## Current Status
- **Slack Bot is currently NOT working.**
- The integration is set up to use **Socket Mode** for event delivery.
- Due to configuration or code issues, the bot is not responding to messages or events in Slack.

## Root Cause
- **Socket Mode** is enabled in the Slack App configuration.
- The backend expects events via a persistent WebSocket connection (Socket Mode), but this is either not connecting or not being processed correctly.
- No HTTP endpoint (e.g., `/slack/events`) is currently exposed for Slack's Events API to deliver events via HTTP POST.

## Workaround: Switch to HTTP Event Delivery

### 1. **Disable Socket Mode in Slack**
- Go to your Slack App configuration at [Slack API Apps](https://api.slack.com/apps)
- Select your app → **Socket Mode**
- **Turn off Socket Mode**

### 2. **Update Event Subscriptions**
- In the Slack App settings, go to **Event Subscriptions**
- **Enable Events**
- Set the **Request URL** to your backend's public endpoint, e.g.:
  - `https://your-domain.com/api/slack/events`
- Add the required event types (e.g., `message.channels`, `app_mention`, etc.)

### 3. **Code Changes Required**
- Implement an HTTP POST endpoint (e.g., `/api/slack/events`) in your FastAPI backend to receive and process Slack events.
- Ensure the endpoint verifies Slack signatures for security.
- Respond to Slack's URL verification challenge during setup.
- Update your bot logic to process events from HTTP requests instead of Socket Mode.

#### Example FastAPI Endpoint
```python
from fastapi import APIRouter, Request, Header, HTTPException

router = APIRouter()

@router.post("/api/slack/events")
async def slack_events(request: Request, x_slack_signature: str = Header(None), x_slack_request_timestamp: str = Header(None)):
    # Verify Slack signature here
    # Parse and process the event
    return {"ok": True}
```

### 4. **Redeploy and Test**
- Redeploy your backend with the new endpoint
- Test event delivery from Slack (use the "Send Test Event" feature in Slack App config)
- Confirm the bot responds to messages and events

## Notes
- **Socket Mode** is convenient for local development or when you cannot expose a public HTTP endpoint, but can be less reliable in some deployments.
- HTTP Event delivery is the standard and recommended approach for production deployments.
- Make sure your endpoint is accessible from Slack (publicly reachable, correct port, etc.)

## Status Tracking
- [ ] Socket Mode disabled in Slack
- [ ] HTTP endpoint implemented
- [ ] Event subscriptions updated
- [ ] Bot tested and working

---

**Contact the technical team for help with this migration or for more details on the required code changes.** 