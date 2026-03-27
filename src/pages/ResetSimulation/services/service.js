import api from '../../../core/interceptor/api-interceptor';

export function updateResetSimulation(queryParams) {
  return api.post('/api/updateResetSimulation', {
    ...queryParams,
  });
}

  
