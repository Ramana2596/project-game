import api from '../../../core/interceptor/api-interceptor';

export function getPartInfo(queryParams) {
    return api.get('/api/getPartInfo',
        {
            params: { ...queryParams }
        });
}