import api from '../../../core/interceptor/api-interceptor';

export function getCostNormInfo(queryParams) {
    return api.get('/api/getCostNormInfo',
        {
            params: { ...queryParams }
        });
}