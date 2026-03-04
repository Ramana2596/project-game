import api from '../../../core/interceptor/api-interceptor';

export function getIncomeStatementInfo(queryParams) {
    return api.post('/api/getIncomeStatementInfo',
        {params: { ...queryParams }
    });
}