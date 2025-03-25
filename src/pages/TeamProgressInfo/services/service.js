import api from '../../../core/interceptor/api-interceptor';

export function getTeamProgressInfo(queryParams) {
    return api.get('/api/getTeamProgressInfo',
        {
            params: { ...queryParams }
        });
}