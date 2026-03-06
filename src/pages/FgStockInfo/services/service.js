import api from '../../../core/interceptor/api-interceptor';

export function getFgStockInfo(queryParams) {
    return api.post('/api/getFgStockInfo',
        {
            params: { ...queryParams }
        });
}