import api from '../../../core/interceptor/api-interceptor';

export function getReferenceInfo(queryParams) {
    return api.get('/api/getReferenceInfo',
        {
            params: { ...queryParams }
        });
}