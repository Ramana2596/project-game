import api from '../../../core/interceptor/api-interceptor';

export function getStrategyPlanTeam(queryParams) {
    return api.get('/api/getStrategyPlanTeam',
        {
            params: { ...queryParams }
        });
}
