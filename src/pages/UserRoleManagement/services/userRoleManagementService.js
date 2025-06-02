import api from '../../../core/interceptor/api-interceptor';

// Function to fetch available users (emails) from the backend
export const fetchAvailableUsers = async (queryParams) => {
    try {
        const response = await api.get('/api/getAvailableUsers',
            {
                params: { ...queryParams }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching available users:', error);
        throw error;
    }
};

// Function to fetch roles from the backend
export const fetchRoles = async (queryParams) => {
    try {
        const response = await api.get('/api/getRoleInfo',
            {
                params: { ...queryParams }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

export const fetchDefaultRolesForProfession = async (queryParams) => {
    try {
        const response = await api.get('/api/getProfessionRoleInfo',
            {
                params: { ...queryParams }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

export const updateUserRole = async (userRoleList) => {
    try {
        const response = await api.post('/api/updateUserRole', { userRoleList });
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};
