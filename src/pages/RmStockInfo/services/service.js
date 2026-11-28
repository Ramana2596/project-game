import api from '../../../core/interceptor/api-interceptor';

export function getRmStockInfo(queryParams) {
    return api.get('/api/getRmStockInfo',
        {
            params: { ...queryParams }
        });
}