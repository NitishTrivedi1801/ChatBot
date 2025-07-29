# Base image
FROM python:3.11.7-slim-bookworm

LABEL maintainer="founders@onyx.app"
LABEL description="Onyx Backend container for API Server and Background Worker"

# Version & Environment Vars
ARG ONYX_VERSION=0.0.0-dev
ENV ONYX_VERSION=${ONYX_VERSION} \
    DANSWER_RUNNING_IN_DOCKER=true \
    DO_NOT_TRACK=true \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH=/app

# Install system-level dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    curl \
    zip \
    nano \
    vim \
    git \
    ca-certificates \
    libpq-dev \
    libxmlsec1-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy and install Python requirements
COPY backend/requirements/default.txt /tmp/requirements.txt
COPY backend/requirements/ee.txt /tmp/ee-requirements.txt

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /tmp/requirements.txt -r /tmp/ee-requirements.txt && \
    pip uninstall -y py && \
    playwright install chromium && \
    playwright install-deps chromium

# Remove vulnerable build dependencies (optional)
RUN apt-get remove -y --allow-remove-essential \
    perl-base xserver-common xvfb cmake gcc && \
    apt-get autoremove -y && apt-get clean

# Download NLTK models (optional for ML logic)
RUN python -c "import nltk; nltk.download('stopwords', quiet=True); nltk.download('punkt_tab', quiet=True)"

# Set working directory
WORKDIR /app

# Copy backend codebase
COPY backend/onyx /app/onyx
COPY backend/ee /app/ee
COPY backend/alembic /app/alembic
COPY backend/alembic_tenants /app/alembic_tenants
COPY backend/shared_configs /app/shared_configs
COPY backend/static /app/static
COPY backend/scripts /app/scripts
COPY backend/assets /app/assets
COPY backend/alembic.ini /app/alembic.ini

# Supervisor
RUN mkdir -p /etc/supervisor/conf.d
COPY backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose API and internal service ports
EXPOSE 8080
EXPOSE 8081

# Start supervisord which runs uvicorn (api) + tail logs
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
