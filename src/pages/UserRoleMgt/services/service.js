import api from '../../../core/interceptor/api-interceptor';

// Function to fetch available users (emails) from the backend

//Purpose: Fetch the initial list of available users.
export function fetchUsers(queryParams) {
    return api.post('/api/getUserRoleQuery', { 
        ...queryParams, 
        cmdLine: 'Get_User' 
    });
};


export function fetchRoles(queryParams) {
    return api.post('/api/getUserRoleQuery', { 
        ...queryParams, 
        cmdLine: 'PF_Valid_Roles' 
    });
};

export function fetchApprovedRoles(queryParams) {
    return api.post('/api/getUserRoleQuery', { 
        ...queryParams, 
        cmdLine: 'Get_Active_Roles' 
    });
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
