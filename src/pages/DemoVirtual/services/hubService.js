// src/pages/DemoVirtual/services/hubService.js
// API service functions for HubNew (standardized Simulation Panel)

import api from '../../../core/interceptor/api-interceptor';

// Fetch simulation progress status for a team
export function getTeamProgressStatus(queryParams) {
  return api.post('/api/getTeamProgressStatus', queryParams);
}

// Update simulation play (advance stage) for a team
export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play", // required by backend
  });
}
