import api from '../../../core/interceptor/api-interceptor';

export function getCashFlowStatement(queryParams) {
    return api.post('/api/getCashFlowStatement',
        {
            params: { ...queryParams }
        });
}