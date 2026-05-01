// File: project-game/src/pages/authHub/userService.js
import api from '../../core/interceptor/api-interceptor';

// Call backend API to add user profile
export function addUserProfileOauth(payload) {
  return api.post('/api/addUserProfileOauth', payload);
}
