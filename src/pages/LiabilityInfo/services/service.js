import api from '../../../core/interceptor/api-interceptor';

export function getLiabilityInfo(queryParams) {
    return api.get('/api/getLiabilityInfo',
        {
            params: { ...queryParams }
        });
}