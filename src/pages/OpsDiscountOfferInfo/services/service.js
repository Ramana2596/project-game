import api from '../../../core/interceptor/api-interceptor';

export function getOpsDiscountOfferInfo(queryParams) {
    return api.post('/api/getOpsDiscountOfferInfo',
        {
            params: { ...queryParams }
        });
}