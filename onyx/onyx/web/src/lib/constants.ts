// export type AuthType =
//   | "disabled"
//   | "basic"
//   | "google_oauth"
//   | "oidc"
//   | "saml"
//   | "cloud";

// // Final hard override to ensure server fetch uses container hostname
// // export const INTERNAL_URL = "http://api_server:8080";
// export const INTERNAL_URL =
//   process.env.INTERNAL_URL || "http://api_server:8080";

// export const HOST_URL = process.env.WEB_DOMAIN || "http://127.0.0.1:3220";
// export const HEADER_HEIGHT = "h-16";
// export const SUB_HEADER = "h-12";

// // export const INTERNAL_URL = "http://api_server:8080";

// // export const INTERNAL_URL = process.env.INTERNAL_URL || "http://api_server:8080";
// // export const INTERNAL_URL =
//   //process.env.INTERNAL_URL ||
//   //process.env.INTERNAL_API_BASE_URL || // ✅ this fallback helps SSR
//   //"http://api_server:8080"; // ✅ Docker-to-Docker default
// export const REGISTRATION_URL = process.env.REGISTRATION_URL || `${INTERNAL_URL}/register`;


// // FIXED: Use Docker service, not localhost fallback
// // export const INTERNAL_URL = process.env.INTERNAL_URL || "http://api_server:8080";
// // export const REGISTRATION_URL = process.env.REGISTRATION_URL || `${INTERNAL_URL}/register`;


// // export const INTERNAL_URL = process.env.INTERNAL_URL || "http://127.0.0.1:8080";
// export const NEXT_PUBLIC_DISABLE_STREAMING =
//   process.env.NEXT_PUBLIC_DISABLE_STREAMING?.toLowerCase() === "true";

// export const NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED =
//   process.env.NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED?.toLowerCase() ===
//   "true";

// export const TENANT_ID_COOKIE_NAME = "onyx_tid";

// export const GMAIL_AUTH_IS_ADMIN_COOKIE_NAME = "gmail_auth_is_admin";

// export const GOOGLE_DRIVE_AUTH_IS_ADMIN_COOKIE_NAME =
//   "google_drive_auth_is_admin";

// export const SEARCH_TYPE_COOKIE_NAME = "search_type";
// export const AGENTIC_SEARCH_TYPE_COOKIE_NAME = "agentic_type";

// export const SIDEBAR_WIDTH_CONST = "350px";
// export const SIDEBAR_WIDTH = `w-[350px]`;

// export const LOGOUT_DISABLED =
//   process.env.NEXT_PUBLIC_DISABLE_LOGOUT?.toLowerCase() === "true";

// // Default sidebar open is true if the environment variable is not set
// export const NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN =
//   process.env.NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN?.toLowerCase() === "false"
//     ? false
//     : true;

// export const TOGGLED_CONNECTORS_COOKIE_NAME = "toggled_connectors";

// /* Enterprise-only settings */
// export const NEXT_PUBLIC_CUSTOM_REFRESH_URL =
//   process.env.NEXT_PUBLIC_CUSTOM_REFRESH_URL;

// // NOTE: this should ONLY be used on the server-side. If used client side,
// // it will not be accurate (will always be false).
// export const SERVER_SIDE_ONLY__PAID_ENTERPRISE_FEATURES_ENABLED =
//   process.env.ENABLE_PAID_ENTERPRISE_EDITION_FEATURES?.toLowerCase() === "true";
// // NOTE: since this is a `NEXT_PUBLIC_` variable, it will be set at
// // build-time
// // TODO: consider moving this to an API call so that the api_server
// // can be the single source of truth
// export const EE_ENABLED =
//   process.env.NEXT_PUBLIC_ENABLE_PAID_EE_FEATURES?.toLowerCase() === "true";

// export const CUSTOM_ANALYTICS_ENABLED = process.env.CUSTOM_ANALYTICS_SECRET_KEY
//   ? true
//   : false;

// export const GTM_ENABLED =
//   process.env.NEXT_PUBLIC_GTM_ENABLED?.toLowerCase() === "true";

// export const DISABLE_LLM_DOC_RELEVANCE =
//   process.env.DISABLE_LLM_DOC_RELEVANCE?.toLowerCase() === "true";

// export const NEXT_PUBLIC_CLOUD_ENABLED =
//   process.env.NEXT_PUBLIC_CLOUD_ENABLED?.toLowerCase() === "true";

// // export const REGISTRATION_URL =
//   // process.env.INTERNAL_URL || "http://127.0.0.1:3001";

// export const SERVER_SIDE_ONLY__CLOUD_ENABLED =
//   process.env.NEXT_PUBLIC_CLOUD_ENABLED?.toLowerCase() === "true";

// export const NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED =
//   process.env.NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED?.toLowerCase() === "true" &&
//   !NEXT_PUBLIC_CLOUD_ENABLED;

// export const NEXT_PUBLIC_TEST_ENV =
//   process.env.NEXT_PUBLIC_TEST_ENV?.toLowerCase() === "true";

// export const NEXT_PUBLIC_ENABLE_CHROME_EXTENSION =
//   process.env.NEXT_PUBLIC_ENABLE_CHROME_EXTENSION?.toLowerCase() === "true";

// export const NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK =
//   process.env.NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK?.toLowerCase() ===
//   "true";

// export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// // Add support for custom URL protocols in markdown links
// export const ALLOWED_URL_PROTOCOLS = [
//   "http:",
//   "https:",
//   "mailto:",
//   "tel:",
//   "slack:",
//   "vscode:",
//   "file:",
//   "sms:",
//   "spotify:",
//   "zoommtg:",
// ];

// export const MAX_CHARACTERS_PERSONA_DESCRIPTION = 5000000;

export type AuthType =
  | "disabled"
  | "basic"
  | "google_oauth"
  | "oidc"
  | "saml"
  | "cloud";

// Internal API endpoint for backend (Docker service name + port)
export const INTERNAL_URL = process.env.INTERNAL_URL || "http://api_server:8080";

// External domain for frontend routing (served via NGINX)
export const HOST_URL = process.env.WEB_DOMAIN || "http://localhost:80";

// Used in auth registration redirect
export const REGISTRATION_URL = process.env.REGISTRATION_URL || `${INTERNAL_URL}/register`;

export const HEADER_HEIGHT = "h-16";
export const SUB_HEADER = "h-12";

export const NEXT_PUBLIC_DISABLE_STREAMING =
  process.env.NEXT_PUBLIC_DISABLE_STREAMING?.toLowerCase() === "true";

export const NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED =
  process.env.NEXT_PUBLIC_DO_NOT_USE_TOGGLE_OFF_DANSWER_POWERED?.toLowerCase() === "true";

export const TENANT_ID_COOKIE_NAME = "onyx_tid";
export const GMAIL_AUTH_IS_ADMIN_COOKIE_NAME = "gmail_auth_is_admin";
export const GOOGLE_DRIVE_AUTH_IS_ADMIN_COOKIE_NAME = "google_drive_auth_is_admin";

export const SEARCH_TYPE_COOKIE_NAME = "search_type";
export const AGENTIC_SEARCH_TYPE_COOKIE_NAME = "agentic_type";

export const SIDEBAR_WIDTH_CONST = "350px";
export const SIDEBAR_WIDTH = `w-[350px]`;

export const LOGOUT_DISABLED =
  process.env.NEXT_PUBLIC_DISABLE_LOGOUT?.toLowerCase() === "true";

export const NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN =
  process.env.NEXT_PUBLIC_DEFAULT_SIDEBAR_OPEN?.toLowerCase() !== "false";

export const TOGGLED_CONNECTORS_COOKIE_NAME = "toggled_connectors";

export const NEXT_PUBLIC_CUSTOM_REFRESH_URL =
  process.env.NEXT_PUBLIC_CUSTOM_REFRESH_URL;

export const SERVER_SIDE_ONLY__PAID_ENTERPRISE_FEATURES_ENABLED =
  process.env.ENABLE_PAID_ENTERPRISE_EDITION_FEATURES?.toLowerCase() === "true";

export const EE_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_PAID_EE_FEATURES?.toLowerCase() === "true";

export const CUSTOM_ANALYTICS_ENABLED =
  Boolean(process.env.CUSTOM_ANALYTICS_SECRET_KEY);

export const GTM_ENABLED =
  process.env.NEXT_PUBLIC_GTM_ENABLED?.toLowerCase() === "true";

export const DISABLE_LLM_DOC_RELEVANCE =
  process.env.DISABLE_LLM_DOC_RELEVANCE?.toLowerCase() === "true";

export const NEXT_PUBLIC_CLOUD_ENABLED =
  process.env.NEXT_PUBLIC_CLOUD_ENABLED?.toLowerCase() === "true";

export const SERVER_SIDE_ONLY__CLOUD_ENABLED =
  process.env.NEXT_PUBLIC_CLOUD_ENABLED?.toLowerCase() === "true";

export const NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED =
  process.env.NEXT_PUBLIC_FORGOT_PASSWORD_ENABLED?.toLowerCase() === "true" &&
  !NEXT_PUBLIC_CLOUD_ENABLED;

export const NEXT_PUBLIC_TEST_ENV =
  process.env.NEXT_PUBLIC_TEST_ENV?.toLowerCase() === "true";

export const NEXT_PUBLIC_ENABLE_CHROME_EXTENSION =
  process.env.NEXT_PUBLIC_ENABLE_CHROME_EXTENSION?.toLowerCase() === "true";

export const NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK =
  process.env.NEXT_PUBLIC_INCLUDE_ERROR_POPUP_SUPPORT_LINK?.toLowerCase() === "true";

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const ALLOWED_URL_PROTOCOLS = [
  "http:",
  "https:",
  "mailto:",
  "tel:",
  "slack:",
  "vscode:",
  "file:",
  "sms:",
  "spotify:",
  "zoommtg:",
];

export const MAX_CHARACTERS_PERSONA_DESCRIPTION = 5000000;
