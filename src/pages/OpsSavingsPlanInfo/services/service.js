import api from '../../../core/interceptor/api-interceptor';

export function getOpsSavingsPlanInfo(queryParams) {
    return api.post('/api/getOpsSavingsPlanInfo',
        {
            params: { ...queryParams }
        });
}