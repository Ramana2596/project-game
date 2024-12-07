import FetchDataFromApi from '../../../hooks/fetchData';

export function getUserDetails(userEmail, shouldTrigger) {
    return FetchDataFromApi('/api/getUserDetails', shouldTrigger, {
        "userEmail": userEmail
    });
}
