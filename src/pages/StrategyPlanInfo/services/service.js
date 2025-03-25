import api from '../../../core/interceptor/api-interceptor';

export function getStrategyPlanInfo(queryParams) {
    return api.get('/api/getStrategyPlanInfo',
        {
            params: { ...queryParams }
        });
}