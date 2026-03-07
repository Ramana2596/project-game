import api from '../../../core/interceptor/api-interceptor';

export function getOpsDemandCreationInfo(queryParams) {
    return api.get('/api/getOpsDemandCreationInfo',
        {
            params: { ...queryParams }
        });
}