import api from '../../../core/interceptor/api-interceptor';

export function getStdNormInfo(queryParams) {
    return api.get('/api/getStdNormInfo',
        {
            params: { ...queryParams }
        });
}