import api from '../../../core/interceptor/api-interceptor';

export function getProfessionInfo(queryParams) {
    return api.get('/api/getProfessionInfo',
        {
            params: { ...queryParams }
        });
}