import api from '../../../core/interceptor/api-interceptor';

export function getMarketInfo(queryParams) {
    return api.get('/api/getMarketInfo',
        {
            params: { ...queryParams }
        });
}