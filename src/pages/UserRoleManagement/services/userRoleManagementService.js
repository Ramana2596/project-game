import api from '../../../core/interceptor/api-interceptor';

// Function to fetch available users (emails) from the backend
export const fetchAvailableUsers = async (queryParams) => {
    try {
        const response = await api.get('/api/getUserInfo',
            {
                params: { ...queryParams, cmdLine: 'Get_User' }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching available users:', error);
        throw error;
    }
};

// Function to fetch valid roles from the backend
export const fetchRoles = async (queryParams) => {
    try {
        const response = await api.get('/api/getUserInfo',
            {
                params: { ...queryParams, cmdLine: 'Get_Valid_Roles' }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

// Function to fetch approved roles for user from the backend
export const fetchApprovedRoles = async (queryParams) => {
    try {
        const response = await api.get('/api/getUserInfo',
            {
                params: { ...queryParams, cmdLine: 'Get_Approved_Roles' }
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
