import api from '../../../core/interceptor/api-interceptor';

export function getStrategySetCollection(queryParams) {
    return api.get('/api/getStrategySetCollection',
        {
            params: { ...queryParams }
        });
}