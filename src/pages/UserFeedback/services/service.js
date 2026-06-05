// src/pages/UserUserFeedback/services/service.js
import api from '../../../core/interceptor/api-interceptor';

// Load widgets and options
export function getFeedbackConfig() {
    return api.post('/api/userFeedback', {
        cmdLine: 'Get_Config',
    });
}

// Add User Feedback record
export function submitFeedback(queryParams) {
    return api.post('/api/userFeedback', {
        ...queryParams,
        cmdLine: 'Submit',
    });
}
