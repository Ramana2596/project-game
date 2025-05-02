import api from '../../../core/interceptor/api-interceptor';

    export function getAcReceivable(queryParams) {
    return api.get('/api/getAcReceivable',
        {
            params: { ...queryParams }
        });
}
