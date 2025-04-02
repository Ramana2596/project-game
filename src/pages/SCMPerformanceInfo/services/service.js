import api from '../../../core/interceptor/api-interceptor';

export function getSCMPerformanceInfo(queryParams) {
    return api.get('/api/getSCMPerformanceInfo',
        {
            params: { ...queryParams }
        });
}