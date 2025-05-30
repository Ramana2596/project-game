import api from '../../../core/interceptor/api-interceptor';

// // Function to fetch email IDs from the backend
// export const fetchEmails = async () => {
//     try {
//         const response = await api.get('/emails'); // Replace with your actual endpoint
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching emails:', error);
//         throw error;
//     }
// };

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

export const approveUserRole = async (data) => {
    console.log('Approving user role with data:', data);
}


export const fetchEmails = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                "user1@example.com",
                "user2@example.com",
                "user3@example.com"
            ]);
        }, 500); // Simulating network delay
    });
};
