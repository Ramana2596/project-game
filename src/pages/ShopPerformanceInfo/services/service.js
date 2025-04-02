import api from '../../../core/interceptor/api-interceptor';

export function getShopPerformanceInfo(queryParams) {
    return api.get('/api/getShopPerformanceInfo',
        {
            params: { ...queryParams }
        });
}