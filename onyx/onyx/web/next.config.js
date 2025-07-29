const { version: package_version } = require("./package.json");
const { withSentryConfig } = require("@sentry/nextjs");

const env_version = process.env.ONYX_VERSION;
const version = env_version || package_version;

// Base internal API URL for Docker-to-Docker routing
const INTERNAL_API_BASE = process.env.INTERNAL_URL || "http://api_server:8080";

// Content-Security-Policy (CSP)
const cspHeader = `
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  ${
    process.env.NEXT_PUBLIC_CLOUD_ENABLED === "true"
      ? "upgrade-insecure-requests;"
      : ""
  }
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  productionBrowserSourceMaps: false,

  publicRuntimeConfig: {
    version,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/docs/:path*",
        destination: `${INTERNAL_API_BASE}/docs/:path*`,
      },
      {
        source: "/api/docs",
        destination: `${INTERNAL_API_BASE}/docs`,
      },
      {
        source: "/openapi.json",
        destination: `${INTERNAL_API_BASE}/openapi.json`,
      },
    ];
  },
};

// --- Sentry ---
const sentryEnabled =
  Boolean(process.env.SENTRY_AUTH_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

const sentryWebpackPluginOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  dryRun: !sentryEnabled,
  silent: true,
  org: "your-org",
  project: "your-project",
  ...(sentryEnabled && {
    sourceMaps: {
      include: ["./.next"],
      ignore: ["node_modules"],
      urlPrefix: "~/_next",
      stripPrefix: ["webpack://_N_E/"],
      validate: true,
      cleanArtifacts: true,
    },
  }),
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
