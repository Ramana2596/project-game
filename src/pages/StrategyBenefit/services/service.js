import api from '../../../core/interceptor/api-interceptor';

export function getStrategyBenefit(queryParams) {
    return api.post('/api/getStrategyBenefit',
        {
            params: { ...queryParams }
        });
}