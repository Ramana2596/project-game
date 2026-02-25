import api from '../../../core/interceptor/api-interceptor';

export function getProductionInfo(queryParams) {
    return api.post('/api/getProductionInfo',
        {
            params: { ...queryParams }
        });
}