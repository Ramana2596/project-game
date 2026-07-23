// src/pages/DemoVirtual/services/service.js
// API service function

import api from '../../../core/interceptor/api-interceptor';


// Use spread operator to pass camelCase keys directly 
export function getTeamProgressVirtual(queryParams) {
  return api.post('/api/getTeamProgressVirtual', { ...queryParams });
}