import api from '../../../core/interceptor/api-interceptor';

export function getProductionInfo(queryParams) {
    return api.get('/api/getProductionInfo',
        {
            params: { ...queryParams }
        });
}