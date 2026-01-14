import api from '../../../core/interceptor/api-interceptor';

export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play",   // required by backend
  });
}
// Fetch simulation progress status for a team
  
export function getTeamProgressStatus(queryParams) {
  // Use POST body to match your Express req.body logic
  return api.post('/api/getTeamProgressStatus', queryParams); 
}