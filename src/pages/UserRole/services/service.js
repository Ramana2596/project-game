import api from '../../../core/interceptor/api-interceptor';

//Purpose: Fetch the initial list of available users.
export function getUserList(queryParams) {
    return api.post('/api/getUserRoleAssign', { 
        ...queryParams, 
        cmdLine: 'User_List' 
    });
}

// Purpose: Fetch the valid & current role for a specific user.
export function getUserValidRole(queryParams) {
    return api.post('/api/getUserRoleAssign', { 
        ...queryParams, 
        cmdLine: 'Valid_Role' 
    });
}

//Purpose: Update/Assign the role.
export function updateUserRole(queryParams) {
    return api.post('/api/updateUserRole', { 
        ...queryParams 
    });
}