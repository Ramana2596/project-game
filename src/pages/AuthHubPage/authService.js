// File: project-game/src/pages/authHub/authService.js
// Purpose: API calls for registration/login

import api from '../../core/interceptor/api-interceptor';

// Register a new user (manual or OAuth)
export function registerUser(payload) {
  return api.post('/api/addUserProfileNew', payload);
}

// Login user (manual or OAuth)
export function loginUser(payload) {
  return api.post('/api/loginUserNew', payload);
}

// Fetch current user profile by email
export function getUserProfile(queryParams) {
  return api.get('/api/getUserProfileNew', {
    params: { ...queryParams }
  });
}
