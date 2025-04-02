import api from '../../../core/interceptor/api-interceptor';

export function getStrategyLaunchGist(queryParams) {
    return api.get('/api/getStrategyLaunchGist',
        {
            params: { ...queryParams }
        });
}
