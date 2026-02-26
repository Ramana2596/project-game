import api from '../../../core/interceptor/api-interceptor';

export function getMarketInfoTeam(queryParams) {
    return api.post('/api/getMarketInfoTeam',
        {
            params: { ...queryParams }
        });
}