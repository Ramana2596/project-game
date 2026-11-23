import api from '../../../core/interceptor/api-interceptor';

export function getOpsDiscountOfferInfo(queryParams) {
    return api.get('/api/getOpsDiscountOfferInfo',
        {
            params: { ...queryParams }
        });
}