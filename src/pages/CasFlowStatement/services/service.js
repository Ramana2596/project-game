import api from '../../../core/interceptor/api-interceptor';

export function getCashFlowStatement(queryParams) {
    return api.get('/api/getCashFlowStatement',
        {
            params: { ...queryParams }
        });
}