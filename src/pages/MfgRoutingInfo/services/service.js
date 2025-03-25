import api from '../../../core/interceptor/api-interceptor';

export function getMfgRoutingInfo(queryParams) {
    return api.get('/api/getMfgRoutingInfo',
        {
            params: { ...queryParams }
        });
}