import api from '../../../core/interceptor/api-interceptor';

export function getStrategyPlanTeam(queryParams) {
    return api.post('/api/getStrategyPlanTeam',
        {
            params: { ...queryParams }
        });
}
