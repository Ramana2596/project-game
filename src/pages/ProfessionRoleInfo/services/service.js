import api from '../../../core/interceptor/api-interceptor';

export function getProfessionRoleInfo(queryParams) {
    return api.get('/api/getProfessionRoleInfo',
        {
            params: { ...queryParams }
        });
}