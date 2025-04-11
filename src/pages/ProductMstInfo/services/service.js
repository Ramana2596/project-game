import api from '../../../core/interceptor/api-interceptor';

export function getProductMstInfo(queryParams) {
    return api.get('/api/getProductMstInfo',
        {
            params: { ...queryParams }
        });
}