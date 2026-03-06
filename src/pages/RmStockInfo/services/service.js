import api from '../../../core/interceptor/api-interceptor';

export function getRmStockInfo(queryParams) {
    return api.post('/api/getRmStockInfo',
        {
            params: { ...queryParams }
        });
}