import api from '../../../core/interceptor/api-interceptor';

export function getOpsSavingsPlanInfo(queryParams) {
    return api.get('/api/getOpsSavingsPlanInfo',
        {
            params: { ...queryParams }
        });
}