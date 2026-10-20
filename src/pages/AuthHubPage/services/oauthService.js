// File: src/pages/AuthHubPage/services/oauthService.js
// Std JavaScript for directing the browser to OAuth sites and receiving login information.

/*
// Backend API base URL
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
*/

// Same switch as api-interceptor.js
// npm start -> local backend. For net, Vercel build -> ngrok address.
// To test production from your computer: set REACT_APP_USE_PROD_API=true in .env, then restart.
const USE_LOCAL =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_USE_PROD_API !== "true";

const API_BASE = USE_LOCAL
  ? process.env.REACT_APP_DEV_API_BASE_URL   // http://localhost:4000
  : process.env.REACT_APP_API_BASE_URL;      // For internet users, ngrok address


// Redirect browsers:

// 1 Google OAuth login
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE}/auth/google`;
};

// 2 Microsoft OAuth login
export const loginWithMicrosoft = () => {
  window.location.href = `${API_BASE}/auth/microsoft`;
};

// 3 LinkedIn OAuth login
export const loginWithLinkedIn = () => {
  window.location.href = `${API_BASE}/auth/linkedin`;
};

// 4 Facebook OAuth login
export const loginWithFacebook = () => {
  window.location.href = `${API_BASE}/auth/facebook`;
};

// Receive and parse OAuth status from URL -- callback
export const getAuthStatusFromUrl = () => {
  // Read login result from URL
  const params = new URLSearchParams(window.location.search);

  return {
    status: params.get("status"),
    provider: params.get("provider"),
    userEmail: params.get("userEmail"),
    userName: params.get("userName")
  };
};