# FROM node:20-alpine AS base

# LABEL com.onyx.maintainer="founders@onyx.app"
# LABEL com.onyx.description="This image is the web/frontend container of Onyx which \
# contains code for both the Community and Enterprise editions of Onyx. If you do not \
# have a contract or agreement with DanswerAI, you are not permitted to use the Enterprise \
# Edition features outside of personal development or testing purposes. Please reach out to \
# founders@onyx.app for more information. Please visit https://github.com/onyx-dot-app/onyx"

# ARG ONYX_VERSION=0.0.0-dev
# ENV ONYX_VERSION=${ONYX_VERSION}
# RUN echo "ONYX_VERSION: ${ONYX_VERSION}"

# # Step 1: Build stage
# FROM base AS builder
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Inject build-time environment variables
# ARG NODE_OPTIONS
# ENV NODE_OPTIONS=${NODE_OPTIONS}

# ARG INTERNAL_URL
# ENV INTERNAL_URL=${INTERNAL_URL}

# COPY . .

# RUN npm config set registry https://registry.npmjs.org/
# RUN npm ci

# ENV NEXT_PRIVATE_STANDALONE=true
# ENV NEXT_TELEMETRY_DISABLED=1

# # Pass necessary public build-time ENV variables
# ARG NEXT_PUBLIC_DISABLE_STREAMING
# ENV NEXT_PUBLIC_DISABLE_STREAMING=${NEXT_PUBLIC_DISABLE_STREAMING}

# ARG NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA
# ENV NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA=${NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA}

# ARG NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN
# ENV NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN=${NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN}

# ARG NEXT_PUBLIC_THEME
# ENV NEXT_PUBLIC_THEME=${NEXT_PUBLIC_THEME}

# ARG NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED
# ENV NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED=${NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED}

# ARG NEXT_PUBLIC_DISABLE_LOGOUT
# ENV NEXT_PUBLIC_DISABLE_LOGOUT=${NEXT_PUBLIC_DISABLE_LOGOUT}

# ARG NEXT_PUBLIC_CUSTOM_REFRESH_URL
# ENV NEXT_PUBLIC_CUSTOM_REFRESH_URL=${NEXT_PUBLIC_CUSTOM_REFRESH_URL}

# ARG NEXT_PUBLIC_POSTHOG_KEY
# ARG NEXT_PUBLIC_POSTHOG_HOST
# ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
# ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}

# ARG NEXT_PUBLIC_CLOUD_ENABLED
# ENV NEXT_PUBLIC_CLOUD_ENABLED=${NEXT_PUBLIC_CLOUD_ENABLED}

# ARG NEXT_PUBLIC_SENTRY_DSN
# ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}

# ARG NEXT_PUBLIC_GTM_ENABLED
# ENV NEXT_PUBLIC_GTM_ENABLED=${NEXT_PUBLIC_GTM_ENABLED}

# ARG NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED
# ENV NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED=${NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED}

# ARG NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK
# ENV NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK=${NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK}

# ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

# RUN NODE_OPTIONS="--max_old_space_size=6144" npx next build

# # Step 2: Runtime stage
# FROM base AS runner
# WORKDIR /app

# RUN rm -rf /usr/local/lib/node_modules
# ENV NEXT_TELEMETRY_DISABLED=1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static




# ENV INTERNAL_URL=${INTERNAL_URL}
# ENV PORT=80
# # CMD ["node", "server.js"]
# CMD ["node", ".next/standalone/server.js"]





# FROM node:20-alpine AS base

# LABEL com.onyx.maintainer="founders@onyx.app"
# LABEL com.onyx.description="This image is the web/frontend container of Onyx which \
# contains code for both the Community and Enterprise editions of Onyx. If you do not \
# have a contract or agreement with DanswerAI, you are not permitted to use the Enterprise \
# Edition features outside of personal development or testing purposes. Please reach out to \
# founders@onyx.app for more information. Please visit https://github.com/onyx-dot-app/onyx"

# # Default ONYX_VERSION, typically overriden during builds by GitHub Actions.
# ARG ONYX_VERSION=0.0.0-dev
# ENV ONYX_VERSION=${ONYX_VERSION}
# RUN echo "ONYX_VERSION: ${ONYX_VERSION}"

# # Step 1. Install dependencies + rebuild the source code only when needed
# FROM base AS builder
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Add NODE_OPTIONS argument
# ARG NODE_OPTIONS

# # pull in source code / package.json / package-lock.json
# COPY . .

# # Install dependencies
# RUN npm ci

# # needed to get the `standalone` dir we expect later
# ENV NEXT_PRIVATE_STANDALONE=true

# # Disable automatic telemetry collection
# ENV NEXT_TELEMETRY_DISABLED=1

# # Environment variables must be present at build time
# # https://github.com/vercel/next.js/discussions/14030
# # NOTE: if you add something here, make sure to add it to the runner as well
# ARG NEXT_PUBLIC_DISABLE_STREAMING
# ENV NEXT_PUBLIC_DISABLE_STREAMING=${NEXT_PUBLIC_DISABLE_STREAMING}

# ARG NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA
# ENV NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA=${NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA}

# ARG NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN
# ENV NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN=${NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN}

# ARG NEXT_PUBLIC_THEME
# ENV NEXT_PUBLIC_THEME=${NEXT_PUBLIC_THEME}

# ARG NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED
# ENV NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED=${NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED}

# ARG NEXT_PUBLIC_DISABLE_LOGOUT
# ENV NEXT_PUBLIC_DISABLE_LOGOUT=${NEXT_PUBLIC_DISABLE_LOGOUT}

# ARG NEXT_PUBLIC_CUSTOM_REFRESH_URL
# ENV NEXT_PUBLIC_CUSTOM_REFRESH_URL=${NEXT_PUBLIC_CUSTOM_REFRESH_URL}

# ARG NEXT_PUBLIC_POSTHOG_KEY
# ARG NEXT_PUBLIC_POSTHOG_HOST
# ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
# ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}

# ARG NEXT_PUBLIC_CLOUD_ENABLED
# ENV NEXT_PUBLIC_CLOUD_ENABLED=${NEXT_PUBLIC_CLOUD_ENABLED}

# ARG NEXT_PUBLIC_SENTRY_DSN
# ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} 

# ARG NEXT_PUBLIC_GTM_ENABLED
# ENV NEXT_PUBLIC_GTM_ENABLED=${NEXT_PUBLIC_GTM_ENABLED}

# ARG NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED
# ENV NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED=${NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED}

# ARG NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK
# ENV NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK=${NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK}

# ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

# # Use NODE_OPTIONS in the build command
# # RUN NODE_OPTIONS="${NODE_OPTIONS}" npx next build

# RUN NODE_OPTIONS="--max_old_space_size=6144" npx next build

# # Step 2. Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# # Remove global node modules, since they are not needed by the actual app
# # (all dependencies are copied over into the `/app` dir itself). These
# # global modules may be outdated and trigger security scans.
# RUN rm -rf /usr/local/lib/node_modules

# # Not needed, set by compose 
# # ENV NODE_ENV production  

# # Disable automatic telemetry collection
# ENV NEXT_TELEMETRY_DISABLED=1

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# # Add back in if we add anything to `public`
# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Environment variables must be redefined at run time
# # NOTE: if you add something here, make sure to add it to the builder as well
# ARG NEXT_PUBLIC_DISABLE_STREAMING
# ENV NEXT_PUBLIC_DISABLE_STREAMING=${NEXT_PUBLIC_DISABLE_STREAMING}

# ARG NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA
# ENV NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA=${NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA}

# allow user to specify custom feedback options
# ARG NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_POSITIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS
# ENV NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS=${NEXT_PUBLIC_NEGATIVE_PREDEFINED_FEEDBACK_OPTIONS}

# ARG NEXT_PUBLIC_THEME
# ENV NEXT_PUBLIC_THEME=${NEXT_PUBLIC_THEME}

# ARG NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED
# ENV NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED=${NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED}

# ARG NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN
# ENV NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN=${NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN}

# ARG NEXT_PUBLIC_DISABLE_LOGOUT
# ENV NEXT_PUBLIC_DISABLE_LOGOUT=${NEXT_PUBLIC_DISABLE_LOGOUT}

# ARG NEXT_PUBLIC_CUSTOM_REFRESH_URL
# ENV NEXT_PUBLIC_CUSTOM_REFRESH_URL=${NEXT_PUBLIC_CUSTOM_REFRESH_URL}

# ARG NEXT_PUBLIC_POSTHOG_KEY
# ARG NEXT_PUBLIC_POSTHOG_HOST
# ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
# ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}

# ARG NEXT_PUBLIC_CLOUD_ENABLED
# ENV NEXT_PUBLIC_CLOUD_ENABLED=${NEXT_PUBLIC_CLOUD_ENABLED}

# ARG NEXT_PUBLIC_SENTRY_DSN
# ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} 

# ARG NEXT_PUBLIC_GTM_ENABLED
# ENV NEXT_PUBLIC_GTM_ENABLED=${NEXT_PUBLIC_GTM_ENABLED}

# ARG NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED
# ENV NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED=${NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED}

# ARG NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK
# ENV NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK=${NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK}

# ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

# Note: Don't expose ports here, Compose will handle that for us if necessary. 
# If you want to run this without compose, specify the ports to 
# expose via cli

# CMD ["node", "server.js"]

# Stage 1: Builder
# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# # Stage 2: Runner
# # FROM node:20-alpine
# # WORKDIR /app

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/package.json ./

# EXPOSE 3000
# CMD ["node", "server.js"]

# ----------------------------
# Stage 1: Builder
# ----------------------------
FROM node:20-alpine AS builder

LABEL maintainer="founders@onyx.app"
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Copy project files and install deps
COPY . .
RUN npm ci

# Enable standalone build
ENV NODE_ENV=production
ENV NEXT_PRIVATE_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED=1

# Build with large memory allowance
RUN NODE_OPTIONS="--max_old_space_size=6144" npm run build

# ----------------------------
# Stage 2: Runtime
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install ca-certificates for SSL support
RUN apk add --no-cache ca-certificates

# Create non-root user
RUN addgroup -g 1001 nodejs && adduser -S -u 1001 nextjs -G nodejs
USER nextjs

# Copy only necessary assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./

# Expose app port (nginx expects this)
EXPOSE 3000

# Run production server
CMD ["node", "server.js"]
