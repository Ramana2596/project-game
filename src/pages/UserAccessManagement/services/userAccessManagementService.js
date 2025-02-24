import api from '../../../core/interceptor/api-interceptor';

// Function to fetch email IDs from the backend
export const fetchEmails = async () => {
    try {
        const response = await api.get('/emails'); // Replace with your actual endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
};

// Function to fetch roles from the backend
export const fetchRoles = async () => {
    try {
        const response = await api.get('/roles'); // Replace with your actual endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
