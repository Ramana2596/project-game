import api from '../../../core/interceptor/api-interceptor';

export function getUserProfile(params) {
    return api.get('/api/getUserProfile', { params });
}

export function registerUser(payload) {
    return api.post('/api/addUserProfile', payload);
}

export function enrollUser(payload) {
    return api.post('/api/enrollUser', payload);
}