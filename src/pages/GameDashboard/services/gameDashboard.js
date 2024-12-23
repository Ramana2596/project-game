import api from '../../../core/interceptor/api-interceptor';

export function getDashboardData(userRole) {
    return api.get('/api/data');
}
