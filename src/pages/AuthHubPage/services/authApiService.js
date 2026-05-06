// File: src/pages/AuthHubPage/services/authApiService.js
// API service layer for AuthHub (authentication + profile management)

import api from "../../../core/interceptor/api-interceptor";

/* AUTH SERVICES */

// Register a new user (manual signup)
export function registerUser(payload) {
  return api.post("/api/addUserProfileNew", payload);
}

// Login existing user
export function loginUser(payload) {
  return api.post("/api/loginUserNew", payload);
}

/* PROFILE SERVICES*/

// Fetch user profile using query params (email, id, etc.)
export function getUserProfile(queryParams) {
  return api.get("/api/getUserProfileNew", {
    params: { ...queryParams }
  });
}

// Create user profile after OAuth authentication
export function addUserProfileOauth(payload) {
  return api.post("/api/addUserProfileOauth", payload);
}

export function enrollUser(payload) {
    return api.post('/api/enrollUser', payload);
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

export function resetPassword() {
  throw new Error("resetPassword API not implemented yet");
}