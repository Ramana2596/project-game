// src/pages/SimulationSuiteNew/services/service.js
// ✅ API service functions for simulation progress and play updates (reproduced from DemoWizard).

import api from '../../../core/interceptor/api-interceptor';

// ✅ Updates simulation state to advance stages or periods
export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play",   // ✅ Internal command required by backend
  });
}

// ✅ Retrieves current progress data for a specific team
export function getTeamProgressStatus(queryParams) {
  // ✅ Uses POST to securely transmit team and game identifiers
  return api.post('/api/getTeamProgressStatus', queryParams);
}