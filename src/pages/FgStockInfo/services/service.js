import api from '../../../core/interceptor/api-interceptor';

export function getFgStockInfo(queryParams) {
    return api.get('/api/getFgStockInfo',
        {
            params: { ...queryParams }
        });
}