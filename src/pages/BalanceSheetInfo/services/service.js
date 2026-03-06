import api from '../../../core/interceptor/api-interceptor';

export function getBalanceSheetInfo(queryParams) {
    return api.post('/api/getBalanceSheetInfo',
        {params: { ...queryParams }
    });
}