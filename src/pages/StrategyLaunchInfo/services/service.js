import api from '../../../core/interceptor/api-interceptor';

export function getStrategyLaunchInfo(queryParams) {
    return api.get('/api/getStrategyLaunchInfo',
        {
            params: { ...queryParams }
        });
}