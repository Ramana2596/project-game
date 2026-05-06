// File: src/pages/AuthHubPage/services/oauthService.js
// Service layer for OAuth authentication redirects

// Backend API base URL
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

// Redirect browser to Google OAuth login
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE}/auth/google`;
};

// Redirect browser to Microsoft OAuth login
export const loginWithMicrosoft = () => {
  window.location.href = `${API_BASE}/auth/microsoft`;
};

// Redirect browser to LinkedIn OAuth login
export const loginWithLinkedIn = () => {
  window.location.href = `${API_BASE}/auth/linkedin`;
};

// Redirect browser to Facebook OAuth login
export const loginWithFacebook = () => {
  window.location.href = `${API_BASE}/auth/facebook`;
};

// Parse OAuth callback status from URL
export const getAuthStatusFromUrl = () => {
  // Read login result from URL
  const params = new URLSearchParams(window.location.search);

  return {
    status: params.get("status"),
    userId: params.get("userId")
  };
};