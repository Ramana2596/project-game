// File: src/pages/AuthHubPage/services/authApiService.js
// API service layer for AuthHub (authentication + profile management)

import api from "../../../core/interceptor/api-interceptor";

/* AUTH SERVICES */

// Register a new user (manual signup + password creation)
export function registerUser(payload) {
  return api.post("/api/registerUser", payload);
}

// ❌ Obsolete: Password is now created during registerUser() final onboarding step
// export function setUserPassword(payload) {
//   return api.post("/api/setUserPassword", payload);
// }

// Login existing user
export function loginUser(payload) {
  return api.post("/api/loginUser", payload);
}

// Password reset link/token
export function forgotPassword(payload) {
  return api.post("/api/forgotPassword", payload);
}

// Reset password using token/new password
export function resetPassword(payload) {
  return api.post("/api/resetPassword", payload);
}

/* PROFILE SERVICES */

// LOV: Profession
export function fetchProfessions(queryParams) {
  return api.get("/api/getUserProfile", {
    params: {
      ...queryParams,
      cmdLine: "Profession"
    }
  });
}

// LOV: Country
export function fetchCountries(queryParams) {
  return api.get("/api/getUserProfile", {
    params: {
      ...queryParams,
      cmdLine: "Country"
    }
  });
}

// Fetch user profile using query params (email, id, etc.)
export function getUserProfile(queryParams) {
  return api.get("/api/getUserProfile", {
    params: { ...queryParams }
  });
}

// Create user profile after OAuth authentication
export function addUserProfileOauth(payload) {
  return api.post("/api/addUserProfileOauth", payload);
}

// Enroll user into game/team flow
export function enrollUser(payload) {
  return api.post("/api/enrollUser", payload);
}

/*---------------------------------------
 FUTURE SERVICES (SAFE STUBS)
 ---------------------------------------*/

export function updateUserProfile() {
  throw new Error("updateUserProfile API not implemented yet");
}

export function logoutUser() {
  throw new Error("logoutUser API not implemented yet");
}