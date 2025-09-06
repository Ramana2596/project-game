import api from '../../../core/interceptor/api-interceptor';

export function getMarketInfoTeam(queryParams) {
    return api.get('/api/getMarketInfoTeam',
        {
            params: { ...queryParams }
        });
}