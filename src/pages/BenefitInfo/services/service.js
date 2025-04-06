import api from '../../../core/interceptor/api-interceptor';

export function getBenefitInfo(queryParams) {
    return api.get('/api/getBenefitInfo',
        {
            params: { ...queryParams }
        });
}