// src/pages/DemoVirtual/services/service.js
// ✅ API service functions for virtual orchestration and simulation play updates.

import api from '../../../core/interceptor/api-interceptor';

// ✅ Retrieves orchestrated progress data using 5-parameter virtual simulation logic
export function getTeamProgressVirtual(queryParams) {
  // ✅ Maps hook parameters to the UI_Team_Progress_Virtual SP inputs
  return api.post('/api/getTeamProgressVirtual', {
    Game_id: queryParams.gameId,
    Game_Batch: queryParams.gameBatch,
    Game_Team: queryParams.gameTeam,
    Completed_Period: queryParams.completedPeriod,
    Completed_Stage_No: queryParams.completedStageNo
  });
}

// ❌ updateSimulationPlay is bypassed in DemoVirtual but retained for service consistency
export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play",   // ✅ Internal command required by backend
  });
}

// ❌ getTeamProgressStatus replaced by getTeamProgressVirtual in the demo flow
export function getTeamProgressStatus(queryParams) {
  return api.post('/api/getTeamProgressStatus', queryParams);
}