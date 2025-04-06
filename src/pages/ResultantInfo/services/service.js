import api from '../../../core/interceptor/api-interceptor';

export function getResultantInfo(queryParams) {
    return api.get('/api/getResultantInfo',
        {
            params: { ...queryParams }
        });
}