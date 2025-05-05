import api from '../../../core/interceptor/api-interceptor';

export function getRoleInfo(queryParams) {
    return api.get('/api/getRoleInfo',
        {
            params: { ...queryParams }
        });
}