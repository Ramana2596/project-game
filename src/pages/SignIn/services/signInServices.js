import FetchDataFromApi from '../../../hooks/fetchData';

export function getUserDetails(userEmail, shouldTrigger) {
    return FetchDataFromApi('/api/getUserDetails', shouldTrigger, {
        "userEmail": userEmail
    });
}

export function getUserAccessPageIds(userRole) {
    return FetchDataFromApi('/api/getUserAccessPageIds', true, {
        userRole
    })
}
