import api from '../../../core/interceptor/api-interceptor';

export function getStrategyBudgetInfo(queryParams) {
    return api.get('/api/getStrategyBudgetInfo',
        {
            params: { ...queryParams }
        });
}