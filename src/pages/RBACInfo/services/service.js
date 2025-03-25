import api from '../../../core/interceptor/api-interceptor';

export function getRBACInfo(queryParams) {
    return api.get('/api/getRBACInfo',
        {
            params: { ...queryParams }
        });
}