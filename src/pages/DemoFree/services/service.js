// src/pages/SimulationSuiteNew/services/service.js
// ✅ API service functions for simulation progress and play updates (reproduced from DemoWizard).

import api from '../../../core/interceptor/api-interceptor';

// ✅ Update simulation play (advance stage/period).
export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play",   // ✅ required by backend
  });
}

// ✅ Fetch simulation progress status for a team.
export function getTeamProgressStatus(queryParams) {
  // ✅ Use POST body to match Express req.body logic
  return api.post('/api/getTeamProgressStatus', queryParams);
}
