import api from '../../../core/interceptor/api-interceptor';

export function getMarketInputError(queryParams) {
    return api.get('/api/getMarketInputError',
        {
            params: { ...queryParams }
        });
}