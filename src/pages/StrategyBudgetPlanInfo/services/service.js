import api from '../../../core/interceptor/api-interceptor';

export function getStrategyBudgetPlanInfo(queryParams) {
    return api.get('/api/getStrategyBudgetPlanInfo',
        {
            params: { ...queryParams }
        });
}