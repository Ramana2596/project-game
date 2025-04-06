import api from '../../../core/interceptor/api-interceptor';

export function getBomInfo(queryParams) {
    return api.get('/api/getBomInfo',
        {
            params: { ...queryParams }
        });
}