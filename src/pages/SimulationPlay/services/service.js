import api from '../../../core/interceptor/api-interceptor';

export function updateSimulationPlay(queryParams) {
  return api.post('/api/updateSimulationPlay', {
    ...queryParams,
    cmdLine: "Team Play",   // required by backend
  });
}
