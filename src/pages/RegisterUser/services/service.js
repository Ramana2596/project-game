import api from '../../../core/interceptor/api-interceptor';

export function getProfessionInfo() {
    return api.get('/api/getProfessionInfo');
}

export function registerUser(payload) {
    return api.post('/api/addUserProfile', payload);
}