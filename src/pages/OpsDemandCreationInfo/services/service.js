import api from '../../../core/interceptor/api-interceptor';

export function getOpsDemandCreationInfo(queryParams) {
    return api.post('/api/getOpsDemandCreationInfo',
        {
            params: { ...queryParams }
        });
}